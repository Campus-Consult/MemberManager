import { Injectable } from '@angular/core';
import { Gender, Person } from 'src/app/models/person.class';
import { PersonListItem } from 'src/app/personal/personal.component';

@Injectable({
  providedIn: 'root',
})
export class PersonApiService {
  private personDummy = new Array<Person>();

  constructor() {
    this.personDummy = this.getPersonDummyList();
  }

  createPerson(person: Person) {}

  editPerson(personID: number, person: Person) {}

  deletePerson(personID) {}

  getAllPersons(): Person[] {
    return this.personDummy;
  }

  getPersonalTableData(): PersonListItem[] {
    const tableItems = new Array<PersonListItem>();
    for (const iterator of this.personDummy) {
      tableItems.push({
        personID: iterator.personID,
        firstName: iterator.firstName,
        lastName: iterator.lastName,
        personsMemberStatus: 'Statsu' + Math.random().toString(36).substring(7),
        personsCareerLevel: 'Level' + Math.random().toString(36).substring(7),
        personsPosition: 'Position' + Math.random().toString(36).substring(7),
      });
    }

    return tableItems;
  }

  getPerson(personId: number): Person {
    return this.personDummy.find((val) => val.personID === personId);
  }

  getPersonMemberstatusHistory(personId: number) {}

  getPersonPositionHistory(personId: number) {}

  getPersonCarrierLevelHistory(personId: number) {}

  // ================== TEST Methods ===================
  private getPersonDummyList(): Person[] {
    const personList = new Array<Person>();
    for (let index = 0; index < 50; index++) {
      personList.push({
        personID: index,
        firstName: 'Test' + Math.random().toString(36).substring(7),
        lastName: 'Subject' + Math.random().toString(36).substring(7),

        birthdate: new Date(index),

        gender: index % 2 === 0 ? Gender.MALE : Gender.FEMALE,

        emailPrivate: 'testMail@webkitCancelAnimationFrame.de',

        emailAssociaton: 'testMail@webkitCancelAnimationFrame.de',

        mobilePrivate: '+49123456789',

        /**  */
        adressStreet: 'Stra0enweg',

        /**  */
        adressNr: (index + 56).toString(),

        /**  */
        adressCity: 'paderborn',

        /**  */
        personsMemberStatus: [
          {
            personID: index,
            personsMemberStatusID: index,
            memberStatusID: index,
            begin: new Date(),
          },
        ],

        /**  */
        personsCareerLevels: [
          {
            personID: index,
            personsCareerLevelID: index,
            careerLevelID: index,
            begin: new Date(),
          },
        ],

        /**  */
        personsPositions: [
          {
            personID: index,
            personPositionID: index,
            positionID: index,
            begin: new Date(),
          },
        ],
      });
    }

    return personList;
  }
}

export interface PersonChangeDTO {
  // TODO:
}
