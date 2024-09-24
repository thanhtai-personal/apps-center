import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "@core-api/nest-typeorm-postgres";
import { IUser } from "@core-ui/jobs-listing-types";
import { BaseEntity } from "./base.entity";
import { RoleEntity } from "./role.entity";
import { AuthorEntity } from "./author.entity";
import { CommentEntity } from "./comment.entity";

// UserEntity
@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column({ name: "username", type: 'varchar', nullable: true })
  username?: string;

  @Column({ name: "password", type: 'varchar', nullable: true })
  password?: string;

  @Column({ name: "email", type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: "avatar", type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ name: "points", type: 'numeric', nullable: true, default: 0 })
  points?: number;

  @Column({ name: "token", type: 'numeric', nullable: true, default: 0 })
  token?: number;

  @Column({ name: "level", type: 'numeric', nullable: true, default: 1 })
  level?: number;
  
  @ManyToOne(() => RoleEntity, (role) => role.users, { cascade: true })
  roleData?: string;

  @OneToOne(() => UserEntity, { cascade: false })
  author?: AuthorEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.userData, { cascade: false })
  comments?: CommentEntity;
}