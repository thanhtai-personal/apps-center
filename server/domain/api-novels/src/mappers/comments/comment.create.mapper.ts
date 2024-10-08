import { CommentEntity } from "@/entities"
import { ICommentCreation } from "@core-ui/novals-types"

export class CommentCreateDTOToEntityMapper {
  public static map(source: ICommentCreation, options?: any): CommentEntity {
    const rsSource = source as CommentEntity;
    return rsSource as CommentEntity
  }
}