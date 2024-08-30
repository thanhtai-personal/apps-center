import { ICommentCreation } from "@core-ui/novals-types"

export class CreateCommentDto implements ICommentCreation {
  username?: string;
  email?: string;
  avatar?: string;
  userId?: number;
  novalId?: number;
  chapterId?: number;
  content?: string;
  htmlContent?: string;
}