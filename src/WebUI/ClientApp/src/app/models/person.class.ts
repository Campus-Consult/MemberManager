export interface Person  {
  personID: number;

  firstName: string;

  lastName: string;

  birthdate?: Date;

  gender?: Gender;

  emailPrivate?: string;

  emailAssociaton?: string;

  mobilePrivate?: string;

  adressStreet?: string;

  adressNr?: string;

  adressZIP?: string;

  adressCity?: string;

  personsMemberStatus: PersonsMemberStatus[];

  personsCareerLevels: PersonsCareerLevel[];

  personsPositions: PersonsPosition[];
}

export enum Gender {
  MALE = 'männlich',

  FEMALE = 'weiblich',

  DIVERSE = 'divers',
}

export interface PersonsMemberStatus  {
  personsMemberStatusID: number;

  personID: number;

  memberStatusID: number;

  begin: Date;

  end?: Date;

  person?: Person;

  memberStatus?: MemberStatus;
}

export interface MemberStatus {
  memberStatusID: number;

  name: string;

  personsMemberStatus?: PersonsMemberStatus[];
}

export interface PersonsCareerLevel  {
  personsCareerLevelID: number;

  personID: number;

  careerLevelID: number;

  begin: Date;

  /**  optional*/
  end?: Date;

  /**  optional*/
  person?: Person;

  careerLevel?: CareerLevel;
}

export interface CareerLevel  {
  careerLevelID: number;

  name: string;

  shortName: string;

  isActive: boolean;

  personsCareerLevels: PersonsCareerLevel[];
}

export interface PersonsPosition  {
  personPositionID: number;

  personID: number;

  positionID: number;

  begin: Date;

  /**  optional */
  end?: Date;

  /**  optional */
  person?: Person;

  position?: Position;
}

export interface Position {
  positionId: number;
  name: string
}