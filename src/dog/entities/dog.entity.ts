import { Column, Table ,Model, BelongsTo, HasMany, ForeignKey} from "sequelize-typescript";
import { User } from "src/auth/entities/auth.entity";
import { Request } from "src/request/entities/request.entity";

@Table({
    tableName: 'dogs',
    timestamps: false,
})
export class Dog extends Model {

@Column({
    allowNull: false,
})
name!: string;

@Column({
    allowNull: false, 
})
age!: string;

@Column
race!: string;

@Column
image!: string;

@ForeignKey(() => User)
@Column({ allowNull:false })
user_id!: number;

@BelongsTo(() => User)
user: User;

@HasMany(() => Request)
requests: Request[];
}