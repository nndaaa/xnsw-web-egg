
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSeviceService } from './data-sevice.service';
import { Observer, Observable, of } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient, public dataService: DataSeviceService) { }

  /**
   * HTTP 参数设置
   */
  httpOptions = () => {
    this.dataService.token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + this.dataService.token
      })
    };
    return options;
  }

  /**
   *  HTTP 错误处理
   * @param operation 操作
   * @param result 结果
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * GET 根据URL获取
   * @param url 地址
   */
  getByUrl(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions()).pipe(
      catchError(this.handleError<any>(`geturl url=${url}`))
    );
  }

  /**
   * GET 根据URL + query 获取:
   */
  getByQuery = (url: string, query: object) => {
    let queryUrl;
    Object.keys(query).forEach((key) => {
      console.log(key, query[key]);
      queryUrl = key + '=' + query[key];
    });
    return this.http.get(url + '?' + queryUrl, this.httpOptions());
  }

  /**
   * GET 根据URL + params 获取
   */
  getByParams = (url: string, params: string) => {
    return this.http.get(url + '/' + params, this.httpOptions());
  }

  /**
   * POST BODY 提交
   */
  postWithBody = (url: string, body: object) => {
    return this.http.post(url, body, this.httpOptions()).pipe(
      catchError(this.handleError<any>(`postwithbody url=${url}`))
    );
  }


  /**
   * 获取部门清单
   */
  departmengList(): Observable<any> {
    return this.getByUrl(this.dataService.getDepartment);
  }

  /**
   * 根据部门ID获取用户列表
   * @param departmentId 部门 _id
   */
  userByDepartment(departmentId: string): Observable<any> {
    return this.getByUrl(this.dataService.getUserByDepartment + departmentId);
  }


  //#region 用户管理接口
  /**
   * 获取全部用户列表
   */
  userList(): Observable<any> {
    return this.getByUrl(this.dataService.userList);
  }
  //#endregion



  //#region 权限管理接口
  /**
   * 获取全部权限列表
   */
  permissionList(): Observable<any> {
    return this.getByUrl(this.dataService.permissionList);
  }

  /**
   * 权限创建
   * @param value 表单数值
   */
  permissionCreate(value): Observable<any> {
    return this.postWithBody(this.dataService.permissionCreate, value);
  }

  /**
   * 权限删除
   * @param id 权限数据_id
   */
  permissionDelete(id): Observable<any> {
    return this.postWithBody(this.dataService.permissionDelete, id);
  }

  /**
   * 权限编辑
   * @param value 编辑值，格式{id: id, value: value}
   */
  permissionEdit(value): Observable<any> {
    return this.postWithBody(this.dataService.permissionEdit, value);
  }
  /**
   * 权限查找
   * @param value 查找条件 对象 ： {_id: id, name: name}
   */
  permissionFind(value): Observable<any> {
    return this.getByQuery(this.dataService.permissionFind, value);
  }

  /**
   * 权限地址校验
   * @param value ps: '/api/user'
   */
  permissionUrlCheck = (value) => {
    return new Observable((observer) => {
      this.permissionFind({ url: value }).subscribe(res => {
        console.log(value);
        console.log(res);
        observer.next(null);
      });
    });
  }
  //#endregion



  //#region 角色管理接口
  /**
   * 获取全部角色列表
   */
  roleList(): Observable<any> {
    return this.getByUrl(this.dataService.roleList);
  }

  /**
   * 角色创建
   * @param value 表单数值
   */
  roleCreate(value): Observable<any> {
    return this.postWithBody(this.dataService.roleCreate, value);
  }

  /**
   * 角色删除
   * @param id 角色数据_id
   */
  roleDelete(id): Observable<any> {
    return this.postWithBody(this.dataService.roleDelete, id);
  }

  /**
   * 角色编辑
   * @param value 编辑值，格式{id: id, value: value}
   */
  roleEdit(value): Observable<any> {
    return this.postWithBody(this.dataService.roleEdit, value);
  }
  /**
   * 角色查找
   * @param value 查找条件 对象 ： {_id: id, name: name}
   */
  roleFind(value): Observable<any> {
    return this.getByQuery(this.dataService.roleFind, value);
  }

  /**
   * 角色校验
   */
  roleNameCheck = (value) => {
    return new Observable((observer) => {
      this.roleFind({ name: value }).subscribe(res => {
        console.log(value);
        console.log(res);
        observer.next(null);
      });
    });
  }
  //#endregion

}
