import { Environment } from "src/environments/entities/environment.entity";
import { User } from "src/users/entities/user.entity";
import { Period } from "src/periods/entities/period.entity";
export declare class Booking {
    id: number;
    affair: string;
    fecha: Date;
    environment: Environment;
    user: User;
    period: Period;
}
