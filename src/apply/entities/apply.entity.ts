
import { Column, Table, Model, ForeignKey} from "sequelize-typescript";
import { Dogsitter } from "src/dogsitter/entities/dogsitter.entity";
import { Request } from "src/request/entities/request.entity";


@Table({
    tableName: 'apply',
    timestamps: false,
})
export class Apply  extends Model{
@ForeignKey(() => Request)
@Column({
    allowNull: false,
})
request_id!: number;
 
@ForeignKey(() => Dogsitter)
@Column({
    allowNull: false,
})
dogsitter_id!: number;

}