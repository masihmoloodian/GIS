import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AreaService } from './area.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.decorator';
import { CreateAreaDto } from './dto/create-area.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateAreaDto } from './dto/update-area.dto';

@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }


  @ApiOperation({ summary: 'Create a new area' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@User() user: UserEntity, @Body() dto: CreateAreaDto) {
    return this.areaService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Get all user areas' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getAllUserAreas(@User() user: UserEntity) {
    return this.areaService.getAllUserAreas(user.id);
  }

  @ApiOperation({ summary: 'Get a user area' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@User() user: UserEntity, @Param('id') id: number) {
    return this.areaService.getUserAreaById(user.id, +id);
  }

  @ApiOperation({ summary: 'Update a  area' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@User() user: UserEntity, @Param('id') id: number, @Body() dto: UpdateAreaDto) {
    return this.areaService.update(user.id, +id, dto);
  }

  @ApiOperation({ summary: 'delete a area' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@User() user: UserEntity, @Param('id') id: string) {
    return this.areaService.remove(user.id, +id);
  }
}
