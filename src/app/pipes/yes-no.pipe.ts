import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo', // This is the name you'll use in your templates
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    console.log('pipe');
    return value ? 'Да' : 'Нет';
  }
}
