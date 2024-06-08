import {
  sign as signed,
  verify as verification,
  IJwtPayload,
} from 'jsonwebtoken';
import { EnvController } from 'src/common/env/env.control';
import { UserRoles, UserStatus } from 'src/interfaces/general.interfaces';

declare module 'jsonwebtoken' {
  export interface IJwtPayload extends JwtPayload {
    user_id: string;
    user_role: UserRoles;
    user_status: UserStatus;
  }
}

const {
  ENV: { jwt },
} = new EnvController();

export class JWT {
  sign(payload: IJwtPayload) {
    return signed(payload, jwt.JWT_SECRET, { expiresIn: jwt.JWT_EXPIRE });
  }
  verify(accessToken: string) {
    return <IJwtPayload>verification(accessToken, jwt.JWT_SECRET);
  }
}
