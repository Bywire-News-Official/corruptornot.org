import { NextFunction, Request, Response, Router } from 'express';
import { getRepository, Admin } from './model';
import {Md5} from "md5-typescript";

/*
Create a route for each CRUD operaion on admin table
*/

export const router: Router = Router();

router.get('/api/admin', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Admin);
    const alladmins = await repository.find();
    res.send(alladmins);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/api/admin/:username', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Admin);
    const alladmins = await repository.findOne({username:req.params.username});
    res.send(alladmins);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/admin/login', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Admin);
    const admin = await repository.findOne({username:req.body.username, password:Md5.init(req.body.password)});
    res.send(admin);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/admin', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Admin);
    const admin = new Admin();
    admin.username = req.body.username;
    admin.password = Md5.init(req.body.password);

    const result = await repository.save(admin);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/api/admin/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Admin);
    const admin = await repository.findOne(req.params.id);
    admin.password = Md5.init(req.body.password);

    const result = await repository.save(admin);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/api/admin/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getRepository(Admin);
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});