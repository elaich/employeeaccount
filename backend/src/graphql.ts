
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum AccountType {
    Savings = "Savings",
    Checking = "Checking"
}

export interface AccountCreateInput {
    holder: string;
    name: string;
    bank: string;
    branch: string;
    account_type: AccountType;
    account_number: string;
    employee_number: string;
}

export interface AccountEditInput {
    holder?: string;
    name?: string;
    bank?: string;
    branch?: string;
    account_type?: AccountType;
    account_number?: string;
    employee_number?: string;
}

export interface SearchInput {
    from?: number;
    to?: number;
}

export interface Account {
    _id: string;
    holder: string;
    name: string;
    bank: string;
    branch: string;
    account_type: AccountType;
    account_number: string;
    employee_number: string;
    last_update: Date;
}

export interface Bank {
    name: string;
    branches?: string[];
}

export interface IMutation {
    add(account?: AccountCreateInput): Account | Promise<Account>;
    edit(id: string, account?: AccountEditInput): Account | Promise<Account>;
    remove(id: string): Account | Promise<Account>;
}

export interface IQuery {
    all(): Account[] | Promise<Account[]>;
    search(searchInput: SearchInput): Account[] | Promise<Account[]>;
    banks(): Bank[] | Promise<Bank[]>;
    temp__(): boolean | Promise<boolean>;
}

export type Date = any;
