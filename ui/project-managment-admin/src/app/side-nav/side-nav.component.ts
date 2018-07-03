import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Subscription} from "rxjs/internal/Subscription";
import {RenameTitleBarService} from "../services/rename-title-bar.service";


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  titleChangeSub: Subscription;

  navTitle;

  constructor(private breakpointObserver: BreakpointObserver, private renameNavBarService: RenameTitleBarService) {
  }

  ngOnInit() {
    this.renameNavBarService.getTitle()
      .subscribe((navTitl: string) => {
        this.navTitle = navTitl;
        console.log(navTitl)
      });
  }

}
