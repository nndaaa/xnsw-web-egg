import { UserAddComponent } from './../../modal/user-add/user-add.component';
import { UserComponent } from './../../pages/user/user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UserComponent,
    UserAddComponent,
  ],
  entryComponents: [UserAddComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class UserModule { }
