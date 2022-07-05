import { IPersonDetailVm, PersonDetailVm, PersonLookupDto } from 'src/app/membermanager-api';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayOrganizer'
})
export class DisplayOrganizerPipe implements PipeTransform {

  transform(person: IPersonDetailVm, ...args: unknown[]): string {
    return person ? `${person.firstName} ${person.surname}` : '';;
  }

}
