import { Column, Entity, JoinColumn, ManyToOne } from "@core-api/nest-typeorm-postgres";
import { IComment } from "@core-ui/novals-types";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { ChapterEntity } from "./chapter.entity";
import { NovalEntity } from "./noval.entity";

@Entity('comments')
export class CommentEntity extends BaseEntity implements IComment {
  @Column({ name: "username", type: 'varchar', nullable: true })
  username?: string;

  @Column({ name: "email", type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: "content", type: 'varchar', nullable: true })
  content?: string;

  @Column({ name: "html_content", type: 'varchar', nullable: true })
  htmlContent?: string;

  @Column({ name: "avatar", type: 'varchar', nullable: true })
  avatar?: string;

  @ManyToOne(() => UserEntity, (user) => user.comments, { cascade: false })
  userData?: UserEntity;

  @ManyToOne(() => NovalEntity, (noval) => noval.comments, { cascade: false })
  novalData?: number;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.comments, { cascade: false })
  chapterData?: number;
}