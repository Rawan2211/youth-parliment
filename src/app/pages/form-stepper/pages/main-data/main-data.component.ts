import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { GovernmentRepository } from 'src/app/domain/government/government.repository';
import { minWordsValidator } from 'src/app/shared/Validators/minWords.validator';
import { TuiDay } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { BirthDateFromNationalIdPipe } from 'src/app/shared/pipes/birth-date-from-national-id.pipe';
import { GenderFromNationalIdPipe } from 'src/app/shared/pipes/gender-from-national-id.pipe';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `هذه الخانة مطلوبه`,
        pattern: 'أدخل رقم قومي صحيح',
        minWords: 'يرجي أدخال الاسم رباعي'
      }
    }
  ]
})
export class MainDataComponent {

  constructor(
    private govermentRepository: GovernmentRepository,
    private router: Router,
    private stepperStateService: StepperStateService
  ) { }


  genders = [{ gender: 'male' }, { gender: 'female' }];

  basicInfoForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, minWordsValidator(4)]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/)]),
    government: new FormControl(null, [Validators.required]),
    district: new FormControl(''),
    adminstration: new FormControl(''),
    subAdmin: new FormControl(''),
    dob: new FormControl(new TuiDay(2007, 0, 1)),
    gender: new FormControl('', [Validators.required]),
    religion: new FormControl('muslim'),
    disability: new FormControl('no'),
  })

  ngOnInit() {
    this.getBirthAndGenderfromId();
    // this.govermentRepository.get().subscribe(
    //   (response) => console.log(response)
    // )
  }

  getBirthAndGenderfromId() {
    this.basicInfoForm.get('nationalId')?.valueChanges
      .subscribe((id: any) => {
        const idString = id.toString();
        if (idString.length == 14) {
          const formatedDOB = new BirthDateFromNationalIdPipe().transform(idString)
          this.basicInfoForm.get('dob')?.patchValue(new TuiDay(formatedDOB[0], formatedDOB[1], formatedDOB[2]))
          const gender = new GenderFromNationalIdPipe().transform(idString)
          this.basicInfoForm.get('gender')?.patchValue(gender)
        }
      })
  }



  next() {
    if (this.basicInfoForm.valid) {
      console.log(this.basicInfoForm)
      this.stepperStateService.mainDataState.set('pass')
      this.router.navigate(['/voter-data/contact-data'])
    } else {
      this.stepperStateService.mainDataState.set('error')
    }
    // this.govermentRepository.get().subscribe((response) => console.log(response))
  }


}
