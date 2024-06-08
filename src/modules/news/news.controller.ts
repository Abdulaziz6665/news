import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/role.decorator';
import { NewsService } from './news.service';
import {
  CreateNewsOne,
  ReqGetNews,
  ReqUpdateNewsOne,
  ResNews,
  ResGetNews,
} from './dto/news.dto';

@ApiBasicAuth('Authorization')
@ApiTags('news')
@Controller('news')
export class NewsControl {
  constructor(private readonly service: NewsService) {}

  @Get()
  @ApiCreatedResponse({ type: ResGetNews, isArray: true })
  @ApiOperation({ summary: 'Get news' })
  getNews(@Query() reqNews: ReqGetNews): Promise<ResGetNews[]> {
    reqNews.limit = Number(reqNews.limit);
    reqNews.offset = Number(reqNews.offset);
    return this.service.getNews(reqNews);
  }

  @Post()
  @Roles('ADMIN', 'MODERATOR')
  @ApiCreatedResponse({ type: ResNews })
  @ApiOperation({ summary: 'Create news one' })
  createNews(@Body() data: CreateNewsOne): Promise<ResNews> {
    return this.service.createNews(data);
  }

  @Put()
  @Roles('ADMIN', 'MODERATOR')
  @ApiCreatedResponse({ type: ResNews })
  @ApiOperation({ summary: 'Update news one' })
  updateNewsOne(@Body() data: ReqUpdateNewsOne): Promise<ResNews> {
    return this.service.updateNewsOne(data);
  }

  @Delete(':newsId')
  @Roles('ADMIN', 'MODERATOR')
  @ApiCreatedResponse({ type: ResNews })
  @ApiOperation({ summary: 'Delete news one' })
  deleteNewsOne(@Param('newsId') newsId: string) {
    return this.service.deleteNewsOne(newsId);
  }
}
