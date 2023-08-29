import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  async create(dto: CreateUserDto) {
    const user = await this.getByEmail(dto.email);
    if (user) throw new BadRequestException('User already exists')

    return await this.userRepository.save(new UserEntity(dto))
  }

  async getById(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
