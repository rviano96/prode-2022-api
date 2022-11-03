import { IsNotEmpty, IsNumber, Length, Max, Min } from 'class-validator';
export class CreateItemDto {
    @IsNotEmpty()
    name: string;
    @IsNumber()
    @Max(999)
    @Min(0)
    price: number;
    description: string;
}
