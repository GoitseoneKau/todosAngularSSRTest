import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class PhoneNumberValidator {
    static phoneValidator(): ValidatorFn {
        const reg = new RegExp("^([^1-9]([0-9]{2}))\\s([0-9]{3})\\s([0-9]{4})|([^1-9]([0-9]{2}))-([0-9]{3})-([0-9]{4})$");
        return (control: AbstractControl): ValidationErrors | null => {
            const isValid = reg.test(control.value)
            return !isValid ? {invalidPhone: true } : null;
        };
      }
}
