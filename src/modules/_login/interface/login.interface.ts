import { UserRoles, UserStatus } from '../../../interfaces/general.interfaces';

export interface IVerifyPhone {
  phone: string;
  received_code: number;
  expire_time: Date;
}

export interface UserData {
  user_id: string;
  user_status: UserStatus;
  user_role: UserRoles;
}
