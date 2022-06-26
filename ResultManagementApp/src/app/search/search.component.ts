import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { StudentsService } from '../students.service'
import { Router, RouterModule, Routes } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  Alert=false;
  StudentSearch = new FormGroup({
    Roll: new FormControl(''),
    Name: new FormControl(''),
  })

  constructor(private studentsService: StudentsService, private route: Router) { }
  CollectionOfStudents: any;
  ngOnInit(): void {
  }

  CollectDetails() {
    let Student = this.StudentSearch.value;console.warn("Student: ",Student);

    this.studentsService.GetList().subscribe((result) => {
      this.CollectionOfStudents = result;      
    

    if ((this.CollectionOfStudents.find((e: { Roll: any; }) => e.Roll === Student.Roll))
      && (this.CollectionOfStudents.find((e: { Name: any; }) => e.Name === Student.Name))) {
        this.route.navigate([`/result/${Student.Roll}`]);
    }
    else{
      this.Alert=true;
    }

  })
  }
  CloseAlert(){
    this.Alert=true;
  }
}
