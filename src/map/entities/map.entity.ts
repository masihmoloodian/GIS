

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { ParentEntity } from 'src/user/shared/entities/parent.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PointEntity } from 'src/point/entities/point.entity';
import { AreaEntity } from 'src/area/entities/area.entity';

@Entity('maps')
export class MapEntity extends ParentEntity {
    constructor(entity?: Partial<MapEntity>) {
        super()
        this.setArgumentToThisObject(entity)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    user_id: string;

    @ManyToOne(() => UserEntity, (user) => user.maps)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToMany(() => PointEntity, (role) => role.maps)
    points: PointEntity[]

    @ManyToMany(() => AreaEntity, (areas) => areas.maps)
    areas: AreaEntity[]
}
