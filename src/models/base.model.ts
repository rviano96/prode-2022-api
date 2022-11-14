import { ApiProperty } from "@nestjs/swagger";

export class BaseModel {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    createdAt?: Date | null;

    @ApiProperty()
    deletedAt?: Date | null;

    @ApiProperty()
    updatedAt?: Date | null;

    constructor(id?:number, createdAt?: Date | null, deletedAt?: Date | null, updatedAt?: Date | null){
        this.deletedAt = deletedAt
        this.id = id
        this.createdAt = createdAt 
        this.updatedAt = updatedAt
    }
}