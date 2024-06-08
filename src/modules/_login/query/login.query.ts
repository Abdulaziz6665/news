import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/postgres/postgres.service';
import { Code, Phone, SignUpReq } from '../dto/login.dto';
import { IVerifyPhone, UserData } from '../interface/login.interface';

@Injectable()
export class LoginQuery {
  constructor(private readonly db: PostgresClient) {}

  private DELETE_OLD_CODE_IF_EXISTS = `
  DELETE FROM verify_phone WHERE phone = $1`;

  private CREATE_VERIFY_PHONE_CODE = `
  INSERT INTO verify_phone(phone,received_code) VALUES ($1, $2) returning phone, received_code`;

  async setupCode(phone: Phone, code: number): Promise<Code> {
    await this.db.fetch(this.DELETE_OLD_CODE_IF_EXISTS, phone.phone);
    return this.db.fetch(this.CREATE_VERIFY_PHONE_CODE, phone.phone, code);
  }

  private GET_VERIFY_PHONE_CODE = `
  SELECT phone, received_code, expire_time FROM verify_phone WHERE phone = $1 and received_code = $2`;

  getVerifyCode(phone: string, code: number): Promise<IVerifyPhone> {
    return this.db.fetch(this.GET_VERIFY_PHONE_CODE, phone, code);
  }

  private CHECK_USER = `
  SELECT user_id FROM users WHERE user_phone = $1`;

  checkUserExists(phone: string): Promise<UserData> {
    return this.db.fetch(this.CHECK_USER, phone);
  }

  private CREATE_USER = `
  INSERT INTO users(user_name,user_phone,user_pass) VALUES ($1, $2, md5($3) ) returning user_id, user_role, user_status`;

  createUser(data: SignUpReq): Promise<UserData> {
    return this.db.fetch(
      this.CREATE_USER,
      data.user_name,
      data.phone,
      data.user_pass,
    );
  }
}
