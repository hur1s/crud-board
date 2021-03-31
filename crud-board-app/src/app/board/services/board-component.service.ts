import { AppService } from '../../services/app-service';
import { Idea } from '../../models/idea';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Sort } from '../../models/sort-type';
import { compareDesc } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class BoardComponentService {
  private _ideas: Idea[] = [];
  private _disposed = new Subject();
  private _sortByDate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(private _appSerivce: AppService) {}

  private static sortByDate(a: Idea, b: Idea): number {
    return compareDesc(a.created, b.created);
  }

  private static sortByTitle(a: Idea, b: Idea): number {
    return a.title === b.title
      ? BoardComponentService.sortByDate(a, b)
      : a.title < b.title
      ? -1
      : 1;
  }

  public get ideas(): Observable<Idea[]> {
    return combineLatest([this._appSerivce.getIdeas(), this._sortByDate]).pipe(
      map(([ideas, sortByDate]) => {
        return ideas.sort((a, b) => {
          return sortByDate
            ? BoardComponentService.sortByDate(a, b)
            : BoardComponentService.sortByTitle(a, b);
        });
      })
    );
  }

  public start(): void {}

  public end(): void {
    this._disposed.next();
  }

  public setSortBy(sortBy: Sort): void {
    switch (sortBy) {
      case 'Title':
        this._sortByDate.next(false);
        break;
      default:
        this._sortByDate.next(true);
        break;
    }
  }
}
