import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSeviceService {
  constructor() { }
  token: string;
  baseUrl = 'http://127.0.0.1:7001/';
  // baseUrl = 'http://124.226.215.207:7001/';
  // baseUrl = 'https://eggapi.intlive.com/';
  /** 动态校验延迟时间 ms */
  asyncTime = 500;

  //////////// 用户管理 ///////////////////
  /** 用户登陆  */
  login = this.baseUrl + 'api/login';
  /** 用户列表获取  */
  getUsers = this.baseUrl + 'api/user';
  userList = this.baseUrl + 'api/user';
  /** 用户获取（电话）  */
  getUserByMobile = this.baseUrl + 'api/userByMobile';
  /** 用户获取（部门ID）  */
  getUserByDepartment = this.baseUrl + 'api/userfind?department=';
  /** 用户添加 */
  userAdd = this.baseUrl + 'api/user';
  /** 用户删除（id） */
  deleteUser = this.baseUrl + 'api/user/delete';
  /** 用户信息修改 */
  editUser = this.baseUrl + 'api/user/edit';


  //////////// 部门管理 ///////////////////
  /** 部门列表  */
  getDepartment = this.baseUrl + 'api/department';
  /** 部门添加  */
  createDepartment = this.baseUrl + 'api/department';
  /** 部门修改  */
  editDepartment = this.baseUrl + 'api/department/edit';
  /** 部门删除  */
  deleteDepartment = this.baseUrl + 'api/department/delete';

  //////////// 权限管理 ///////////////////
  /** 全部权限列表  */
  permissionList = this.baseUrl + 'api/permission';
  /** 权限添加  */
  permissionCreate = this.baseUrl + 'api/permission';
  /** 权限修改  */
  permissionEdit = this.baseUrl + 'api/permission/edit';
  /** 权限删除  */
  permissionDelete = this.baseUrl + 'api/permission/delete';
  /** 权限查找(单条)  */
  permissionFind = this.baseUrl + 'api/permission/find';


  //////////// 角色管理 ///////////////////
  /** 全部角色列表  */
  roleList = this.baseUrl + 'api/role';
  /** 角色添加  */
  roleCreate = this.baseUrl + 'api/role';
  /** 角色修改  */
  roleEdit = this.baseUrl + 'api/role/edit';
  /** 角色删除  */
  roleDelete = this.baseUrl + 'api/role/delete';
  /** 角色查找(单条)  */
  roleFind = this.baseUrl + 'api/role/find';

}
