import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  results: Location[] = []
  filteredResults: Location[] = []
  formGroup!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private unitServices: GetUnitsService,
    private filterUnitsService: FilterUnitsService
    ){}

  ngOnInit(){
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitServices.getAllUnits().subscribe(data=>{
      this.results = data
      this.filteredResults = data
    })
  }



  onSubmit(){
    let{showClosed, hour } = this.formGroup.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour )
    this.unitServices.setFilteredUnits(this.filteredResults)
  }

  onClean(){
    this.formGroup.reset()

  }
}
