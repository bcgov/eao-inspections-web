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
        let nameBuilder = "";
        emailName.forEach(namePart => {
          nameBuilder += namePart.charAt(0).toUpperCase() + namePart.substr(1).toLowerCase() + '.';
        });
        return nameBuilder.substr(0, nameBuilder.length-1) + '@' + emailParsed[1];
      }
    });
  }
}


