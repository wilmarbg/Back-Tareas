import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { LoginUserDto } from './login-user.dto'
import { validateMessage } from 'src/commond/validator-message'

export class CreateUserDto extends LoginUserDto {
  @IsString({ message: `${validateMessage.isString} : username` })
  @IsNotEmpty({ message: `${validateMessage.isString} : username` })
  username?: string
  @IsString()
  @IsOptional()
  codigo?: string

  id?: number
}
