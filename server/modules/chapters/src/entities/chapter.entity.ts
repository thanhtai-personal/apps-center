import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IChapter } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('chapters')
export class ChapterEntity extends ThingEntity implements IChapter {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;
}