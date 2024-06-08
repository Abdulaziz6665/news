import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { Phone, ResponsePhone, SignUpReq } from './dto/login.dto';

@ApiTags('login')
@Controller('login')
export class LoginControl {
  constructor(private readonly service: LoginService) {}

  @Post('check-phone')
  @ApiOperation({ summary: 'Send phone number and get code' })
  @ApiCreatedResponse({ type: ResponsePhone })
  phone(@Body() phone: Phone): Promise<ResponsePhone> {
    return this.service.phone(phone);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up from server' })
  @ApiCreatedResponse({ type: ResponsePhone })
  signup(@Body() signup: SignUpReq) {
    return this.service.signup(signup);
  }
}
