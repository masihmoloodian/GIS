import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateMapDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string
}
