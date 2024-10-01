import { Property } from "~/decorators/index.js";
import { AnyClass } from "@ttt/utils";

export abstract class BaseEntity {
  @Property({ type: "integer", primary: true, autoincrement: true })
  id: number;

  getName(): string | AnyClass {
    return "";
  }

  fromtttToMikroOrm() {
    return {};
  }
}
