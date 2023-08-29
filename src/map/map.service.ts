import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapEntity } from './entities/map.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MapService {

  constructor(
    @InjectRepository(MapEntity)
    private readonly mapRepository: Repository<MapEntity>
  ) { }

  async create(userId: string, dto: CreateMapDto): Promise<MapEntity> {
    return this.mapRepository.save(new MapEntity({
      ...dto,
      user_id: userId
    }))
  }

  async getAllUserMaps(userId: string): Promise<MapEntity[]> {
    return this.mapRepository.find({
      where: {
        user_id: userId
      }
    })
  }

  async getMapById(userId: string, id: number): Promise<MapEntity> {
    const map = this.mapRepository.findOne({
      where: {
        id,
        user_id: userId
      }
    })
    if (map) return map
    throw new NotFoundException()
  }
}
