import { FuncSeviceService } from './../../service/func-sevice.service';
import { UserAddComponent } from './../../modal/user-add/user-add.component';
import { HttpService } from './../../service/http.service';
import { DataSeviceService } from './../../service/data-sevice.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isSpinning = true;
  users = [];
  constructor(
    public httpService: HttpService,
    public dataService: DataSeviceService,
    private modalService: NzModalService,
    private funService: FuncSeviceService
  ) { }

  ngOnInit() {
    this.userLoad();
  }
  userLoad = () => {
    this.httpService.userList().subscribe(res => {
      this.isSpinning = false;
      if (res.ok) {
        this.users = res.data;
      } else {
        console.log(res);

      }
    });
  }
  createComponentModal(): void {
    const modal = this.modalService.create({
      nzTitle: '用户添加',
      nzContent: UserAddComponent,
      nzComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [
        {
          label: '取消',
          onClick: componentInstance => {

            componentInstance.destroyModal(false);
          }
        },
        {
          label: '确定',
          type: 'primary',
          onClick: componentInstance => {
            // tslint:disable-next-line:no-non-null-assertion
            componentInstance.submitForm();
          }
        }
      ]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if (result.sumited) {
        this.userLoad();
      }
    });

    // delay until modal instance created
    setTimeout(() => {
      const instance = modal.getContentComponent();
      // instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  async userDelete(id) {
    this.httpService.userDelete({_id: id}).subscribe(res => {
      if (res.ok) {
        this.funService.createMessage('success', '用户删除成功！');
        this.userLoad();
      }
    }, err => console.error(err));
  }
}


