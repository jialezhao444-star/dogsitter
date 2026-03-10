
import { Column, Table ,Model} from "sequelize-typescript";


@Table({
    tableName: 'apply',
    timestamps: false,
})
export class Apply  extends Model{

@Column({
    allowNull: false,
})
request_id!: string;
 
@Column({
    allowNull: false,

})
dogsitter_id!: string;

}