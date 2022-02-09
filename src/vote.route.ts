import { NextFunction, Request, Response, Router } from 'express';
import { getRepository, UserVotes } from './model';

/*
  Create a route for each CRUD operaion on user_vote table
*/

export const router: Router = Router();

router.get('/api/vote', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    const allvotes = await repository.find({ relations: ["user", "politician"] });
    res.send(allvotes);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/api/vote/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    const vote = await repository.findOne(req.params.id);
    res.send(vote);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/api/vote/user/:userID/politician/:politicianID', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    const vote = await repository.findOne({user: req.params.userID, politician:req.params.politicianID});
    res.send(vote);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/api/vote/result/:politicianID', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    const result = await repository.find({politician:req.params.politicianID});
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});


router.post('/api/vote', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    const vote = new UserVotes();
    vote.user = req.body.user;
    vote.politician = req.body.politician;
    vote.isCorrupt = req.body.isCorrupt;

    const result = await repository.save(vote);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/vote/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    const vote = await repository.findOne(req.params.id);
    vote.user = req.body.user;
    vote.politician = req.body.politician;
    vote.isCorrupt = req.body.isCorrupt;

    const result = await repository.save(vote);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/api/vote/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(UserVotes);
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});