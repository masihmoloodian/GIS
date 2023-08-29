import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ParentEntity } from 'src/user/shared/entities/parent.entity';
import { MapEntity } from 'src/map/entities/map.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Polygon } from 'geojson';

@Entity('areas')
export class AreaEntity extends ParentEntity {
    constructor(entity?: Partial<AreaEntity>) {
        super()
        this.setArgumentToThisObject(entity)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'geography', spatialFeatureType: 'Polygon' })
    boundary: Polygon;

    @Column()
    user_id: string;

    @ManyToOne(() => UserEntity, (user) => user.areas)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToMany(() => MapEntity, (maps) => maps.areas)
    @JoinTable({ name: 'maps_areas' })
    maps: MapEntity[]
}
