
import { Column, Table ,Model, BelongsTo, HasMany, ForeignKey} from "sequelize-typescript";
import { Request } from "src/request/entities/request.entity";
import { User } from "src/user/entities/user.entity";


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

@ForeignKey(() => User)
@Column({})
user_id!: string;

@BelongsTo(() => User)
users: User[];

@HasMany(() => Request)
requests: Request[];


}