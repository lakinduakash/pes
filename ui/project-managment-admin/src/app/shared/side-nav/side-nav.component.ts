import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
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

  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;

  navTitle;

  constructor(private breakpointObserver: BreakpointObserver, private renameNavBarService: RenameTitleBarService, private auth: AuthService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
