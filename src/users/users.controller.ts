import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import {
  ApiTags,
  ApiBody,
  ApiResponse
} from '@nestjs/swagger'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: UserDto })
  async create (@Body() user: CreateUserDto) {
    console.log('AQUI', user)
    return await this.usersService.create(user)
  }

  @Get()
  @ApiResponse({
    type: UserDto,
    isArray: true
  })
  async findAll () {
    return await this.usersService.findAll()
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  async findOne (@Param('id') id: string) {
    return await this.usersService.findOne(+id)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  async update (@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.usersService.update(+id, user)
  }

  @Delete(':id')
  async remove (@Param('id') id: string) {
    return await this.usersService.remove(+id)
  }
}
