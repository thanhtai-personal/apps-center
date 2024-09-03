import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { ICategory } from "@core-ui/novals-types";
import { BaseEntity } from "./base.entity";
import { NovalEntity } from "./noval.entity";

@Entity('categories')
export class CategoryEntity extends BaseEntity implements ICategory {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: "image", type: 'varchar', nullable: true })
  image?: string;

  @Column({ name: "icon", type: 'varchar', nullable: true })
  icon?: string;

  @ManyToOne(() => CategoryEntity, (cate) => cate.categories, { cascade: false })
  category?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (cate) => cate.category, { cascade: true })
  categories?: CategoryEntity[];
  
  @OneToMany(() => NovalEntity, (noval) => noval.categoryData, { eager: false, cascade: false })
  novalsData?: NovalEntity[];

}