import {Component, OnInit} from '@angular/core';
import {FormModel} from "../../core/model/form-model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "../../services/form.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-form-view-container',
  templateUrl: './form-view-container.component.html',
  styleUrls: ['./form-view-container.component.css']
})
export class FormViewContainerComponent implements OnInit {

  form: Observable<FormModel>;

  constructor(private router: Router, private route: ActivatedRoute, private formService: FormService) {
  }

  ngOnInit() {


  }

}
