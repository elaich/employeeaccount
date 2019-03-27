import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountEditInput, AccountCreateInput } from '../graphql';

@Injectable()
export class AccountsService {

  private readonly accounts: Account[] = []

  constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

  async create(account: AccountCreateInput): Promise<Account> {
    const createdAccount = new this.accountModel(account)
    return await createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  async update(id: string, account: AccountEditInput): Promise<Account> {
    return await this.accountModel.findOneAndUpdate({_id: id}, account, {new: true}).exec();
  }

  async remove(id: string): Promise<Account> {
    return await this.accountModel.findOneAndRemove({_id: id}).exec();
  }

}
