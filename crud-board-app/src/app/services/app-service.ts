import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Idea } from '../models/idea';
import { IdeaState } from '../models/idea-state';
import { v4 as guid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _ideasList: Idea[] = [];
  private _ideas: Subject<Idea[]> = new Subject();

  constructor() {}

  public getIdeas(): Observable<Idea[]> {
    return this._ideas;
  }

  public addNewIdea(): Promise<void> {
    return new Promise((resolve, reject) => {
      const newIdea = this.createNewIdea();
      this._ideasList.push(newIdea);
      this._ideas.next(this._ideasList);
    });
  }

  public updateIdea(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  private createNewIdea(): Idea {
    return {
      title: '',
      description: '',
      lastUpdated: new Date(),
      id: guid(),
      state: IdeaState.Added,
    };
  }
}
