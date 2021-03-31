import { Injectable } from '@angular/core';
import { IdeaUpdateRequest } from '../../models/idea-update-request';
import { AppService } from '../../services/app-service';
import { IdeaComponent } from '../idea.component';

@Injectable({
  providedIn: 'root',
})
export class IdeaComponentService {
  constructor(private _appService: AppService) {
    console.log('IdeaComponentService constructor');
  }

  public async updateIdea(update: IdeaUpdateRequest): Promise<void> {
    return this._appService.updateIdea(update);
  }

  public async deleteIdea(ideaId: string): Promise<void> {
    return this._appService.deleteIdea(ideaId);
  }
}
