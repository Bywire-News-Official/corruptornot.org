import { NextFunction, Request, Response, Router } from 'express';
import { getRepository, Politician } from './model';

/*
Create a route for each CRUD operaion on politician table
*/
export const router: Router = Router();

router.get('/api/politician', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Politician);
    const allpoliticians = await repository.find();
    res.send(allpoliticians);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/api/politician/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Politician);
    const politician = await repository.findOne(req.params.id);
    res.send(politician);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/politician', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Politician);
    const politician = new Politician();
    politician.name = req.body.name;
    politician.image = req.body.image;
    politician.description = req.body.description;

    const result = await repository.save(politician);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/politician/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Politician);
    const politician = await repository.findOne(req.params.id);
    politician.name = req.body.name;
    politician.image = req.body.image;
    politician.description = req.body.description;

    const result = await repository.save(politician);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/api/politician/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Politician);
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});