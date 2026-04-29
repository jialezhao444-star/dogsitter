

import { Column, Table ,Model, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Request } from "src/request/entities/request.entity";


@Table({
    tableName: 'service',
    timestamps: false,
})
export class Service  extends Model{

@Column({
    allowNull: false,
})

@Column({
    allowNull: false,
})
price!: number;

@ForeignKey(() => Request)
@Column
request_id!: number;

@BelongsTo(() => Request)
requests: Request[];
}