import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Base } from "./base.entity";
import { Match } from "./match.entity";
import { User } from "./user.entity";

@Entity()
@Unique(["userId", "matchId"])
export class Prediction extends Base {
    @ManyToOne(() => User, (user) => user.predictions, {eager: true} )
    @JoinColumn({ name: 'userId' })
    userId: number 

    @ManyToOne(() => Match, (match) => match.predictions, {eager: true})
    @JoinColumn({ name: 'matchId' })
    matchId: number 

    @Column({ type: 'int', nullable: true, default: null })
    homeGoals: number

    @Column({ type: 'int', nullable: true, default: null })
    awayGoals: number
}
