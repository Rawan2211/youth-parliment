import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educational-qualifications',
  templateUrl: './educational-qualifications.component.html',
  styleUrls: ['./educational-qualifications.component.css']
})
export class EducationalQualificationsComponent {
  constructor(private router: Router) {}
  languages: {'name': any, 'level': any}[] = []

  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required]),
    coursesName: new FormControl(null),
    language: new FormControl(null),
    languageLevel: new FormControl(null),
  })

  addLanguage() {
    let lang = {
      name: this.eduQualsForm.value.language,
      level: this.eduQualsForm.value.languageLevel
    }
    // if statement to check if lang.name isnt inside languages array
    if (lang.name && lang.level) {
      if (!this.languages.find(l => l.name === lang.name)) {
        this.languages.push(lang)
      } else console.log('language already exists')
    }
  }


  items2 = [
    'Graham',
    'Michael',
    'Terry' ,
  ]

  langs = [
    'ألانجلبزية',
    'الفرنسية',
    'الألمانية' ,
  ]
  
  langsLevel = [
    'متوسط',
    'مبتدئ',
    'ماقبل المتوسط',
    'متقدم',
    'فوق المتوسط'
  ]

  handleTagDeleted(emptyTag: any, currentIndex: number): void {
    this.languages = this.languages
        .map((language, index) => (index === currentIndex ? emptyTag : language ))
        .filter(Boolean);
}

  stringify = (item: { name: string; surname: string }): string =>
    `${item.name} ${item.surname}`;

    next() {
      console.log('hello', this.eduQualsForm.value)
      this.router.navigate(['voter-data/attachments'])
    }

}
