import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup:FormGroup;


  constructor(private fb:FormBuilder) {

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

  signup()
  {

  }

  postData(data)
  {
    console.log(data)
  }

}

import {AbstractControl} from '@angular/forms';
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
