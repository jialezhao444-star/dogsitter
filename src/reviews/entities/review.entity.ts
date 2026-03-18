
import { Column, Table ,Model, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Dogsitter } from "src/dogsitter/entities/dogsitter.entity";
import { User } from "src/user/entities/user.entity";


@Table({
    tableName: 'reviews',
    timestamps: false,
})
export class Review extends Model{

@Column({
    allowNull: false,
})
score!: number;

@Column({
    allowNull: false,
})
comment!: string;

@ForeignKey(() => Dogsitter)
@Column({
    allowNull: false,
})
dogsitter_id!: string;

@ForeignKey(() => User)
@Column({
    allowNull: false,
})
user_id!: string;

@BelongsTo(() => Dogsitter)
dogsitter: Dogsitter;

@BelongsTo(() => User)
users: User;

}