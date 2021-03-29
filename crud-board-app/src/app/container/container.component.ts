import { Component, OnInit } from '@angular/core';
import { Idea } from '../models/idea';
import { ContainerComponentService } from './services/container.component.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor(private _componentService: ContainerComponentService) {}

  public ngOnInit(): void {}

  public async addIdea(): Promise<void> {
    await this._componentService.addNewIdea();
  }
}
