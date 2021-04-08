import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Idea } from '../models/idea';
import { IdeaState } from '../models/idea-state';
import { v4 as guid } from 'uuid';
import { IdeaUpdateRequest } from '../models/idea-update-request';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly storageKey = 'crud-app';
  private _ideasCache: Map<string, Idea> = new Map<string, Idea>();
  private _ideas: BehaviorSubject<Idea[]> = new BehaviorSubject<Idea[]>([]);

  constructor() {}

  public init(): void {
    const savedIdeas = localStorage.getItem(this.storageKey);
    const parsedIdeas: [] = savedIdeas ? JSON.parse(savedIdeas) : [];

    if (parsedIdeas.length === 0) {
      return;
    }

    for (let idea of parsedIdeas) {
      const newIdea: Idea = {
        ...(idea[1] as Idea),
        created: new Date((idea[1] as Idea).created),
        lastUpdated: new Date((idea[1] as Idea).lastUpdated),
      };
      this._ideasCache.set(idea[0], newIdea);
    }

    this.updateStream();
  }

  public getIdeas(): Observable<Idea[]> {
    return this._ideas;
  }

  public addNewIdea(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const newIdea = this.createNewIdea();
        this._ideasCache.set(newIdea.id, newIdea);
        this.updateStream();
        this.updateStorage();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public updateIdea(update: IdeaUpdateRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this._ideasCache.has(update.id)) {
          const updatedIdea: Idea = {
            ...(this._ideasCache.get(update.id) as Idea),
            title: update.title,
            description: update.description,
            lastUpdated: new Date(),
            state: IdeaState.Updated,
          };
          this._ideasCache.set(updatedIdea.id, updatedIdea);
          this.updateStream();
          this.updateStorage();
        } else {
          console.log('Idea does not exist');
        }
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  public deleteIdea(ideaId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this._ideasCache.has(ideaId)) {
          this._ideasCache.delete(ideaId);
          this.updateStream();
          this.updateStorage();
        } else {
          console.log('Idea does not exist');
        }
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  private createNewIdea(): Idea {
    return {
      title: '',
      description: '',
      created: new Date(),
      lastUpdated: new Date(),
      id: guid(),
      state: IdeaState.Added,
    };
  }

  private updateStorage(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify([...this._ideasCache])
    );
  }

  private updateStream(): void {
    this._ideas.next(Array.from(this._ideasCache.values()));
  }
}
