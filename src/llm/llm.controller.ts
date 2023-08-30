import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LLMDto } from './dto/create-llm.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) { }

  @ApiOperation({ summary: 'Find location point(latitude and longitude) with given location name' })
  @Post('find-location-point')
  findLocation(@Body() dto: LLMDto) {
    return this.llmService.findLocation(dto);
  }
}
