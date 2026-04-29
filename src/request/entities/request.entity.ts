import { Column, Table, Model, BelongsTo, ForeignKey, HasMany, DataType } from "sequelize-typescript";
import { Apply } from "src/apply/entities/apply.entity";
import { User } from "src/auth/entities/auth.entity";
import { Dog } from "src/dog/entities/dog.entity";
import { Service } from "src/service/entities/service.entity";

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

@Column({
    type: DataType.DATEONLY,
    allowNull: false,
})
date!: string;

@Column({
    type: DataType.TIME,
    allowNull: false,
})
start_time!: string;

@Column({ 
    type: DataType.TIME,
    allowNull: false,
})
end_time!: string;

@Column({
    allowNull:false,
    defaultValue:'open'
 })
 status!: string;

@Column
service_type!: string;

@ForeignKey(() => User)
@Column({
   allowNull:true,
})
assigned_dogsitter_id!: number;

@BelongsTo(() => Dog)
dog: Dog;

@BelongsTo(() => User, 'user_id')
owner: User;

@BelongsTo(() => User, 'assigned_dogsitter_id')
assignedDogsitter: User;

@HasMany(() => Apply)
applies: Apply[];

@HasMany(() => Service)
services: Service[];
}