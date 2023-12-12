import { Environment } from 'src/environments/entities/environment.entity';
import { User } from 'src/users/entities/user.entity';
import { Period } from 'src/periods/entities/period.entity';
export declare class UpdateBookingDto {
    affair?: string;
    fecha?: Date;
    isAccepted?: boolean;
    isActive?: boolean;
    environment?: Environment;
    user?: User;
    period?: Period;
}
