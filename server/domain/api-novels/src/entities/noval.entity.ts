import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { INoval } from "@core-ui/novals-types";
import { BaseEntity } from "./base.entity";
import { AuthorEntity } from "./author.entity";
import { CategoryEntity } from "./category.entity";
import { ChapterEntity } from "./chapter.entity";
import { CommentEntity } from "./comment.entity";

@Entity('novals')
export class NovalEntity extends BaseEntity implements INoval {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "short_description", type: 'varchar', nullable: true })
  shortDescription?: string;
  
  @Column({ name: "full_description", type: 'varchar', nullable: true })
  fullDescription?: string;
  
  @Column({ name: "referrence", type: 'varchar', nullable: true })
  referrence?: string;
  
  @Column({ name: "thumb", type: 'varchar', nullable: true })
  thumb?: string;
  
  @Column({ name: "star", type: 'numeric', nullable: true })
  star?: number;
  
  @Column({ name: "view", type: 'numeric', nullable: true })
  view?: number;
  
  @Column({ name: "like", type: 'numeric', nullable: true })
  like?: number;
  
  @Column({ name: "follow", type: 'numeric', nullable: true })
  follow?: number;
  
  @Column({ name: "suggest", type: 'numeric', nullable: true })
  suggest?: number;
  
  @Column({ name: "original_noval_id", type: 'varchar', nullable: true })
  originalNovalId?: string;
  
  @Column({ name: "is_full", type: 'boolean', nullable: true, default: false })
  isFull?: boolean;
  
  @Column({ name: "chaptersNumber", type: 'numeric', nullable: true, default: 0 })
  chaptersNumber?: number;
  
  @ManyToOne(() => AuthorEntity, (auth) => auth.novalsData, { cascade: true })
  authorData?: AuthorEntity;
  
  @ManyToOne(() => AuthorEntity, (auth) => auth.novalsData, { cascade: true })
  categoryData?: CategoryEntity;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.novalData, { cascade: false })
  chaptersData?: ChapterEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.novalData, { cascade: false })
  comments?: CommentEntity[];
}