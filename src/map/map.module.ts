import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { MapEntity } from './entities/map.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MapEntity,
    ]),
  ],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService]
})
export class MapModule { }
