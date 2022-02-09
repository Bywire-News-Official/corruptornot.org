import { NextFunction, Request, Response, Router } from 'express';
import { getRepository, User } from './model';

/*
Create a route for each CRUD operaion on user table
*/

export const router: Router = Router();

router.get('/api/user', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(User);
    const allusers = await repository.find();
    res.send(allusers);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/api/user/:email', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(User);
    const user = await repository.findOne({email:req.params.email});
    res.send(user);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/user', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(User);
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.ip = req.body.ip;

    const result = await repository.save(user);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/user/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(User);
    const user = await repository.findOne(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.ip = req.body.ip;

    const result = await repository.save(user);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/api/user/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(User);
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});