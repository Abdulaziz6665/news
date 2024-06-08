import { Module } from '@nestjs/common';
import { LoginModule } from './_login/login.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [LoginModule, NewsModule],
})
export class Modules {}
