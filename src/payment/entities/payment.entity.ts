
import { Column, Table ,Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import { Service } from "src/service/entities/service.entity";


@Table({
        tableName: 'payment',
    timestamps: false,
})
export class Payment  extends Model{

@Column({
    allowNull: false,
})
ammount!: string;
 
@Column({
    allowNull: false,

})
method!: string;

@Column({
    allowNull: false,

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