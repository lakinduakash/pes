import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import {fromPromise} from "rxjs/internal-compatibility";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  showSpinner=false;

  isHandest$;
  inFogotFassword=false;
  successResetSend;

  emailSentMassage="";

  constructor(private authService:AuthService,private router:Router,private breakPointObserver:BreakpointObserver,private authf:AngularFireAuth) { }

  ngOnInit() {
    this.breakPointObserver.observe(Breakpoints.HandsetPortrait).subscribe(next=>this.isHandest$=next.matches)
  }

  login()
  {
    this.showSpinner=true;
    this.authService.emailLogin(this.email,this.password).subscribe(next=>{
      this.router.navigate(['/dashboard']);
      this.showSpinner=false
    },error1 => {console.log(error1);
    this.showSpinner=false})
  }

  forgotPasswordClick()
  {
    this.inFogotFassword=true
  }

  back()
  {
    this.inFogotFassword=false;
    this.successResetSend=false;
    this.emailSentMassage=""
  }

  sendRecoveryMail()
  {
      this.showSpinner=true;
      fromPromise(this.authf.auth.sendPasswordResetEmail(this.email)).subscribe(next=>{this.successResetSend=true;
        this.showSpinner=false;
      this.emailSentMassage="Email sent, check your inbox"},error1 => {this.successResetSend=false;
        this.showSpinner=false;
        this.emailSentMassage="Error occurred, check your email"})
  }








}
