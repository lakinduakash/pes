import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkingViewComponent} from './marking-view/marking-view.component';
import {MarkingService} from "./services/marking-service.service";
import {ComponentsModule} from "../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [MarkingViewComponent],
  providers: [MarkingService],
  exports: [MarkingViewComponent]
})
export class MarkingViewModule {
}
