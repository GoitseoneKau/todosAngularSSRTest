import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
// import { Observable, map, catchError, of } from "rxjs";
// import { UsersService } from "../services/users.service";

export class PasswordValidator {

    static passwordValidator(): ValidatorFn {
        const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.+[@.#$!%*?&^])[A-Za-z0-9@.#$!%*?&]{6,15}$");
       
        return (control: AbstractControl): ValidationErrors | null => {
        
            const isValid = reg.test(control.value)
            return !isValid ? {invalidPassword: true } : null;
        };
      }

    //   static uniqueUserPasswordValidator(userService: UsersService ): AsyncValidatorFn {

    //     return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //       const password = control.value as string;
      
    //       return userService.getUser(password).pipe(
    //         map((user) => {
    //           // test if password is registered
    //           const isWrong = password !== user.password ? true : false;
    //           return isWrong ? { wrongPassword: true } : null;
    //         }),
    //         catchError(() => of(null)) // In case of an error, we assume the password is available.
    //       );
    //     };
    // }
}
