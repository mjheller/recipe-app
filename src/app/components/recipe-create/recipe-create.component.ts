import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  servingsNumbers: number[];
  constructor() { }

  
  ngOnInit() {
    this.servingsNumbers = Array(10).fill(1).map((x,i)=>i+1);
  }

}
