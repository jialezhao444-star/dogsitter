
import { Column, Table ,Model} from "sequelize-typescript";


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
}