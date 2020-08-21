import {FormControl, IFormTextInputControl, ISingleSelectFormControl, PopulateMethod} from '../../models';

export class FormTwoModel extends PopulateMethod {
    #mealChoice: IFormTextInputControl;
    constructor(controlsArr: FormControl[]) {
        super();
        this.populate<any>(controlsArr);
    }
    get mealChoice(){return this.#mealChoice;}
}
