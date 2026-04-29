import { Column, Table ,Model, BelongsTo, ForeignKey, DataType} from "sequelize-typescript";
import { Service } from "src/service/entities/service.entity";

@Table({
    tableName: 'payment',
    timestamps: true,
})
export class Payment extends Model {

@Column({
    type: DataType.DECIMAL(10,2),
    allowNull: false,
})
amount!: number;

@Column({
    allowNull: false,
})
method!: string;

@Column({
    allowNull: false,
    defaultValue:'pending',
})
status!: string;

@ForeignKey(() => Service)
@Column({
    allowNull: false,
})
service_id!: number;

@BelongsTo(() => Service)
service: Service;
}