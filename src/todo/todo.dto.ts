import { IsNotEmpty, IsOptional } from "class-validator";

export class TodoDto {
    @IsNotEmpty()
    name: String

    @IsOptional()
    description: String
}