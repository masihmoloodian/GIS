import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePointDto, SearchPointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PointEntity } from './entities/point.entity';
import { Repository } from 'typeorm';
import { MapService } from 'src/map/map.service';
import { Point } from "typeorm"

@Injectable()
export class PointService {

  constructor(
    @InjectRepository(PointEntity)
    private readonly pointsRepository: Repository<PointEntity>,
    private readonly mapService: MapService
  ) { }

  async create(userId: string, dto: CreatePointDto): Promise<PointEntity> {
    const _point = new PointEntity()
    _point.point = {
      type: "Point",
      coordinates: dto.point,
    }

    const point = this.pointsRepository.create(new PointEntity({
      user_id: userId,
      name: dto.name,
      point: _point.point
    }));

    const createdPoint = await this.pointsRepository.save(point);
    if (dto.mapsIds && dto.mapsIds.length > 0) {
      await this.addMapsToPoint(point.id, dto.mapsIds)
    }
    return createdPoint
  }

  async getById(userId: string, id: number): Promise<PointEntity> {
    const point = await this.pointsRepository.findOne({
      where: {
        id,
        user_id: userId
      },
    })
    if (!point) throw new NotFoundException()
    return point
  }

  async getAllUserPoints(userId: string): Promise<PointEntity[]> {
    return await this.pointsRepository.find({
      where: {
        user_id: userId
      },
      relations: ['maps']
    })
  }

  async update(userId: string, id: number, dto: UpdatePointDto): Promise<PointEntity> {
    const foundPoint = await this.getById(userId, id)

    const _point = new PointEntity()
    if (dto.point) {
      _point.point = {
        type: "Point",
        coordinates: dto.point,
      }
      dto.point = _point.point
    }

    if (dto.mapsIds && dto.mapsIds.length > 0) {
      await this.addMapsToPoint(foundPoint.id, dto.mapsIds)
    }
    delete dto.mapsIds
    await this.pointsRepository.update(id, dto)
    return await this.getById(userId, id)
  }

  async remove(userId: string, id: number): Promise<void> {
    const point = await this.getById(userId, id)
    await this.pointsRepository.remove(point)
  }

  async addMapsToPoint(pointId: number, mapIds: number[]): Promise<PointEntity> {
    const point = await this.pointsRepository.createQueryBuilder("point")
      .leftJoinAndSelect("point.maps", "maps")
      .where("point.id = :pointId", { pointId })
      .getOne();
    if (!point.maps) point.maps = [];

    const uniqueMapIds = [...new Set(mapIds)];
    const existingMapIds = point.maps.map(map => map.id);
    const newMapIds = uniqueMapIds.filter(id => !existingMapIds.includes(id));

    const mapsToAdd = await this.mapService.getMapByIds(newMapIds);
    point.maps.push(...mapsToAdd);
    return await this.pointsRepository.save(point);
  }

  async search(dto: SearchPointDto) {
    const origin: Point = {
      type: "Point",
      coordinates: dto.point,
    }
    const query = this.pointsRepository.manager
      .createQueryBuilder(PointEntity, 'point')
      .where("ST_Distance(point.point, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(point.point))) = 0", { origin })
      .setParameters({
        origin: JSON.stringify(origin),
      });
    return await query.getMany();
  }
}