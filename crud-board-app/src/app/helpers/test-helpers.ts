import { Idea } from "../models/idea";
import { IdeaState } from "../models/idea-state";

export function createMockIdea(id: string, title: string, date: Date): Idea {
    return {
        id,
        created: date,
        lastUpdated: date,
        title,
        description: '',
        state: IdeaState.Added,
    };
}