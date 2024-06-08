import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import { ResError } from 'src/interfaces/general.interfaces';

export class Phone {
  @IsString()
  @Length(12, 12)
  @ApiProperty({ maxLength: 12, example: '998903536665' })
  phone: string;
}

export class Code {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  received_code: number;

  @ApiProperty()
  user_already_registered: boolean;
}

export class ResponsePhone {
  @ApiProperty({ type: Code })
  data: Code;

  @ApiProperty({ nullable: true })
  error: ResError;
}

export class SignUpReq {
  @IsString()
  @Length(12, 12)
  @ApiProperty()
  phone: string;

  @IsNumber()
  @ApiProperty()
  received_code: number;

  @IsString()
  @Length(2, 32)
  @ApiProperty()
  user_name: string;

  @IsString()
  @ApiProperty()
  user_pass: string;
}

export class SignUpToken {
  @ApiProperty()
  jwtToken: string;
}

export class ResSignUp {
  @ApiProperty({ type: SignUpToken })
  data: SignUpToken;

  @ApiProperty({ nullable: true })
  error: ResError;
}
