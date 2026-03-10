
import { Column, Table ,Model} from "sequelize-typescript";


@Table({
    tableName: 'dogs',
    timestamps: false,
})
export class Dog  extends Model{

@Column({
    allowNull: false,
})
name!: string;
 
@Column({
    allowNull: false,
})
age!: number;

@Column({})
race!: string;


@Column({})
image!: string;




}