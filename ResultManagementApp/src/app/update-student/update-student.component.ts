import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { StudentsService } from '../students.service'
import { Router, RouterModule, Routes } from '@angular/router'

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  EditStudent = new FormGroup({
    Roll: new FormControl(''),
    Name: new FormControl(''),
    Dob: new FormControl(''),
    Score: new FormControl(''),
  })
  Collection: any = [];
  constructor(private route: ActivatedRoute, private student: StudentsService, private router: Router) { }
  ngOnInit(): void {
    console.warn(this.route.snapshot.params['id'])
    this.student.GetDetails(this.route.snapshot.params['id'])
      .subscribe((result) => {
        this.Collection = result
        this.EditStudent = new FormGroup({
          Roll: new FormControl(this.Collection['Roll']),
          Name: new FormControl(this.Collection['Name']),
          Dob: new FormControl(this.Collection['Dob']),
          Score: new FormControl(this.Collection['Score'])
        })
      })
  }
  Update() {
    this.student.UpdateDetails(this.route.snapshot.params['id'], this.EditStudent.value)
      .subscribe((result) => console.warn(result))
    this.EditStudent.reset({});
    this.router.navigate(['/list']);
  }

  get Roll() {
    return this.EditStudent.get('Roll');
  }
  get Dob() {
    return this.EditStudent.get('Dob');
  }
  get Name() {
    return this.EditStudent.get('Name');
  }
  get Score() {
    return this.EditStudent.get('Score');
  }

}
