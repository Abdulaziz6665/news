import { Injectable } from '@nestjs/common';
import { ErrorsControl } from 'src/common/errors/errors.control';
import { NewsQuery } from './query/news.query';
import {
  CreateNewsOne,
  ReqGetNews,
  ReqUpdateNewsOne,
  ResNews,
} from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(
    private model: NewsQuery,
    private err: ErrorsControl,
  ) {}

  getNews(incData: ReqGetNews) {
    return this.model.getNews(incData);
  }

  async createNews(incData: CreateNewsOne): Promise<ResNews> {
    const data = await this.model.createNews(incData);
    return { data, error: null };
  }

  async updateNewsOne(incData: ReqUpdateNewsOne): Promise<ResNews> {
    const data = await this.model.updateNewsOne(incData);

    if (!data) return { data: null, error: this.err.getError(1003) };

    return { data, error: null };
  }

  async deleteNewsOne(newsId: string): Promise<ResNews> {
    const data = await this.model.deleteNewsOne(newsId);

    if (!data) return { data: null, error: this.err.getError(1003) };

    return { data, error: null };
  }
}
