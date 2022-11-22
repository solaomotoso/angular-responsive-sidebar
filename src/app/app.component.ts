import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from './auth/auth.service';
import { Observable, observable } from 'rxjs';
import { logging } from 'protractor';
import { Registration } from './registration/registration.model';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isLoggedIn$!: Observable<boolean>;
  loggedinUser = ' ';
  registration: Registration | undefined;


  constructor(private observer: BreakpointObserver, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe((rslt: any) => {

    }

    );
    if(this.isLoggedIn$!==undefined)
    {
    this.registration=JSON.parse(localStorage.getItem('user')|| '[]');
    if(this.registration!=undefined)
    {
      this.loggedinUser='Welcome: '+this.registration?.firstName+' '+this.registration?.lastName;
    }
    else{
      this.loggedinUser='';
    }
  }
}
  onLogout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.loggedinUser='';
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
       .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
         if (this.sidenav) {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
         }

      });



    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav?.mode === 'over') {
          this.sidenav?.close();
        }
      });
  }
}



