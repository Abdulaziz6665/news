import { Injectable } from '@nestjs/common';
import { JWT } from 'src/config/jwt';
import { LoginQuery } from './query/login.query';
import { Phone, ResSignUp, ResponsePhone, SignUpReq } from './dto/login.dto';
import { ErrorsControl } from 'src/common/errors/errors.control';

@Injectable()
export class LoginService {
  constructor(
    private model: LoginQuery,
    private err: ErrorsControl,
  ) {}

  async phone(phone: Phone): Promise<ResponsePhone> {
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
    const data = await this.model.setupCode(phone, code);

    const existsUser = await this.model.checkUserExists(phone.phone);
    data.user_already_registered = Boolean(existsUser);

    if (!data) return { data: null, error: this.err.getError(1000) };

    return {
      data,
      error: null,
    };
  }

  async signup(incData: SignUpReq): Promise<ResSignUp> {
    const check = await this.model.getVerifyCode(
      incData.phone,
      incData.received_code,
    );

    if (!check) return { data: null, error: this.err.getError(1001) };

    const codeExpireTime = new Date(check.expire_time).getTime();
    if (codeExpireTime < Date.now())
      return { data: null, error: this.err.getError(1002) };

    const existsUser = await this.model.checkUserExists(incData.phone);

    const jwt = new JWT();
    if (existsUser) {
      return { data: { jwtToken: jwt.sign(existsUser) }, error: null };
    }

    const createdUser = await this.model.createUser(incData);

    return { data: { jwtToken: jwt.sign(createdUser) }, error: null };
  }
}
