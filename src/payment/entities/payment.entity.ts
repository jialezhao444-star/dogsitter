
import { Column, Table ,Model} from "sequelize-typescript";


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
@Column({
    allowNull: false,

})
service_id!: string;

}