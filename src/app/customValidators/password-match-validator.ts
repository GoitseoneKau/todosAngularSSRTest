import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordMatchValidator {
    static passwordCompare(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          
            const matchInvalid = control.value !== control.parent?.get("password")?.value;
            return matchInvalid ? {invalidMatch: true } : null;
        };
      }
}
