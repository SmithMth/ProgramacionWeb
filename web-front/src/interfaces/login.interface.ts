import { RoleData } from "./Role.interface";
import { UserData } from "./User.interface";

export interface LoginData{
    user: UserData;
    roles: RoleData[];
    token: string;   
}