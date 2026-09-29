import { Router } from 'express';
import { apiBaseUrl } from '../config/urls.js';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';
import { createResourceRouter } from './resource.js';

const apiRouter = Router();

apiRouter.get('/', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
    endpoints: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

apiRouter.get('/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl: apiBaseUrl });
});

apiRouter.use('/users', createResourceRouter(UserModel, { populate: ['team'] }));
apiRouter.use('/teams', createResourceRouter(TeamModel, { populate: ['members'] }));
apiRouter.use('/activities', createResourceRouter(ActivityModel, { populate: ['user'] }));
apiRouter.use(
  '/leaderboard',
  createResourceRouter(LeaderboardEntryModel, {
    populate: ['user', 'team'],
    sort: { points: -1 },
  }),
);
apiRouter.use('/workouts', createResourceRouter(WorkoutModel));

export default apiRouter;