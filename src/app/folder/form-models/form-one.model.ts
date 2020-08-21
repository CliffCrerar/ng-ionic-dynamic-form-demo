import {FormControl, IFormTextInputControl, ISingleSelectFormControl, PopulateMethod} from '../../models';

export class FormOneModel extends PopulateMethod {
    #name: IFormTextInputControl;
    #favoriteColor: ISingleSelectFormControl;
    constructor(controlsArr: FormControl[]) {
        super();
        this.populate<any>(controlsArr);
    }
    get name(){return this.#name;}
    get favoriteColor(){return this.#favoriteColor;}

}


