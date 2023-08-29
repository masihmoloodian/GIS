import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, Inject } from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.decorator';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Maps')
@Controller('map')
export class MapController {
  constructor(
    private readonly mapService: MapService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) { }

  @ApiOperation({ summary: 'Create a new map' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@User() user: UserEntity, @Body() dto: CreateMapDto) {
    return this.mapService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Get all user maps' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Get('user')
  getAllUserMaps(@User() user: UserEntity) {
    return this.mapService.getAllUserMaps(user.id);
  }

  @ApiOperation({ summary: 'Get a user map' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/:id')
  getMapById(@User() user: UserEntity, @Param('id') id: number) {
    return this.mapService.getMapById(user.id, id);
  }
}
