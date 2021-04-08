import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { BoardComponent } from './board/board.component';
import { IdeaComponent } from './idea/idea.component';
import { AppService } from './services/app-service';
import { ContainerComponentService } from './container/services/container-component.service';
import { BoardComponentService } from './board/services/board-component.service';
import { IdeaComponentService } from './idea/services/idea-component.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    BoardComponent,
    IdeaComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [
    AppService,
    ContainerComponentService,
    BoardComponentService,
    IdeaComponentService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
