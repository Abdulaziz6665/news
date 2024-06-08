import { Global, Module } from '@nestjs/common';
import { EnvController } from './env.control';

@Global()
@Module({
  providers: [EnvController],
  exports: [EnvController],
})
export class EnvModule {}
