import { MapEntity } from 'src/map/entities/map.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ParentEntity } from 'src/user/shared/entities/parent.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('points')
export class PointEntity extends ParentEntity {
    constructor(entity?: Partial<PointEntity>) {
        super()
        this.setArgumentToThisObject(entity)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
    location: string;

    @Column()
    user_id: string;

    @ManyToOne(() => UserEntity, (user) => user.points)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToMany(() => MapEntity, (maps) => maps.points)
    @JoinTable({ name: 'maps_points' })
    maps: MapEntity[]
}
