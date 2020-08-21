import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templatelog'
})
export class TemplateLoggerPipe implements PipeTransform {

  transform(value: any): void {
    console.log('TEMP LOGGER:', value);
  }

}
