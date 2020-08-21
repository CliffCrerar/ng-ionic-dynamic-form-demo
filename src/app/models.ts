export enum FormControlType {
    input = 'input',
    multiSelect = 'multiSelect',
    select = 'select',
    radio = 'radio',
}


export enum FormInputType {
    text = 'text',
    array = 'string[]'
}

export interface IFormTextInputControl {
    prompt: string;
    controlType: FormControlType;
    name: string;
    inputType: FormInputType;
    caption: string;
}

export interface IMultiSelectFormControl extends IFormTextInputControl {
    options: any[];
}

export type IRadioSelectFormControl = IMultiSelectFormControl;

export type ISingleSelectFormControl = IMultiSelectFormControl;

export abstract class PopulateMethod {
    private _propsArray: string[] = [];
    get propsArr(){return this._propsArray;}
    populate<T>(props: T): void {
        Object.keys(props).forEach((key: string): void => {
            this._propsArray.push(key);
            this[key] = props[key];
        });
    }

}

abstract class FormInputControl<T> extends PopulateMethod implements IFormTextInputControl {
    public prompt: string;
    public controlType: FormControlType;
    public name: string;
    public inputType: FormInputType;
    public caption: string;

    protected constructor(props: T) {
        super();
        this.populate<T>(props);
    }
}

export class FormInputBoxControl extends FormInputControl<IFormTextInputControl> implements IFormTextInputControl {
    protected constructor(props: IFormTextInputControl) {
        super(props);
    }
}

export class MultiSelectFormControl extends FormInputControl<IMultiSelectFormControl> implements IMultiSelectFormControl {
    public options: any[];

    protected constructor(props: IMultiSelectFormControl) {
        super(props);
    }
}

export class RadioSelectFormControl extends MultiSelectFormControl implements IRadioSelectFormControl {
}

export class SingleSelectFormControl extends MultiSelectFormControl implements ISingleSelectFormControl {
}


export type FormControl = MultiSelectFormControl | FormInputBoxControl;

export enum FormControlMap {
    input = 'FormInputBoxControl',
    radio = 'RadioSelectFormControl',
    select = 'SingleSelectFormControl',
    multiSelect = 'MultiSelectFormControl'
}


function CreateProperty(propertyType: string, propInstance: any): any {
    type N = [typeof propertyType];
    return propInstance as N;
}

export class CustomForm {
    insertProperty<T>(property: any) {
        this[property.name] = property as T;
    }
}

export class FormBuilderFactory {
    static init(formControlDef: FormControl[]) {
        const form = new CustomForm();
        formControlDef.forEach((formControl: FormControl): void => {
            const controlType = FormControlMap[formControl.controlType];
            console.log(FormControlMap[formControl.controlType]);
            form.insertProperty<typeof controlType>(formControl);
        });
        return form;
    }
}

interface IRevision {
    rev: string;
}

interface IDoc {
    formControls: FormControl[];
}

interface ResponseContent {
    doc: IDoc;
    id: string;
    key: string;
    value: IRevision;

}

export class ResponseObject extends PopulateMethod {
    offset: number;
    rows: ResponseContent[];
    #total_rows: number;

    constructor(p: object) {
        super();
        this.populate<any>(p);
    }

    get totalRows(): number {
        return this.#total_rows;
    }

    formData() {
        return this.rows.map((row: ResponseContent) => row.doc);
    }
}
