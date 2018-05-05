/*https://forum.ionicframework.com/t/password-and-confirm-password-validation/67764/9

matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }*/


import { FormControl, FormGroup,Validator, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Injectable } from '@angular/core';

import { OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

@Injectable()
export class PasswordValidator  {
   


    equalto(field_name): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
        
        let input = control.value;
        
        let isValid=control.root.value[field_name]==input
        if(!isValid)
        return { 'equalTo': {isValid} }
        else
        return null;
        };
        }

}

