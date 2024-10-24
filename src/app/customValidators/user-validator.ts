import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UsersService } from "../services/users.service";

export class UserEmailValidator {

    uniqueUserEmailValidator(userService: UsersService ): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          const email = control.value as string;
          const user = userService.getUsers().pipe(map((users)=>{
            if(users.find((user)=>user.email===email)){
              return true ? {userExists:true}:null;
            }
            return {userExists:false};
          }),
          catchError(() => of(null)))
          return user;
        };
    }

}

