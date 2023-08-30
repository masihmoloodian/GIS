import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';

@Module({
  controllers: [LlmController],
  providers: [LlmService],
})
export class LlmModule {}
