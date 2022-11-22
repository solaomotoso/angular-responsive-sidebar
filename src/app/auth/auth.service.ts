import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Registration } from '../registration/registration.model';
import { RegistrationService } from '../registration/registration.service';
import { EncrDecrService } from '../shared/EncrDecrService.service';


@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  //private notLoggedIn=new BehaviorSubject<boolean>(false);
  registration: Registration | undefined;
  private pswrd?:string;



  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, private regservice:RegistrationService, private encservice:EncrDecrService
  ) {}

  login(reg: Registration): Number{

   let result=0;
   if(reg.userName!==undefined){
    this.getUser(reg.userName)
     this.pswrd =this.encservice.set('123456$#@$^@1ERF', reg.password);
      if (reg.userName === this.registration?.userName && this.pswrd === this.registration?.password) {
      this.loggedIn.next(true);
      localStorage.setItem('user',JSON.stringify(this.registration));
      this.router.navigate(['/']);
      result= 2;
    }
    else if (reg.userName !== this.registration?.userName && this.registration?.userName!==undefined){
      result= 1;
    }
    else if (this.pswrd !== this.registration?.password && this.registration?.userName!==undefined){
      result= 1;
    }

  };
  return result;
}


  getUser(username: string) {
    this.regservice.getUserbyusername(username)
      .subscribe((rlst:Registration)=>{
        this.registration=rlst;
      });
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
