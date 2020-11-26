import {AbstractControl, ValidationErrors} from '@angular/forms';

export class MyValidators{
  static isNumber(control: AbstractControl): ValidationErrors | null {
    // returns control
    return /^[0-9]+$/.test(control.value) ? null : {
      isNumber: true
    };
  }
}
