import { Column, Entity, OneToMany, OneToOne } from "@core-api/nest-typeorm-postgres";
import { IAuthor } from "@core-ui/novals-types";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { NovalEntity } from "./noval.entity";

@Entity('authors')
export class AuthorEntity extends BaseEntity implements IAuthor {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: "avatar", type: 'varchar', nullable: true })
  avatar?: string;

  @OneToOne(() => UserEntity, { cascade: true })
  user?: UserEntity;

  @OneToMany(() => NovalEntity, (noval) => noval.authorData, { cascade: false })
  novalsData?: NovalEntity[];
}