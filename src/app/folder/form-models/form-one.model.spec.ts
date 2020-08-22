import { FormOneModel } from './form-one.model';

const arr =  {
  "formControls": [
    {
      "caption": "Answer:",
      "controlType": "input",
      "inputType": "string",
      "name": "name",
      "prompt": "what is your name?",
    },
    {
      "caption": "Select on or more colors",
      "controlType": "select",
      "inputType": "string[]",
      "name": "favoriteColor",
      "options": [
        "red",
        "green",
        "blue",
        "yellow",
        "pink",
      ],
      "prompt": "what colors do you like?",
    },
  ]
}

describe('FormOneModel', () => {
  it('should create an instance', () => {
    expect(new FormOneModel(arr as any  )).toBeTruthy();
  });
});
