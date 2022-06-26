import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { StudentsService } from '../students.service';
import { Router, RouterModule, Routes } from '@angular/router'

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {

  Alert = false;
  LoginStudent = new FormGroup({
    Roll: new FormControl(''),
    Dob: new FormControl(''),
  })

  constructor(private studentsService: StudentsService, private route: Router) { }
  CollectionOfStudents: any;
  ngOnInit(): void {
  }

  CollectDetails() {
    let Student = this.LoginStudent.value;

    this.studentsService.GetList().subscribe((result) => {
      this.CollectionOfStudents = result;


      if ((this.CollectionOfStudents.find((e: { Roll: any; }) => e.Roll === Student.Roll))
        && (this.CollectionOfStudents.find((e: { Dob: any; }) => e.Dob === Student.Dob))) {
        this.route.navigate(['/search']);
      }
      else {
        this.Alert = true;
      }

    })
  }

  CloseAlert() {
    this.Alert = false;
  }

  get Roll() {
    return this.LoginStudent.get('Roll');
  }
  get Dob() {
    return this.LoginStudent.get('Dob');
  }
}
