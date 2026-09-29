import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await ActivityModel.deleteMany({});
    await LeaderboardEntryModel.deleteMany({});
    await WorkoutModel.deleteMany({});
    await UserModel.deleteMany({});
    await TeamModel.deleteMany({});

    const teams = await TeamModel.create([
      { name: 'Trailblazers', members: [] },
      { name: 'Pulse Collective', members: [] },
    ]);

    const users = await UserModel.create([
      {
        username: 'maya.chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        team: teams[0]._id,
        points: 420,
      },
      {
        username: 'leo.martinez',
        email: 'leo.martinez@example.com',
        displayName: 'Leo Martinez',
        team: teams[0]._id,
        points: 365,
      },
      {
        username: 'amina.hassan',
        email: 'amina.hassan@example.com',
        displayName: 'Amina Hassan',
        team: teams[1]._id,
        points: 390,
      },
      {
        username: 'noah.williams',
        email: 'noah.williams@example.com',
        displayName: 'Noah Williams',
        team: teams[1]._id,
        points: 310,
      },
    ]);

    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    await Promise.all(teams.map((team) => team.save()));

    await ActivityModel.create([
      {
        user: users[0]._id,
        activityType: 'running',
        durationMinutes: 35,
        caloriesBurned: 320,
        performedAt: new Date('2026-09-24T07:30:00Z'),
      },
      {
        user: users[1]._id,
        activityType: 'walking',
        durationMinutes: 48,
        caloriesBurned: 210,
        performedAt: new Date('2026-09-24T17:15:00Z'),
      },
      {
        user: users[2]._id,
        activityType: 'strength',
        durationMinutes: 42,
        caloriesBurned: 280,
        performedAt: new Date('2026-09-25T06:45:00Z'),
      },
      {
        user: users[3]._id,
        activityType: 'running',
        durationMinutes: 28,
        caloriesBurned: 260,
        performedAt: new Date('2026-09-25T18:00:00Z'),
      },
      {
        user: users[0]._id,
        activityType: 'strength',
        durationMinutes: 30,
        caloriesBurned: 190,
        performedAt: new Date('2026-09-26T09:00:00Z'),
      },
    ]);

    await LeaderboardEntryModel.create(
      users.map((user) => ({
        user: user._id,
        team: user.team,
        points: user.points,
        period: '2026-09',
      })),
    );

    await WorkoutModel.create([
      {
        title: 'Park Tempo Run',
        description: 'A steady outdoor run with short tempo intervals.',
        category: 'cardio',
        durationMinutes: 35,
        intensity: 'moderate',
      },
      {
        title: 'Full Body Foundations',
        description: 'A balanced strength session using fundamental movements.',
        category: 'strength',
        durationMinutes: 40,
        intensity: 'moderate',
      },
      {
        title: 'Mobility Reset',
        description: 'A gentle sequence for hips, shoulders, and spine.',
        category: 'flexibility',
        durationMinutes: 20,
        intensity: 'low',
      },
      {
        title: 'Hill Repeats',
        description: 'A challenging interval session to build running power.',
        category: 'cardio',
        durationMinutes: 30,
        intensity: 'high',
      },
    ]);

    console.log(
      `Database seeding complete: ${users.length} users, ${teams.length} teams, 5 activities, ${users.length} leaderboard entries, 4 workouts`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
