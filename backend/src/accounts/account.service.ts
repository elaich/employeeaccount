import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Account,
  AccountEditInput,
  AccountCreateInput,
  SearchInput,
} from '../graphql';

@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];

  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
  ) {}

  async create(account: AccountCreateInput): Promise<Account> {
    const createdAccount = new this.accountModel(account);
    return await createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return await this.accountModel.find().exec();
  }

  async search(searchInput: SearchInput): Promise<Account[]> {
    console.log(searchInput.from, searchInput.to);
    const { from = 0, to = 10000000 } = searchInput;
    const result = await this.accountModel
      .aggregate([
        { $addFields: { employee_number_int: { $toInt: '$employee_number' } } },
        {
          $match: { employee_number_int: { $gt: from, $lt: to } },
        },
      ])
      .exec();
    console.log(result);
    return result;
  }

  async update(id: string, account: AccountEditInput): Promise<Account> {
    return await this.accountModel
      .findOneAndUpdate({ _id: id }, account, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Account> {
    return await this.accountModel.findOneAndRemove({ _id: id }).exec();
  }
}
