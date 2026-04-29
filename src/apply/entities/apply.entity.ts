
import { Column, Table, Model, ForeignKey} from "sequelize-typescript";
import { User } from "src/auth/entities/auth.entity";
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
 
@ForeignKey(() => User)
@Column({
    allowNull: false,
})
user_id!: number; // dogsitter applicant

@Column({
    allowNull:false,
    defaultValue:'applied',
})
status!: string;

}