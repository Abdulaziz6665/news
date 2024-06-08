import { Injectable } from '@nestjs/common';
import { PostgresClient } from 'src/database/postgres/postgres.service';
import {
  CreateNewsOne,
  ReqGetNews,
  ReqUpdateNewsOne,
  ResGetNews,
} from '../dto/news.dto';
import { INews } from '../interface/news.interface';

@Injectable()
export class NewsQuery {
  constructor(private readonly db: PostgresClient) {}

  private GET_NEWS = `
  SELECT
    news_id,
    news_title,
    news_description,
    news_body,
    news_status,
    news_date,
    news_time::varchar
  FROM news
  WHERE news_status = $1
  limit $2 offset $3`;

  getNews(data: ReqGetNews): Promise<ResGetNews[]> {
    return this.db.fetchAll(
      this.GET_NEWS,
      data.news_status,
      data.limit,
      data.offset,
    );
  }

  private CREATE_NEWS = `
  INSERT INTO news(news_title,news_description,news_body) VALUES ($1,$2,$3) returning *`;

  createNews(data: CreateNewsOne): Promise<ResGetNews> {
    return this.db.fetch(
      this.CREATE_NEWS,
      data.news_title,
      data.news_description,
      data.news_body,
    );
  }

  private UPDATE_NEWS_ONE = `
  UPDATE news SET
    news_title = $2,
    news_description = $3,
    news_body = $4
  WHERE news_id = $1
  returning *`;

  updateNewsOne(data: ReqUpdateNewsOne): Promise<ResGetNews> {
    return this.db.fetch(
      this.UPDATE_NEWS_ONE,
      data.news_id,
      data.news_title,
      data.news_description,
      data.news_body,
    );
  }

  private DELETE_NEWS_ONE = `
  DELETE FROM news WHERE news_id = $1 returning *`;

  deleteNewsOne(newsId: string): Promise<ResGetNews> {
    return this.db.fetch(this.DELETE_NEWS_ONE, newsId);
  }
}
