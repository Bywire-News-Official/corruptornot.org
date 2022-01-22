import { NextFunction, Request, Response, Router } from 'express';
import { getPoliticianRepository, Politician } from './model';

export const router: Router = Router();

router.get('/politician', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getPoliticianRepository();
    const allpoliticians = await repository.find();
    res.send(allpoliticians);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/politician/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getPoliticianRepository();
    const politician = await repository.findOne(req.params.id);
    res.send(politician);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/politician', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getPoliticianRepository();
    const politician = new Politician();
    politician.name = req.body.name;
    politician.image = req.body.image;
    politician.description = req.body.description;
    politician.votes = Number.parseFloat(req.body.votes);
    politician.corrupt = Number.parseFloat(req.body.corrupt);
    politician.not_corrupt = Number.parseInt(req.body.not_corrupt);

    const result = await repository.save(politician);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/politician/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getPoliticianRepository();
    const politician = await repository.findOne(req.params.id);
    politician.name = req.body.name;
    politician.image = req.body.image;
    politician.description = req.body.description;
    politician.votes = Number.parseFloat(req.body.votes);
    politician.corrupt = Number.parseFloat(req.body.corrupt);
    politician.not_corrupt = Number.parseInt(req.body.not_corrupt);

    const result = await repository.save(politician);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/politician/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getPoliticianRepository();
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});