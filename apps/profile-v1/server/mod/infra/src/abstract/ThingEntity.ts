import { Property } from "~/decorators/index.js";
import { BaseEntity } from "./BaseEntity.js";
import { v4 as uuid } from "uuid";

export abstract class ThingEntity extends BaseEntity {
  /**
   * indicates the origin of the entry, is a GUID
   */
  @Property({ type: "string", nullable: true, onCreate: uuid })
  hash?: string;

  /**
   * the user who creates the data
   */
  @Property({ type: "string", nullable: true })
  createdBy?: string;

  /**
   * the user who creates the data
   */
  @Property({ type: "string", nullable: true })
  updatedBy?: string;

  /**
   * Flag to mark it as non-actual
   */
  @Property({ type: "boolean", default: false })
  isArchived?: boolean = false;

  @Property({ type: "Date", onCreate: () => new Date() })
  dateCreate?: Date = new Date();

  @Property({ type: "Date", onUpdate: () => new Date(), nullable: true })
  dateUpdate?: Date;
}
