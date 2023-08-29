import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { PointEntity } from './entities/point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapModule } from 'src/map/map.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointEntity,
    ]),
    MapModule
  ],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule { }
