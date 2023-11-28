import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class CreateTypesEnvironmentDto {
    @IsNumber()
    id?: number;

    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @IsOptional()
    @Length(0, 500)
    description?: string;
}
