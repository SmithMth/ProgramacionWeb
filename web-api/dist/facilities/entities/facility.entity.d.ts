import { Environment } from "src/environments/entities/environment.entity";
export declare class Facility {
    id: number;
    name: string;
    description: string;
    environments: Environment[];
}
