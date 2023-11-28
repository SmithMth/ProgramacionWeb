import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateTypesEnvironmentDto{
    @IsString()
    @Length(1, 100)
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    @Length(0, 500)
    description?: string;
}