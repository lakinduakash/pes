import {Component, Input, OnInit} from '@angular/core';
import {FormModel, Section} from "../core/model/form-model";
import {FormService} from "../services/form.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormDataService} from "../services/form-data.service";
import {RenameTitleBarService} from "../services/rename-title-bar.service";


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input('eval-form') evalForm: FormModel;

  constructor(private formService: FormService, private route: ActivatedRoute, private router: Router, private formDataService: FormDataService,
              private titleBar: RenameTitleBarService) {
  }

  form: FormModel;
  sectionList:Section[];

  title;
  description;


  ngOnInit() {
    this.titleBar.setTitle("Form view");

    this.route.params.subscribe(
      params => {
        if (!(params['form'] && params['p'] && params['pr'])) {
          this.router.navigate(['/not-found'])
          return
        }

        this.formService.getForm(params['form'], params['p'], params['pr']).subscribe(next => {
          this.form = next.data();

          if (this.form == undefined) {
            this.router.navigate(['/not-found'])
            return
          }
          this.printForm()
        }, error1 => {
          console.log(error1)
          this.router.navigate(['/not-found'])
        })
      }
    )

  }

  printForm()
  {
    console.log(this.form);
    this.sectionList = this.form.sections;
    this.title = this.form.name;
    this.description=this.form.description
  }



}
