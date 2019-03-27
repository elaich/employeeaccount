import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountModule} from './accounts/account.module';
import { join } from 'path'

@Module({
  imports: [
    AccountModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    MongooseModule.forRoot('mongodb://localhost/account')
  ],
})
export class AppModule {}
