import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

const sample = [
    [
        [-73.9819, 40.7681],
        [-73.9580, 40.8006],
        [-73.9493, 40.7968],
        [-73.9731, 40.7642],
        [-73.9819, 40.7681]
    ]
]

export class CreateAreaDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ isArray: true, example: sample })
    @IsNotEmpty()
    boundary: number[];

    @ApiPropertyOptional({ type: Number, isArray: true })
    @IsOptional()
    mapsIds?: number[]
}


export class SearchAreaDto {
    @ApiProperty({ isArray: true, example: sample })
    @IsNotEmpty()
    boundary: number[][][];
}