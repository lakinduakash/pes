import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkingViewComponent} from './marking-view/marking-view.component';
import {MarkingService} from "./services/marking-service.service";
import {ComponentsModule} from "../components/components.module";
import {MatTableModule, MatTabsModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatTableModule,
    MatTabsModule
  ],
  declarations: [MarkingViewComponent],
  providers: [MarkingService],
  exports: [MarkingViewComponent]
})
export class MarkingViewModule {
}
