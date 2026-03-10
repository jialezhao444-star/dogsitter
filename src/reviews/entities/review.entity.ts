
import { Column, Table ,Model} from "sequelize-typescript";


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

@Column({
    allowNull: false,
})
dogsitter_id!: string;

@Column({
    allowNull: false,
})
user_id!: string;


}