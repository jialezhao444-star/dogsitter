

import { Column, Table ,Model, HasMany, ForeignKey} from "sequelize-typescript";
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
request_id!: string;

@HasMany(() => Request)
requests: Request[];
}