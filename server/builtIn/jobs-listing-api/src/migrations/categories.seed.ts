import { MigrationInterface, QueryRunner } from "@core-api/nest-typeorm-postgres";
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { waitMs } from "./waitms";
import { ICategoryCreation } from "@core-ui/jobs-listing-types";

export class CategoriesDataSeed implements MigrationInterface {
  name = `CategoriesDataSeed${Date.now()}`

  public async up(queryRunner: QueryRunner): Promise<void> {
    const csvFilePath = path.resolve(__dirname, 'data/categories.csv');
    const records: ICategoryCreation[] = [];

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row: ICategoryCreation) => {
          records.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Start a transaction
    await queryRunner.startTransaction();
    try {
      for (const record of records) {
        const { name, description } = record;
        
        // Check if the category already exists
        const existing = await queryRunner.query(`SELECT * FROM categories WHERE name = $1`, [name]);
        
        if (existing.length > 0) {
          // Update existing category
          await queryRunner.query(
            `UPDATE categories SET description = $2 WHERE name = $1`,
            [name, description]
          );
        } else {
          // Insert new category
          await queryRunner.query(
            `INSERT INTO categories (name, description) VALUES ($1, $2)`,
            [name, description]
          );
        }
        await waitMs(100); // Wait to simulate delay
      }
      
      // Commit the transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // Rollback the transaction in case of error
      await queryRunner.rollbackTransaction();
      console.error("Error during seeding:", error);
    } finally {
      // Release the query runner
      if (!queryRunner.isReleased) {
        await queryRunner.release();
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      // Assuming you're rolling back the category data
      await queryRunner.query("DELETE FROM categories");
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error("Error during rollback:", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
