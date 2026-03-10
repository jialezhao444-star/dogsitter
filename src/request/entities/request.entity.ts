
import { Column, Table ,Model} from "sequelize-typescript";


@Table({
    tableName: 'requests',
    timestamps: false,
})
export class Request  extends Model{

@Column({
    allowNull: false,
})
dog_id!: string;
 
@Column({
    allowNull: false,
  
})
user_id!: string;
@Column({
    allowNull: false,
  
})
address!: string;

@Column({
    allowNull: false,
  
})
date!: string;


@Column({
    allowNull: false,
  
})
time!: string;





}