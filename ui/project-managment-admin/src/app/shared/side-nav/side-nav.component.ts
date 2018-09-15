import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RenameTitleBarService} from "../../services/rename-title-bar.service";
import {AuthService} from "../../auth/auth.service";


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

  navTitle;

  constructor(private breakpointObserver: BreakpointObserver, private renameNavBarService: RenameTitleBarService,private auth:AuthService) {
  }

  ngOnInit() {
    this.renameNavBarService.getTitle()
      .subscribe((navTitle: string) => {
        this.navTitle = navTitle;
      });
  }

  logout()
  {
    this.auth.signOut()
  }

}
