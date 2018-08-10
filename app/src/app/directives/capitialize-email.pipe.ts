import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'capitalizeEmail'})
export class CapitalizeEmailPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return value.replace(/\w\S*/g, function(txt) {
      let emailParsed = txt.split("@");
      let emailName = emailParsed[0].split('.');
      if (emailName.length < 2) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      } else {
        return emailName[0].charAt(0).toUpperCase() +
          emailName[0].substr(1).toLowerCase() + '.' +
          emailName[1].charAt(0).toUpperCase() +
          emailName[1].substr(1).toLowerCase() + '@' + emailParsed[1];
      }
    });
  }
}

