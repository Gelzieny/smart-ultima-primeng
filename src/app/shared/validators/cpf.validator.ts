import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isValid} from '../utilites/cpf.util';


export function cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        return !isValid(value, true) ? { cpfInvalido: true } : null;
    };
}
