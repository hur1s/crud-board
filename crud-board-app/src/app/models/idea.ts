import { IdeaState } from './idea-state';

export interface Idea {
  title: string;
  description: string;
  lastUpdated: Date;
  id: string;
  state: IdeaState;
}
