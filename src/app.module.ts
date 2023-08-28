import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MapModule } from './map/map.module';
import { PointModule } from './point/point.module';
import { AreaModule } from './area/area.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgis',
      password: 'postgis',
      database: 'gis',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    MapModule,
    PointModule,
    AreaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}