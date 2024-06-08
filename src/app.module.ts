import { Module, RequestMethod } from '@nestjs/common';
import { Modules } from './modules/modules';
import { dbModule } from './database/postgres/postgres.module';
import { EnvModule } from './common/env/env.module';
import { Middleware } from './common/middlewares/middleware';
import {
  MiddlewareConsumer,
  NestModule,
  RouteInfo,
} from '@nestjs/common/interfaces';
import { ErrorsModule } from './common/errors/errors.module';

const publicRoutes: RouteInfo[] = [
  { path: 'login/(.*)', method: RequestMethod.ALL },
];

@Module({
  imports: [dbModule, ErrorsModule, EnvModule, Modules],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .exclude(...publicRoutes)
      .forRoutes('*');
  }
}
