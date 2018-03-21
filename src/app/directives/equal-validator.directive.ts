import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
  ]
})
export class EqualValidator implements Validator {
  constructor( @Attribute('validateEqual') public validateEqual: string) { }

  validate(password: AbstractControl) {
    let confirmPassword = password.value;
    let passVal = password.root.get(this.validateEqual);

    if (passVal && confirmPassword !== passVal.value) return {
      validateEqual: false
    }
        return null;
    }
}