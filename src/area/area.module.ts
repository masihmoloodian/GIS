import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { AreaEntity } from './entities/area.entity';
import { MapModule } from 'src/map/map.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AreaEntity,
    ]),
    MapModule
  ],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule { }
