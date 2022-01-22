import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router as politicianRouter} from './politician'

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(politicianRouter);

const port = process.env.PORT || 4201;
app.listen(port, () => {
  return console.log('Node App listening on port ${port}');
})