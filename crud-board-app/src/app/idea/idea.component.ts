import { Component, Input, OnInit } from '@angular/core';
import { Idea } from '../models/idea';
import { IdeaState } from '../models/idea-state';
import { format } from 'date-fns';
import enGb from 'date-fns/locale/en-GB';
import { IdeaComponentService } from './services/idea-component.service';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss'],
  providers: [IdeaComponentService],
})
export class IdeaComponent implements OnInit {
  constructor(private _componentService: IdeaComponentService) {}

  public title = '';
  public description = '';
  public lastUpdated: string;
  public id = '';
  public state: IdeaState;

  @Input()
  public set model(idea: Idea) {
    this.title = idea.title;
    this.description = idea.description;
    this.lastUpdated = idea.lastUpdated
      ? format(idea.lastUpdated, 'Pp', { locale: enGb })
      : '';
    this.id = idea.id;
    this.state = idea.state;
  }

  public ngOnInit(): void {}

  public async saveIdea(): Promise<void> {
    await this._componentService.updateIdea();
  }
}
