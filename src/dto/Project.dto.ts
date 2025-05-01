/**
 * ProjectCreateDto
 *
 * Data Transfer Object for project creation
 */
export interface ProjectCreateDto {
  name: string
  description: string
}

/**
 * ProjectUpdateDto
 *
 * Data Transfer Object for project update
 */
export interface ProjectUpdateDto {
  name?: string
  description?: string
}
