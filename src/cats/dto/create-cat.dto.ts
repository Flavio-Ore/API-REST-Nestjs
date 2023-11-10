// Data Transfer Object (DTO) for creating a cat

import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator'

// Data from the client-side will be sent to the server-side as JSON, and the server-side will receive it as a JavaScript object.
export class CreateCatDto {
  @IsString()
  @MinLength(1)
  name: string

  @IsInt()
  @IsPositive()
  age: number

  @IsString()
  @IsOptional()
  breed?: string
}
