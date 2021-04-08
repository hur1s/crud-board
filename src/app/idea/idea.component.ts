import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Idea } from '../models/idea';
import { IdeaState } from '../models/idea-state';
import { format } from 'date-fns';
import { enGB } from 'date-fns/esm/locale';
import { IdeaComponentService } from './services/idea-component.service';
import { IdeaUpdateRequest } from '../models/idea-update-request';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss'],
})
export class IdeaComponent implements OnInit, AfterViewInit {
  constructor(private _componentService: IdeaComponentService) {}

  public title = '';
  public description = '';
  public lastUpdated: string;
  public created: string;
  public id = '';
  public state: IdeaState;

  public readonly maxDescriptionChars = 140;
  public remainingDescChars = 140;

  @ViewChild('titleInput') titleInput: ElementRef;

  @Input()
  public set model(idea: Idea) {
    this.title = idea.title;
    this.description = idea.description;
    this.created = idea.created
      ? format(idea.created, 'P HH:mm:ss', { locale: enGB })
      : '';
    this.lastUpdated = idea.lastUpdated
      ? format(idea.lastUpdated, 'P HH:mm:ss', { locale: enGB })
      : '';
    this.id = idea.id;
    this.state = idea.state;

    this.onDescriptionChange(this.description);
  }

  public ngOnInit(): void {}

  public ngAfterViewInit() {
    if (!this.title) {
      this.titleInput.nativeElement.focus();
    }
  }

  public async saveIdea(): Promise<void> {
    const request: IdeaUpdateRequest = {
      id: this.id,
      title: this.title,
      description: this.description,
    };
    await this._componentService.updateIdea(request);
  }

  public async deleteIdea(): Promise<void> {
    await this._componentService.deleteIdea(this.id);
  }

  public onDescriptionChange(value: string): void {
    this.remainingDescChars = this.maxDescriptionChars - value.length;
  }
}
