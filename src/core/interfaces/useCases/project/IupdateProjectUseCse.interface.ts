import { UpdateProjectDTOInput } from 'src/core/dtos/updateProjectInput.dto'
import { Project } from 'src/core/entities/Project.entity'
import { CustomResponse } from 'src/core/response/customResponse'

export interface IUpdateProjectUseCase {
  execute: (
    input: UpdateProjectDTOInput,
    userId: string,
  ) => Promise<CustomResponse<Project>>
}
