import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { ParentEntity } from '../shared/entities/parent.entity';
import { hash } from 'bcrypt';
import { MapEntity } from 'src/map/entities/map.entity';
import { PointEntity } from 'src/point/entities/point.entity';
import { AreaEntity } from 'src/area/entities/area.entity';
import { ConfigService } from '@nestjs/config';
require('dotenv').config()

@Entity('users')
export class UserEntity extends ParentEntity {
    constructor(
        entity?: Partial<UserEntity>,
        private configService?: ConfigService
    ) {
        super()
        this.setArgumentToThisObject(entity)
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => MapEntity, (maps) => maps.user)
    maps: MapEntity[]

    @OneToMany(() => PointEntity, (points) => points.user)
    points: PointEntity[]

    @OneToMany(() => AreaEntity, (areas) => areas.user)
    areas: AreaEntity[]

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, process.env.SALT_HASH)
        }
    }
}
