import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from '../models/idea';
import { BoardComponentService } from './services/board-component.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  constructor(private _componentService: BoardComponentService) {}

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
