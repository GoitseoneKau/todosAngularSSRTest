import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

//export validator function for date
export class MinDateValidator {

    static dateMin(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const now =new Date()
            const inputDate =new Date(String(control.value))
    
            const isValid = inputDate>now;
            return !isValid ? { invalidDate: true } : null;
        };
      }
}
