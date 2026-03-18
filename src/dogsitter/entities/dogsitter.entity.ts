
import { Column, Table ,Model, BelongsToMany, BelongsTo, HasMany} from "sequelize-typescript";
import { Apply } from "src/apply/entities/apply.entity";
import { Request } from "src/request/entities/request.entity";
import { Review } from "src/reviews/entities/review.entity";


@Table({
    tableName: 'dogsitters',
    timestamps: false,
})
export class Dogsitter extends Model{

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

@BelongsToMany(() => Request, () => Apply)
requests: Request[];

@HasMany(() => Review)
reviews: Review[];

}