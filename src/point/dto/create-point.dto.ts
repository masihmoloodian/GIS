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

const sample = [-73.9819, 40.7681]

export class CreatePointDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ isArray: true, example: sample })
    @IsNotEmpty()
    point: number[]

    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    mapsIds?: number[]
}

export class SearchPointDto {
    @ApiProperty({ isArray: true, example: sample })
    @IsNotEmpty()
    point: number[]
}
