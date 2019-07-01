import { HttpService } from './http.service';
import { DataSeviceService } from './data-sevice.service';
import { Observer, Observable, of } from 'rxjs';

export class DeviceService {
  constructor(private httpService: HttpService, private dataService: DataSeviceService) { }
  //////////// 设备管理接口地址 ///////////////////
  deviceApiUrl = {
    /** 列表  */
    deviceList: this.dataService.baseUrl + 'api/device',
    /** 添加  */
    deviceCreate: this.dataService.baseUrl + 'api/device',
    /** 修改  */
    deviceEdit: this.dataService.baseUrl + 'api/device/edit',
    /** 删除  */
    deviceDelete: this.dataService.baseUrl + 'api/device/delete',
    /** 查找(单条)  */
    deviceFind: this.dataService.baseUrl + 'api/device/find',
    /** 导入(多条)  */
    deviceImport: this.dataService.baseUrl + 'api/device/import'
  };


  //#region 设备管理接口

  /**
   * 导入Ecxl XLXS
   */
  deviceImport(value): Observable<any> {
    return this.httpService.postWithBody(this.deviceApiUrl.deviceImport, value);
  }
  /**
   * 获取列表
   */
  deviceList(): Observable<any> {
    return this.httpService.getByUrl(this.deviceApiUrl.deviceList);
  }

  /**
   * 创建
   * @param value 表单数值
   */
  deviceCreate(value): Observable<any> {
    return this.httpService.postWithBody(this.deviceApiUrl.deviceCreate, value);
  }

  /**
   * 删除
   * @param id 数据_id
   */
  deviceDelete(id): Observable<any> {
    return this.httpService.postWithBody(this.deviceApiUrl.deviceDelete, id);
  }

  /**
   * 编辑
   * @param value 编辑值，格式{id: id, value: value}
   */
  deviceEdit(value): Observable<any> {
    return this.httpService.postWithBody(this.deviceApiUrl.deviceEdit, value);
  }
  /**
   * 查找
   * @param value 查找条件 对象 ： {_id: id, name: name}
   */
  deviceFind(value): Observable<any> {
    return this.httpService.getByQuery(this.deviceApiUrl.deviceFind, value);
  }

  /**
   * 校验
   */
  deviceCodeCheck = (value) => {
    return new Observable((observer) => {
      this.deviceFind({ qrCode: value }).subscribe(res => {
        console.log(value);
        console.log(res);
        observer.next(null);
      });
    });
  }
  //#endregion


}
