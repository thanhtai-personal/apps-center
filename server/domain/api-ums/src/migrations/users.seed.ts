import { MigrationInterface, QueryRunner } from "@core-api/nest-typeorm-postgres";
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { waitMs } from "./waitms";
import { IRoleCreation, IUserCreation } from "@core-ui/jobs-listing-types";
import * as bcrypt from "bcrypt"

export class usersDataSeed implements MigrationInterface {
  name = `usersDataSeed${Date.now()}`

  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleCsvFilePath = path.resolve(__dirname, 'data/roles.csv');
    const userCsvFilePath = path.resolve(__dirname, 'data/users.csv');
    const roles: IRoleCreation[] = [];
    const users: IUserCreation[] = [];

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(roleCsvFilePath)
        .pipe(csv())
        .on('data', (row: IRoleCreation) => {
          roles.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Read the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(userCsvFilePath)
        .pipe(csv())
        .on('data', (row: IUserCreation) => {
          users.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    await queryRunner.startTransaction();

    for (const record of roles) {
      // await queryRunner.startTransaction();
      const { name, description } = record;

      try {
        const existing = await queryRunner.query(`SELECT * FROM roles WHERE name = $1`, [name]);
        if (existing && existing.length > 0) {
          await queryRunner.query(
            `UPDATE roles SET description = $2 WHERE name = $1`,
            [name, description]
          );
        } else {
          await queryRunner.query(
            `INSERT INTO roles (name, description) VALUES 
                ($1, $2)`,
            [name, description]
          );
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        // await queryRunner.rollbackTransaction();
      } finally {
        await waitMs(100)
      }
    }

     // Assign the super admin role ID for users
    const superAdminRole = (await queryRunner.query(`SELECT id FROM roles WHERE name = $1`
      , ["Super admin"]))[0];

    for (const record of users) {
      // await queryRunner.startTransaction();
      const {
        username,
        password = "Aaaa@1111",
        email,
        avatar = "",
        points = 0,
        token = 0,
        level = 0,
      } = record;
      try {
        const existing = await queryRunner.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        if (existing && existing.length > 0) {
          await queryRunner.query(
            `UPDATE users SET password = $2, "roleId" = $3 WHERE email = $1`,
            [email, passwordHash, superAdminRole.id]
          );
        } else {
          await queryRunner.query(
            `INSERT INTO users (username, email, password, salt, "roleId") VALUES 
                ($1, $2, $3, $4, $5)`,
            [username, email, passwordHash, salt, superAdminRole.id]
          );
        }
        await queryRunner.commitTransaction();
      } catch (error) {
        console.log("error", error)
        // await queryRunner.rollbackTransaction();
      } finally {
        await waitMs(100)
      }
    }

    // await waitMs(1000);
    // await queryRunner.commitTransaction();
    await waitMs(1000);
    if (!queryRunner.isReleased) {
      // await queryRunner.release();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.query("DELETE FROM users");
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log("Error during rollback:", error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // await queryRunner.release();
    }
  }
}
