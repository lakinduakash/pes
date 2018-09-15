import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup:FormGroup;
  showSpinner=false;

  signupStates=['ALREADY_R','ERROR','VERIFICATION_SEND','SIGNUP'];

  state=this.signupStates[3];


  constructor(private fb:FormBuilder,private auth:AuthService) {

    this.signupFormGroup=fb.group({
      fName:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(1)])],
      lName:['',[Validators.required,Validators.maxLength(19)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      passwordc:['',Validators.required]
    },
      {
        validator: PasswordValidation.MatchPassword
      });

  }

  ngOnInit() {

  }

  updateUserData(user,data)
  {
    const u:User={
      uid: user.uid,
    email: user.email,
    displayName: data.value.fName+data.value.lName


  };
    fromPromise(this.auth.updateUserData(user,u)).subscribe(next=>{
      console.log("succsess");
      this.auth.sendVerificationEmail();
      this.state=this.signupStates[2]
    })
  }

  postData(data)
  {
    this.showSpinner=true;
    this.auth.emailSignUp(data.value.email,data.value.password).subscribe(next=>{console.log(next);
    this.updateUserData(next.user,data);
      this.showSpinner=false},error1 => {console.log(error1);
      this.showSpinner=false;
      if(error1.code == "auth/email-already-in-use")
        this.state=this.signupStates[0];
      else
        this.state=this.signupStates[1]
    }

    )

  }

}

import {AbstractControl} from '@angular/forms';
import {AuthService} from "../auth/auth.service";
import {User} from "../core/model/user";
import {fromPromise} from "rxjs/internal-compatibility";
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('passwordc').value; // to get value in input tag
    if(password != confirmPassword || password.length<8) {

      AC.get('passwordc').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }
}
