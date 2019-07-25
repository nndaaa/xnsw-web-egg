import { DataSeviceService } from './../../service/data-sevice.service';
import { HttpService } from './../../service/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  async submitForm() {
    await this.checkForm();
    if (this.validateForm.status === 'VALID') {
      this.httpService.login(this.validateForm.value).subscribe(res => {
        console.log(res);
        if(res){
          this.dataService.token = res.data.token;
          this.router.navigateByUrl('/main');
        }
      }, err => {
        console.log(err);
      });
    }
  }
  async checkForm() {
   // tslint:disable-next-line:forin
   for (const i in this.validateForm.controls) {
    this.validateForm.controls[i].markAsDirty();
    this.validateForm.controls[i].updateValueAndValidity();
  }
  }

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dataService: DataSeviceService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      realName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
