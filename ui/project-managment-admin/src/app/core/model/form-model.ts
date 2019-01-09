export class FormModel {
  $key: string;
  id: string;
  name: string;
  description: string;
  sections: Section[]
  totalMarks: number
  individualMaxMark: number
  individualMarkMap
  currentMark: number
  assign: { uid, email, displayName }
  bias: number


}

export class Section {
  $key: string;
  id: number;
  name: string;
  description: string;
  maxMarks: number;
  currentMark: number;
  type: SectionType
  attr: SectionAttribute[]


}

export class SectionAttribute {
  $key: string;
  id: number;
  criteria: string;
  maxMark: number;
  currentMark: number;
  isDecimal: boolean


  constructor() {
  }

}


export const enum SectionType {INDIVIDUAL = 1, GROUP = 2};
