import { AppService } from '../../services/app-service';
import { Idea } from '../../models/idea';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardComponentService {
  private _disposed = new Subject();

  constructor(private _appSerivce: AppService) {}

  public start(): void {}

  public end(): void {
    this._disposed.next();
  }

  public get ideas(): Observable<Idea[]> {
    return this._appSerivce.getIdeas();
  }
}
