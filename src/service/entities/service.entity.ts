import { Column, Table ,Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { User } from "src/auth/entities/auth.entity";
import { Request } from "src/request/entities/request.entity";

@Table({
    tableName: 'service',
    timestamps: true,
})
export class Service extends Model {

@Column({
    type: DataType.DECIMAL(10,2),
    allowNull: false,
})
price!: number;

@ForeignKey(() => Request)
@Column({
    allowNull:false,
})
request_id!: number;

@ForeignKey(() => User)
@Column({
    allowNull:false,
})
user_id!: number; // assigned dogsitter

@Column({
    allowNull:false,
    defaultValue:'pending',
})
status!: string;

@BelongsTo(() => Request)
request: Request;

@BelongsTo(() => User)
user: User;
}