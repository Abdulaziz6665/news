import { Module } from '@nestjs/common';
import { NewsControl } from './news.controller';
import { NewsService } from './news.service';
import { RolesGuard } from 'src/roles/role.guard';
import { NewsQuery } from './query/news.query';

@Module({
  imports: [],
  controllers: [NewsControl],
  providers: [
    { provide: 'APP_GUARD', useClass: RolesGuard },
    NewsService,
    NewsQuery,
  ],
})
export class NewsModule {}
