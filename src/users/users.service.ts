import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private mailExist = (email: string): Promise<boolean> => {
    return this.userRepository.findOneBy({ email }).then((user) => {
      if (user) {
        return true
      } else {
        return false
      }
    })
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  async create(createUserDto: CreateUserDto) {
    const existeUser = await this.mailExist(createUserDto.email)
    if (existeUser) {
      throw new BadRequestException(`${createUserDto.email} ya existe`)
    }
    createUserDto.password = await this.hashPassword(createUserDto.password)
    const userInsert = await this.userRepository.save(createUserDto)
    const usr = await this.findOne(userInsert.id)
    return usr
  }

  async findAll(page: number, limit: number) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })
    const userData = {
      users,
      total,
    }
    return userData
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })
    return user ?? null
  }

  async login(loginUserDto: LoginUserDto) {
    const existeMail = await this.mailExist(loginUserDto.email)

    if (!existeMail) {
      throw new UnauthorizedException(` Email no existe`)
    }

    const user = await this.findByEmail(loginUserDto.email)
    const passValid = await bcrypt.compare(loginUserDto.password, user.password)

    if (!passValid) {
      throw new UnauthorizedException(` Password invalido`)
    }

    user['token'] = this.getJwtToken(user.id, user.email)
    return user
    // const passValid =
  }

  private async findByEmail(email: string) {
    const usr = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    })

    return usr
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (user) {
      this.userRepository.remove(user)
    }
  }

  getJwtToken(id: number, email: string) {
    const token = this.jwtService.sign({ id, email })
    return token
  }
}
