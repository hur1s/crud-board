import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { Idea } from '../models/idea';
import { Sort } from '../models/sort-type';
import { BoardComponentService } from './services/board-component.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private _disposed = new Subject();

  constructor(private _componentService: BoardComponentService) {}

  public ideas: Idea[] = [];

  @Input()
  public set selectedSortOption(option: Sort) {
    this._componentService.setSortBy(option);

    this._componentService
      .getIdeas()
      .pipe(
        takeUntil(this._disposed),
        tap((ideas) => {
          this.ideas = ideas;
        }),
        catchError((error) => {
          console.error(JSON.stringify(error));
          return of([]);
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this._componentService.start();
  }

  public ngOnDestroy(): void {
    this._disposed.next();
    this._componentService.end();
  }
}
