/**
 * TaskCreateDto
 *
 * Data Transfer Object for task creation
 */
export interface TaskCreateDto {
  title: string
  description: string
  status?: string
  projectId: string
}

/**
 * TaskUpdateDto
 *
 * Data Transfer Object for task update
 */
export interface TaskUpdateDto {
  title?: string
  description?: string
  status?: string
}
