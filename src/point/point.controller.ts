import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PointService } from './point.service';
import { CreatePointDto, SearchPointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.decorator';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Points')
@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) { }


  @ApiOperation({ summary: 'Create a new point' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@User() user: UserEntity, @Body() dto: CreatePointDto) {
    return this.pointService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Get all user points' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getAll(@User() user: UserEntity) {
    return this.pointService.getAllUserPoints(user.id);
  }

  @ApiOperation({ summary: 'Get a user point' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@User() user: UserEntity, @Param('id') id: number) {
    return this.pointService.getById(user.id, id);
  }

  @ApiOperation({ summary: 'Update a user point' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@User() user: UserEntity, @Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
    return this.pointService.update(user.id, +id, updatePointDto);
  }

  @ApiOperation({ summary: 'Delete a user point' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@User() user: UserEntity, @Param('id') id: string) {
    return this.pointService.remove(user.id, +id);
  }

  @ApiOperation({ summary: 'Search' })
  @Post('search')
  async search(@Body() dto: SearchPointDto) {
    return this.pointService.search(dto);
  }
}
