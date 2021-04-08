import { Component, OnInit } from '@angular/core';
import { Sort } from '../models/sort-type';
import { ContainerComponentService } from './services/container-component.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor(private _componentService: ContainerComponentService) {}

  public sortOptions: Sort[] = ['Date Created', 'Title'];
  public sortValue: Sort = 'Date Created';

  public ngOnInit(): void {
    this._componentService.start();
  }

  public async addIdea(): Promise<void> {
    await this._componentService.addNewIdea();
  }
}
