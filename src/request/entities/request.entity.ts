import { Column, Table, Model, BelongsTo, ForeignKey, HasMany, DataType } from "sequelize-typescript";
import { Apply } from "src/apply/entities/apply.entity";
import { User } from "src/auth/entities/auth.entity";
import { Service } from "src/service/entities/service.entity";

@Table({
    tableName: 'requests',
    timestamps: false,
})
export class Request extends Model {

@ForeignKey(() => User)
@Column({
    allowNull: false,
})
user_id!: number;

@Column({
    allowNull: false,
})
dog_name!: string;

@Column({
    allowNull: false,
})
dog_age!: string;

@Column({
    allowNull: false,
})
dog_race!: string;

@Column({
    type: DataType.TEXT,
    allowNull: true,
})
dog_image!: string;

@Column({
    allowNull: false,
})
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

@Column({
    allowNull:false,
})
service_type!: string;

@ForeignKey(() => User)
@Column({
    type: DataType.INTEGER,
    allowNull:true,
})
assigned_dogsitter_id!: number | null;

@BelongsTo(() => User, 'user_id')
owner: User;

@BelongsTo(() => User, 'assigned_dogsitter_id')
assignedDogsitter: User;

@HasMany(() => Apply)
applies: Apply[];

@HasMany(() => Service)
services: Service[];
}