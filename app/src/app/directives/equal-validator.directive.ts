// checks if password and confirmPassword match, updates if string changes in either input field.
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
  ]
})
export class EqualValidator implements Validator {
  constructor(
  @Attribute('validateEqual') public validateEqual: string,
  @Attribute('reverse') public reverse: boolean
){ }

  validate(password: AbstractControl) {
    let v = password.value;
    let e = password.root.get(this.validateEqual);

  if (e && v !== e.value && !this.reverse) {
    return {
      validateEqual: false
    }
  } else if(e && v === e.value && this.reverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
  } else if (e && v !== e.value && this.reverse) {
    e.setErrors({ validateEqual: false });
  }
    return null;
  }
}
