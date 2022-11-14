import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { Prediction } from "./prediction.entity";
import { Stadium } from "./stadium.entity";
import { Team } from "./team.entity";

@Entity()
export class Match extends Base {

    @Column({ type: 'timestamptz' })
    timeStart: Date

    @Column({ nullable: true })
    result: string;

    @Column()
    stage: string;

    @Column()
    code: string;

    @ManyToOne(() => Team, (team) => team.matches, { nullable: true, eager: true })
    @JoinColumn({ name: 'awayTeamId' })
    awayTeamId: number

    @ManyToOne(() => Team, (team) => team.matches, { nullable: true, eager: true })
    @JoinColumn({ name: 'homeTeamId' })
    homeTeamId: number

    @Column({ type: 'int', nullable: true, default: null })
    homeGoals: number

    @Column({ type: 'int', nullable: true, default: null })
    awayGoals: number

    @ManyToOne(() => Stadium, (stadium) => stadium.matches, { eager: false})
    @JoinColumn({ name: 'stadiumId' })
    stadiumId: number

    @OneToMany(() => Prediction, (prediction) => prediction.matchId)
    predictions: Prediction[]

}
