import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective,ReactiveFormsModule } from '@angular/forms'
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  AddStudent = new FormGroup({
    Roll: new FormControl(''),
    Name: new FormControl(''),
    Dob: new FormControl(''),
    Score: new FormControl(''),
  })
  constructor(private student: StudentsService) { }

  ngOnInit(): void {
  }
  CollectDetails() {
    this.student.SaveDetails(this.AddStudent.value).subscribe((result) =>
      console.warn("the results are here", result));
    this.AddStudent.reset({});
  }
  get Roll() {
    return this.AddStudent.get('Roll');
  }
  get Dob() {
    return this.AddStudent.get('Dob');
  }
  get Name() {
    return this.AddStudent.get('Name');
  }
  get Score() {
    return this.AddStudent.get('Score');
  }
}
