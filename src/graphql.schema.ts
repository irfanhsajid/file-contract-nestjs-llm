
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TQuery {
    sayHello: string;
}

export class User {
    id: string;
    name: string;
    email: string;
}

export abstract class IQuery {
    abstract getUser(id: string): User | Promise<User>;

    abstract hello(): string | Promise<string>;
}

type Nullable<T> = T | null;
