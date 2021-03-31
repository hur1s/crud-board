import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from '../models/idea';
import { Sort } from '../models/sort-type';
import { BoardComponentService } from './services/board-component.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  constructor(private _componentService: BoardComponentService) {}

  @Input()
  public set selectedSortOption(option: Sort) {
    this._componentService.setSortBy(option);
  }

  public ngOnInit(): void {
    this._componentService.start();
  }

  public ngOnDestroy(): void {
    this._componentService.end();
  }

  public getIdeas(): Observable<Idea[]> {
    return this._componentService.ideas;
  }
}
