import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router as politicianRouter} from './politician'

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(politicianRouter);

app.listen(4201, () => {
  return console.log('Node App listening on port 4201');
})