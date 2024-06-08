import { NewsStatus } from 'src/interfaces/general.interfaces';

export interface INews {
  news_id: string;
  news_title: string;
  news_description: string;
  news_body: string;
  news_status: NewsStatus;
  news_date: Date;
  news_time: string;
}
