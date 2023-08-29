import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto, SearchAreaDto } from './dto/create-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Polygon, Repository } from 'typeorm';
import { AreaEntity } from './entities/area.entity';
import { MapService } from 'src/map/map.service';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaEntity)
    private readonly areaRepository: Repository<AreaEntity>,
    private readonly mapService: MapService
  ) { }

  async create(userId: string, dto: CreateAreaDto): Promise<AreaEntity> {
    const _area = new AreaEntity()
    _area.boundary = {
      type: "Polygon",
      coordinates: dto.boundary,
    }

    const area = await this.areaRepository.save(new AreaEntity({
      user_id: userId,
      name: dto.name,
      boundary: _area.boundary
    }));

    if (dto.mapsIds && dto.mapsIds.length > 0) {
      await this.addMapsToArea(area.id, dto.mapsIds)
    }
    return area
  }


  async getUserAreaById(userId: string, id: number): Promise<AreaEntity> {
    const point = await this.areaRepository.findOne({
      where: {
        id,
        user_id: userId
      },
    })
    if (!point) throw new NotFoundException()
    return point
  }

  async getAllUserAreas(userId: string): Promise<AreaEntity[]> {
    return await this.areaRepository.find({
      where: {
        user_id: userId
      },
      relations: ['maps']
    })
  }

  async update(userId: string, id: number, dto: UpdateAreaDto): Promise<AreaEntity> {
    const foundArea = await this.getUserAreaById(userId, id)

    const _area = new AreaEntity()
    if (dto.boundary) {
      _area.boundary = {
        type: "Polygon",
        coordinates: dto.boundary,
      }
      dto.boundary = _area.boundary
    }
    if (dto.mapsIds && dto.mapsIds.length > 0) {
      await this.addMapsToArea(foundArea.id, dto.mapsIds)
    }
    delete dto.mapsIds
    await this.areaRepository.update(id, dto)
    return await this.getUserAreaById(userId, id)
  }

  async remove(userId: string, id: number): Promise<void> {
    const point = await this.getUserAreaById(userId, id)
    await this.areaRepository.remove(point)
  }

  async addMapsToArea(areaId: number, mapIds: number[]): Promise<AreaEntity> {
    const point = await this.areaRepository.createQueryBuilder("area")
      .leftJoinAndSelect("area.maps", "maps")
      .where("area.id = :areaId", { areaId })
      .getOne();
    if (!point.maps) point.maps = [];

    const uniqueMapIds = [...new Set(mapIds)];
    const existingMapIds = point.maps.map(map => map.id);
    const newMapIds = uniqueMapIds.filter(id => !existingMapIds.includes(id));

    const mapsToAdd = await this.mapService.getMapByIds(newMapIds);
    point.maps.push(...mapsToAdd);
    return await this.areaRepository.save(point);
  }

  async search(dto: SearchAreaDto) {
    const boundary: Polygon = {
      type: "Polygon",
      coordinates: dto.boundary,
    };

    const query = this.areaRepository.manager
      .createQueryBuilder(AreaEntity, 'area')
      .where("ST_Intersects(area.boundary, ST_SetSRID(ST_GeomFromGeoJSON(:boundary), ST_SRID(area.boundary)))", { boundary })
      .setParameters({
        boundary: JSON.stringify(boundary),
      });

    return await query.getMany();
  }
}
