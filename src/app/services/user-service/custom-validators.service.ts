import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class CustomValidatorsService {
    constructor(private userService: UserService) {}

    public validateIP(control: FormControl) {
        const pattern = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
        const regex = new RegExp(`^${pattern}\\.${pattern}\\.${pattern}\\.${pattern}$`);
        return regex.test(control.value) || !control.value
            ? null
            : {
                  validatorIP: {
                      valid: false,
                      msg: `${control.value} is not correct IP`
                  }
              };
    }

    public validatePwdUppercase(control: FormControl) {
        return /(?=.*[A-Z])/.test(control.value) || !control.value
            ? null
            : {
                  validatorPwd: {
                      valid: false,
                      msg: 'The string must contain at least 1 uppercase alphabetical character'
                  }
              };
    }

    public validatePwdLowercase(control: FormControl) {
        return /(?=.*[a-z])/.test(control.value) || !control.value
            ? null
            : {
                  validatorPwd: {
                      valid: false,
                      msg: 'The string must contain at least 1 lowercase alphabetical character'
                  }
              };
    }

    public validatePwdNumeric(control: FormControl) {
        return /(?=.*[0-9])/.test(control.value) || !control.value
            ? null
            : {
                  validatorPwd: {
                      valid: false,
                      msg: 'The string must contain at least 1 numeric character'
                  }
              };
    }

    public validatePwdSpecial(control: FormControl) {
        return /(?=.*[!@#\$%\^&\*])/.test(control.value) || !control.value
            ? null
            : {
                  validatorPwd: {
                      valid: false,
                      msg: 'The string must contain at least one special char acter'
                  }
              };
    }

    public validatePwdMinLength(control: FormControl) {
        return /(?=.{8,})/.test(control.value) || !control.value
            ? null
            : {
                  validatorPwd: {
                      valid: false,
                      msg: 'The string must be eight characters or longer'
                  }
              };
    }

    public validateName(control: FormControl) {}
}
