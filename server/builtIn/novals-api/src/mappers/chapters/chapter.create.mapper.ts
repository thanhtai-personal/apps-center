import { ChapterEntity } from "@/entities"
import { IChapterCreation } from "@core-ui/novals-types"

export class ChapterCreateDTOToEntityMapper {
  public static map(source: IChapterCreation, options?: any): ChapterEntity {
    const rsSource = source as ChapterEntity;
    return rsSource as ChapterEntity
  }
}