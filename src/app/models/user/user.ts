export class Address {
  constructor(
    public city: string,
    public street: string,
    public zipcode: number
  ) {}
}

export class User {
  constructor(
    public _id: string,
    public name: string,
    public username: string,
    public email: string,
    public phone: number,
    public website: string,
    public address: Address,
  ) { }
}
