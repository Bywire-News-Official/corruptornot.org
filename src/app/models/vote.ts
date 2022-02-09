import { User } from './user';
import { Politician } from '../models/politician';

export class Vote {
  id?: number;
  isCorrupt: boolean;
  user: User;
  politician: Politician;

  constructor(){
    this.isCorrupt = false;
    this.user = new User();
    this.politician = new Politician();
  }	
}
