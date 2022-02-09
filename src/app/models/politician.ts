export class Politician {
  id?: number;
  name: string;
  description: string;
  image: string;
  votes: number;
  corrupt: number;
  notCorrupt: number;

  constructor(){
    this.notCorrupt = 0;
    this.corrupt = 0;
    this.name = '';
    this.description = '';
    this.image = '';
    this.votes = 0;
  }
}
