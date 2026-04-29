import { Column, Table, Model, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Dog } from "src/dog/entities/dog.entity";
import { Service } from "src/service/entities/service.entity";
import { User } from "src/user/entities/user.entity";

@Table({
    tableName: 'requests',
    timestamps: false,
})
export class Request extends Model {

@ForeignKey(() => Dog)
@Column
dog_id!: number;

@ForeignKey(() => User)
@Column
user_id!: number;

@Column
address!: string;

@Column
date!: string;

@Column
time!: string;

@Column
service_type!: string;

@BelongsTo(() => Dog)
dog: Dog;

@BelongsTo(() => User)
user: User;

@HasMany(() => Service)
service: Service;
}