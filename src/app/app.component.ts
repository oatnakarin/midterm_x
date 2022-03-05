import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Flight } from './Flight';
import { Injectable } from '@angular/core';
import { ServService } from './serv.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent{
  arr = Array();
  title = 'midterm';
  form: FormGroup;
  d = new Date(Date.now());
  constructor(private fb: FormBuilder,public service:ServService) {
    this.form = this.fb.group({
      fullname: ['',Validators.required],
      from: ['',Validators.required],
      to: ['',Validators.required],
      type: ['',Validators.required],
      adults : ['',[Validators.required,Validators.min(10),Validators.max(20),Validators.pattern("^[0-9]*$")]],
      children : ['',[Validators.required,Validators.min(10),Validators.max(20),Validators.pattern("^[0-9]*$")]],
      infants : ['',[Validators.required,Validators.min(10),Validators.max(20),Validators.pattern("^[0-9]*$")]],
    });
    this.arr = service.getdata();
  }
  startDate = new FormControl('',Validators.required);
  endDate = new FormControl('',Validators.required);
  getselect(){
    console.log()
    let x = document.getElementById(this.form.value.from) as HTMLFormElement;
    x.style.visibility = "invisible";
  }
  adddata = () =>{

    const data = new Flight(
    this.form.value.fullname,
    this.form.value.from,
    this.form.value.to,
    this.form.value.type,
    this.form.value.adults,
    this.startDate.value,
    this.form.value.children,
    this.form.value.infants,
    this.endDate.value
    )
    this.service.adddata(data);
    this.form.reset();
    this.startDate.reset();
    this.endDate.reset();
  }
}
