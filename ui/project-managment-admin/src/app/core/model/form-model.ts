export class FormModel {
  id: number;
  name: string;
  description: string;
  sections: Section[]


}

export class Section {
  id: number;
  name: string;
  description: string;
  maxMarks: number;
  currentMark: number;
  attr: SectionAttribute[]


}

export class SectionAttribute {
  criteria: string;
  maxMark: number;
  currentMark: number;


  constructor() {
  }

}
