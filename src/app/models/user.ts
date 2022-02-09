export class User {
  id?: number;
  name: string;
  email: string;
  ip: string;

  constructor(){
    this.name = '';
    this.email = '';
    this.ip = '';
  }
}
