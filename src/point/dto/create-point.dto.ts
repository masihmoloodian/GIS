import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Point } from 'geojson';

class PointDto {
    @ApiProperty()
    @IsNotEmpty()
    longitude: number

    @ApiProperty()
    @IsNotEmpty()
    latitude: number
}

export class CreatePointDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    point: PointDto

    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    mapsIds?: number[]
}
