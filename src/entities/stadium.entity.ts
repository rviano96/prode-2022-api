import { Column, Entity, OneToMany, Unique } from "typeorm";
import { Base } from "./base.entity";
import { Match } from "./match.entity";

@Entity()
@Unique(['name'])
export class Stadium extends Base{
    @Column()
    name: string;

    @OneToMany(() => Match, (match) => match.stadiumId)
    matches:Match[]    
}
