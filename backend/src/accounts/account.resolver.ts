import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AccountCreateInput,
  AccountEditInput,
  Account,
  SearchInput,
} from '../graphql';
import { AccountsService } from './account.service';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query()
  async all() {
    return await this.accountsService.findAll();
  }

  @Query()
  async search(@Args('searchInput') searchInput: SearchInput) {
    return await this.accountsService.search(searchInput);
  }

  @Query()
  async banks() {
    return await this.accountsService.banks();
  }

  @Mutation()
  async add(@Args('account') account: AccountCreateInput) {
    return await this.accountsService.create(account);
  }

  @Mutation()
  async edit(
    @Args('id') id: string,
    @Args('account') account: AccountEditInput,
  ) {
    return await this.accountsService.update(id, account);
  }

  @Mutation()
  async remove(@Args('id') id: string) {
    return await this.accountsService.remove(id);
  }
}
