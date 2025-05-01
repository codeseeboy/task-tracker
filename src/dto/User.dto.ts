/**
 * UserSignupDto
 *
 * Data Transfer Object for user signup
 */
export interface UserSignupDto {
  name: string
  email: string
  password: string
  country: string
}

/**
 * UserLoginDto
 *
 * Data Transfer Object for user login
 */
export interface UserLoginDto {
  email: string
  password: string
}

/**
 * UserUpdateDto
 *
 * Data Transfer Object for user update
 */
export interface UserUpdateDto {
  name?: string
  country?: string
}
