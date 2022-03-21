import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create (user: CreateUserDto): Promise<User> {
    console.log('user', user)
    return await this.userRepository.save(user)
  }

  async findAll (): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne (id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async update (id: number, user: UpdateUserDto): Promise<User> {
    const old = await this.findOne(id)
    return await this.userRepository.save({
      ...old,
      ...user
    })
  }

  async remove (id: number) {
    return await this.userRepository.delete(id)
  }
}
