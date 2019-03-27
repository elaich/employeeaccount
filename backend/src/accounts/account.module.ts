import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountResolver } from './account.resolver';
import { AccountsService } from './account.service';
import { AccountSchema } from './account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  providers: [AccountsService, AccountResolver]
})
export class AccountModule {}
