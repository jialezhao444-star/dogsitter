

import { Column, Table ,Model} from "sequelize-typescript";


@Table({
    tableName: 'service',
    timestamps: false,
})
export class Service  extends Model{

@Column({
    allowNull: false,
})
type!: string;
 
@Column({
    allowNull: false,
})
time!: number;

@Column({
    allowNull: false,
})
address!: string;


@Column({
    allowNull: false,
})
date!: string;


@Column({
    allowNull: false,
})
price!: number;
}