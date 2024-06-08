import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '../../../', '.env') });

@Injectable()
export class EnvController {
  private env = process.env;

  ENV = {
    PORT: this.env.PORT,
    NODE_ENV: this.env.NODE_ENV,
    postgres: {
      DB_USER: this.env.DB_USER,
      DB_HOST: this.env.DB_HOST,
      DB_DATABASE: this.env.DB_DATABASE,
      DB_PASSWORD: this.env.DB_PASSWORD,
      DB_PORT: this.env.DB_PORT,
    },
    jwt: {
      JWT_SECRET: this.env.JWT_SECRET,
      JWT_EXPIRE: this.env.JWT_EXPIRE,
    },
  };
}
