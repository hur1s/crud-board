import { Injectable } from '@angular/core';
import { AppService } from '../../services/app-service';
import { IdeaComponent } from '../idea.component';

@Injectable({
  providedIn: 'root',
})
export class IdeaComponentService {
  constructor(private _appService: AppService) {
    console.log('IdeaComponentService constructor');
  }

  public async updateIdea(): Promise<void> {
    return this._appService.updateIdea();
  }
}
