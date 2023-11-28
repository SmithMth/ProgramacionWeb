import { IsString, IsOptional, Length, IsEmpty } from 'class-validator';

export class CreateFacilityDto {
    @IsEmpty()
    id:number;

    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
