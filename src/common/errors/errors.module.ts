import { Global, Module } from '@nestjs/common';
import { ErrorsControl } from './errors.control';

@Global()
@Module({
  providers: [ErrorsControl],
  exports: [ErrorsControl],
})
export class ErrorsModule {}
