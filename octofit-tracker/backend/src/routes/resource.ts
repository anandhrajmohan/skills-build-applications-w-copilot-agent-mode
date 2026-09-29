import { Router } from 'express';
import type { Model } from 'mongoose';

interface ResourceRouterOptions {
  populate?: string[];
  sort?: Record<string, 1 | -1>;
}

export function createResourceRouter<T extends object>(
  resourceModel: Model<T>,
  options: ResourceRouterOptions = {},
) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      let query = resourceModel.find();
      if (options.populate) query = query.populate(options.populate);
      const resources = await query.sort(options.sort ?? {});
      response.json(resources);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const resource = await resourceModel.create(request.body as Partial<T>);
      response.status(201).json(resource);
    } catch (error) {
      next(error);
    }
  });

  return router;
}