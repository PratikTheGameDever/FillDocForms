import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  data = '';
  tags = [
    'Res./Mail. Address',
    'Tel. Number',
    'Email Addr.',
    'Date',
    'First Name',
    'Last Name',
    'Title',
    'Org. Addr.',
    'Sender Name',
    'Sender Signature'
  ];

  constructor(private service: DataService){}

  ngOnInit(){
    this.service.getData().subscribe( data=> {
      this.data = this.trimDocData(data);
    })
  }

  trimDocData(data: string): string {
    const docEle = document.createElement('div');
    docEle.innerHTML = data;
    
    return docEle.getElementsByClassName('3DWordSection1')[0].innerHTML;
  }


}
