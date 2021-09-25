import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(genderCode: string, ...args: unknown[]): unknown {
    return genderCode === 'M' ? 'Laki' : (genderCode === 'F' ? 'Perempuan' : '-');
  }
}
