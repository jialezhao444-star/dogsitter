
import { Column, Table ,Model, BelongsToMany, BelongsTo, HasMany, DataType} from "sequelize-typescript";
import { Request } from "src/request/entities/request.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Apply } from "src/apply/entities/apply.entity";
import { Service } from "src/service/entities/service.entity";


@Table({
    tableName: 'user',
    timestamps: false,
})
export class User extends Model{

@Column({
    type: DataType.STRING(200),
    allowNull: false,
})
name!: string;
 
@Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique : true,
})
email!: string;

@Column({
    type: DataType.STRING(200),
    allowNull: false,
})
lastname!: string;

@Column({
    type: DataType.TEXT,
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

@Column({
    allowNull: false,
    defaultValue: 'owner',
})
role!: string; // owner | dogsitter | admin

@HasMany(() => Request)
requests: Request[];

@HasMany(() => Apply)
applies: Apply[];

@HasMany(() => Service)
services: Service[];

@HasMany(() => Review)
reviews: Review[];

}