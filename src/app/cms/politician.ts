export class Politician {
  id?: number;
  name: string;
  description: string;
  image: string;
  votes: number;
  corrupt: number;
  not_corrupt: number;

  constructor(){
    this.not_corrupt = 0;
    this.corrupt = 0;
    this.name = '';
    this.description = '';
    this.image = '';
    this.votes = 0;
  }
}
