import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router as politicianRouter} from './politician.route'
import {router as userRouter} from './user.route'
import {router as voteRouter} from './vote.route'
import {router as adminRouter} from './admin.route'
import * as basicAuth from 'express-basic-auth'


const options = {
    users: { '': '' }
}
const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(basicAuth(options), politicianRouter)
  .use(basicAuth(options), userRouter)
  .use(basicAuth(options), voteRouter)
  .use(basicAuth(options), adminRouter);

const port = process.env.PORT || 4201;
app.listen(port, () => {
  return console.log(`Node ! App listening on port ${port}`);
})