import {
  ApiProperty,
  ApiResponseProperty,
  ApiPropertyOptional
} from '@nestjs/swagger'
import {
  IsString,
  IsOptional
} from 'class-validator'

export class UserDto {
  @ApiResponseProperty()
  id: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty()
  @IsString()
  password: string
}
