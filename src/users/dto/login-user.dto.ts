import { IsEmail, IsNotEmpty } from 'class-validator'
import { validateMessage } from 'src/commond/validator-message'

export class LoginUserDto {
  @IsEmail({}, { message: `${validateMessage.email} : email` })
  email: string

  @IsNotEmpty({ message: `${validateMessage.isString} : password` })
  password: string
}
