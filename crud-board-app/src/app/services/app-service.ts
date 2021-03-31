import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Idea } from '../models/idea';
import { IdeaState } from '../models/idea-state';
import { v4 as guid } from 'uuid';
import { IdeaUpdateRequest } from '../models/idea-update-request';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _ideasCache: Map<string, Idea> = new Map<string, Idea>();
  private _ideas: BehaviorSubject<Idea[]> = new BehaviorSubject<Idea[]>([]);

  constructor() {}

  public getIdeas(): Observable<Idea[]> {
    return this._ideas;
  }

  public addNewIdea(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const newIdea = this.createNewIdea();
        this._ideasCache.set(newIdea.id, newIdea);
        this.updateStream();
        // this._ideas.next([newIdea]);
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
          };
          this._ideasCache.set(updatedIdea.id, updatedIdea);
          this.updateStream();
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

  private updateStream(): void {
    this._ideas.next(Array.from(this._ideasCache.values()));
  }
}
