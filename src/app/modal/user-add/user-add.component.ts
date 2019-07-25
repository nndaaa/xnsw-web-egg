import { HttpService } from './../../service/http.service';
import { FuncSeviceService } from './../../service/func-sevice.service';

import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  validateForm: FormGroup;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private httpService: HttpService,
    private funService: FuncSeviceService

  ) { }

  destroyModal(s): void {
    this.modal.destroy({ sumited: s });
  }
  async submitForm() {
    // tslint:disable-next-line:forin
    const check = await this.formCheck();
    if (check) {
      await this.formPost();
    }

  }
  async ngOnInit() {
    await this.validataSet(); // 设置校验条件
  }


  /**
   * 校验条件设置
   */
  async validataSet() {
    this.validateForm = this.fb.group({
      realName: [null, [Validators.required]],
      department: [null, [Validators.required]],
      mobile: [null, [
        Validators.required,
        Validators.pattern('^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$')
      ]],
    });
  }

  /**
   * 表单检查
   */
  async formCheck() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 表单提交
   */
  async formPost() {
    const value = this.validateForm.value;
    value.password = '123456';
    this.httpService.userCreate(value).subscribe(res => {
      this.destroyModal(true);
      console.log(res);
      if (res.ok) {
        if (!res.data.success) {
          this.funService.createMessage('error', '添加失败，' + res.data.message);
        } else {
          this.funService.createMessage('success', '用户添加成功！');
        }
      } else {
        this.funService.createMessage('error', '数据操作失败，请联系管理员！');
      }
    });
  }




}
