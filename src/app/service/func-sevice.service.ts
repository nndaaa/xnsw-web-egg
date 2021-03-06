import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class FuncSeviceService {

  constructor(
    private message: NzMessageService,
  ) { }
  /**
   * 数组 生成树
   * @param data 数组数据
   */
  toTree = (data: any) => {
    const map = {};
    // tslint:disable-next-line:no-shadowed-variable
    data.forEach(item => {
      map[item._id] = item;
    });
    const val = [];
    data.forEach(item => {
      // 以ID作为KEY
      item.key = item._id;
      // 以name作为title，适应NGZERRO树形控件
      item.title = item.name;
      // 初始化节点状态,判断是否为父节点
      (item.children) ? (item.isLeaf = false) : (item.isLeaf = true);
      // 以当前遍历项，的parent_id,去map对象中找到索引的id
      const parent = map[item.parentId];
      // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        parent.isLeaf = false; // 设置父节点状态
        (parent.children || (parent.children = [])).push(item);
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    return val;
  }

  /**
   * 数组 生成SELECT
   * @param data 数组数据
   */
  toSelect = (data: any) => {
    const map = {};
    // tslint:disable-next-line:no-shadowed-variable
    data.forEach(item => {
      map[item._id] = item;
    });
    const val = [];
    data.forEach(item => {
      // 以ID作为KEY
      item.key = item._id;
      // 以name作为title，适应NGZERRO树形控件
      item.title = item.name;
      // 初始化节点状态,判断是否为父节点
      (item.children) ? (item.isLeaf = false) : (item.isLeaf = true);
      // 以当前遍历项，的parent_id,去map对象中找到索引的id
      const parent = map[item.parentId];
      // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
      if (parent) {
        parent.isLeaf = false; // 设置父节点状态
        (parent.children || (parent.children = [])).push(item);
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item);
      }
    });
    return val;
  }

  /**
   * 显示全局消息
   * @param type 类型：success error warning
   * @param msg  消息内容
   */
  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

}
