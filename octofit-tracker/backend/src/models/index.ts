import { model, Schema, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  team?: Types.ObjectId;
  points: number;
}

export interface Team {
  name: string;
  members: Types.ObjectId[];
}

export interface Activity {
  user: Types.ObjectId;
  activityType: 'walking' | 'running' | 'strength';
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  period: string;
}

export interface Workout {
  title: string;
  description: string;
  category: 'cardio' | 'strength' | 'flexibility';
  durationMinutes: number;
  intensity: 'low' | 'moderate' | 'high';
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, enum: ['walking', 'running', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ['cardio', 'strength', 'flexibility'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    intensity: { type: String, enum: ['low', 'moderate', 'high'], required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);