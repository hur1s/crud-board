import { Injectable } from '@angular/core';
import { AppService } from '../../services/app-service';

@Injectable({
  providedIn: 'root',
})
export class ContainerComponentService {
  constructor(private _appSerivce: AppService) {}

  public start(): void {
    this._appSerivce.init();
  }

  public async addNewIdea(): Promise<void> {
    return this._appSerivce.addNewIdea();
  }
}
