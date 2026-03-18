
import { Column, Table ,Model, HasMany} from "sequelize-typescript";
import { Request } from "src/request/entities/request.entity";
import { Review } from "src/reviews/entities/review.entity";


@Table({
    tableName: 'users',
    timestamps: false,
})
export class User  extends Model{

@Column({
    allowNull: false,
})
name!: string;
 
@Column({
    allowNull: false,
    unique: true,
})
email!: string;

@Column({
    allowNull: false,
})
lastname!: string;

@Column({
    allowNull: false,
})
password!: string;

@Column({
    allowNull: false,
})
address!: string;

@Column({
    allowNull: false,
})
phone!: string;

@HasMany(() => Request)
requests: Request[];

@HasMany(() => Review)
reviews: Review[];

}