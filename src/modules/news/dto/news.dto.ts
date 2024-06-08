import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsString, IsUUID } from 'class-validator';
import { EnumNewsStatus, ResError } from 'src/interfaces/general.interfaces';

export class ReqGetNews {
  @IsNumberString()
  @ApiProperty()
  limit: number;

  @IsNumberString()
  @ApiProperty()
  offset: number;

  @IsEnum(EnumNewsStatus)
  @ApiProperty({ enum: EnumNewsStatus })
  news_status: EnumNewsStatus;
}

export class ResGetNews {
  @ApiProperty()
  news_id: string;

  @ApiProperty()
  news_title: string;

  @ApiProperty()
  news_description: string;

  @ApiProperty()
  news_body: string;

  @ApiProperty()
  news_status: EnumNewsStatus;

  @ApiProperty()
  news_date: Date;

  @ApiProperty()
  news_time: string;
}

export class CreateNewsOne {
  @IsString()
  @ApiProperty()
  news_title: string;

  @IsString()
  @ApiProperty()
  news_description: string;

  @IsString()
  @ApiProperty()
  news_body: string;
}

export class ResNews {
  @ApiProperty({ type: ResGetNews })
  data: ResGetNews;

  @ApiProperty({ type: ResError, nullable: true })
  error: ResError;
}

export class ReqUpdateNewsOne {
  @IsUUID('4')
  @ApiProperty()
  news_id: string;

  @IsString()
  @ApiProperty()
  news_title: string;

  @IsString()
  @ApiProperty()
  news_description: string;

  @IsString()
  @ApiProperty()
  news_body: string;
}
