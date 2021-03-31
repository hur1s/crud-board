import { IdeaState } from './idea-state';

export interface Idea {
  title: string;
  description: string;
  created: Date;
  lastUpdated: Date;
  id: string;
  state: IdeaState;
}
