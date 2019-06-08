import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import swal from 'sweetalert';


@Injectable()
export class patternValidator {
    patternValidator(regexp: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const value = control.value;
            if (value === '') {
                return null;
            }
            return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
        };
    }

}

