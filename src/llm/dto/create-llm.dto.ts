import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LLMDto {
    @ApiProperty({ example: "capital of canada" })
    @IsString()
    prompt: string
}
