import { ApiProperty, SwaggerModule } from '@nestjs/swagger';

export type UserRoles = 'ADMIN' | 'MODERATOR' | 'USER';

export type UserStatus = 'ACTIVE' | 'BANNED';

export enum EnumNewsStatus {
  READY = 'READY',
  IN_REVIEW = 'IN_REVIEW',
}

export type NewsStatus = EnumNewsStatus.READY | EnumNewsStatus.IN_REVIEW;

export class ResError extends SwaggerModule {
  @ApiProperty()
  code: number;

  @ApiProperty()
  errorMessage: string;
}
