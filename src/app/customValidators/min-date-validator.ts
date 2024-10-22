import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class MinDateValidator {

    static dateMin(date:Date): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const now =date
            const inputDate =new Date(String(control.value))
    
            const isValid = inputDate>now;
            return !isValid ? { invalidDate: true } : null;
        };
      }
}
