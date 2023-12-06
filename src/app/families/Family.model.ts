import {User} from "./user.model";

export interface Family  {
    family_id: string;
    family_name: string;
    is_admin: boolean;
    users: User[];
}