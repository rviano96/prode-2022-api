import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Base } from "./base.entity";
import { Match } from "./match.entity";

@Entity()
@Unique(['name'])
export class Team extends Base {
    @Column()
    name: string;

    @Column()
    acronym: string;

    @Column()
    flag: string;

    @OneToMany(() => Match, (match) => match.id)
    @JoinColumn()
    matches: Match[] | []

    @Column()
    group: string
}
