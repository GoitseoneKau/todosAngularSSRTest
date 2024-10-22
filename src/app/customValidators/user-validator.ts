import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UsersService } from "../services/users.service";

export class UserEmailValidator {

    uniqueUserEmailValidator(userService: UsersService ): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          const email = control.value as string;
      
          return userService.getUser(email).pipe(
            map((user) => {
              // test if email is already registered
              const isTaken = email !== user.email ? true : false;
              return isTaken ? { emailTaken: true } : null;
            }),
            catchError(() => of(null)) // In case of an error, we assume the email is available.
          );
        };
    }

}

