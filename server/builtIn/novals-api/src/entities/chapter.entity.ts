import { Column, Entity, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { IChapter } from "@core-ui/novals-types";
import { BaseEntity } from "./base.entity";
import { NovalEntity } from "./noval.entity";
import { CommentEntity } from "./comment.entity";

@Entity('chapters')
export class ChapterEntity extends BaseEntity implements IChapter {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "short_description", type: 'varchar', nullable: true })
  shortDescription?: string;

  @Column({ name: "full_description", type: 'varchar', nullable: true })
  fullDescription?: string;

  @Column({ name: "short_content", type: 'varchar', nullable: true })
  shortContent?: string;

  @Column({ name: "content", type: 'varchar', nullable: true })
  content?: string;

  @Column({ name: "html_content", type: 'varchar', nullable: true })
  htmlContent?: string;

  @Column({ name: "referrence", type: 'varchar', nullable: true })
  referrence?: string;

  @Column({ name: "thumb", type: 'varchar', nullable: true })
  thumb?: string;

  @Column({ name: "view", type: 'numeric', nullable: true, default: 0 })
  view?: number;

  @ManyToOne(() => NovalEntity, (noval) => noval.chaptersData)
  novalData?: NovalEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.chapterData, { cascade: true })
  comments?: CommentEntity;
}