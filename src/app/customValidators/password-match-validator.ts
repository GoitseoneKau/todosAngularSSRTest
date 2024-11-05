import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

//export password validator function
export class PasswordMatchValidator {
    static passwordCompare(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          
            const matchInvalid = control.value !== control.parent?.get("password")?.value;//compare current field control with password field control
            return matchInvalid ? {invalidMatch: true } : null;//return error if controls dont match else return null
        };
      }
}
