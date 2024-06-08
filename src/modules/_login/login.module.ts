import { Module } from '@nestjs/common';
import { LoginControl } from './login.control';
import { LoginService } from './login.service';
import { LoginQuery } from './query/login.query';

@Module({
  providers: [LoginService, LoginQuery],
  controllers: [LoginControl],
})
export class LoginModule {}
