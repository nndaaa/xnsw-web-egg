import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { DeviceService } from './../../service/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  fileList: UploadFile[] = [];
  listOfData = [];
  searchValue = '';
  isSpinning = true;
  local: any;
  constructor(private deviceService: DeviceService) { }
  ngOnInit() {
    this.local = JSON.parse(localStorage.getItem('deviceList'));
    if (this.local) {
      this.listOfData = this.local;
      this.isSpinning = false;
      this.load();
    } else {
      this.local = [];
      this.load();
    }

  }

  load = () => {

    this.deviceService.deviceList().subscribe((res) => {
      // console.log(res);
      localStorage.setItem('deviceList', JSON.stringify(res.data));
      if (this.local.toString() !== res.data.toString()) {
        this.isSpinning = true;
        setTimeout(() => {
          this.listOfData = res.data;
          this.isSpinning = false;
        }, 500);
      } else {
        this.isSpinning = false;
      }
    });
  }
  qrCodeReset(): void {
    this.searchValue = '';
    this.load();
  }
  qrCodeSearch = () => {
    this.deviceService.deviceFind({ qrCode: this.searchValue }).subscribe(res => {
      console.log(res);
      this.listOfData = res.data;
    });
  }
  incomingfile(event) {
    this.file = event.target.files[0];
    this.Upload();
  }
  exclImport = () => {
    this.deviceService.deviceImport(this.listOfData).subscribe(res => {
      console.log(res);
    });
  }
  exclExport = () => {
    console.log('exclExport');

    /* generate a worksheet */
    const ws = XLSX.utils.json_to_sheet(this.listOfData);

    /* add to workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Presidents');

    /* write workbook and force a download */
    XLSX.writeFile(wb, 'sheetjs.xlsx');

  }
  Upload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      // tslint:disable-next-line:variable-name
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.listOfData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    };
    fileReader.readAsArrayBuffer(this.file);
  }


}
