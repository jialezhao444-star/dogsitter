import { Column, Table ,Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import { User } from "src/auth/entities/auth.entity";
import { Service } from "src/service/entities/service.entity";

@Table({
    tableName: 'reviews',
    timestamps: true,
})
export class Review extends Model {

@Column({
    allowNull: false,
})
score!: number;

@Column({
    allowNull: false,
})
comment!: string;

@ForeignKey(() => User)
@Column({
    allowNull: false,
})
dogsitter_id!: number;

@ForeignKey(() => User)
@Column({
    allowNull: false,
})
user_id!: number;

@ForeignKey(() => Service)
@Column({
    allowNull:false,
})
service_id!: number;

@BelongsTo(() => User, 'dogsitter_id')
dogsitter: User;

@BelongsTo(() => User, 'user_id')
user: User;

@BelongsTo(() => Service)
service: Service;
}