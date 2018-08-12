import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  @ViewChild('docEle') docEleTpl: ElementRef;
  data = '';
  tags = [
    {key: 'staddr', title: 'St. Address', tag: '<span id="staddr">@@St.Addr.@@</span>', type: 'text', value: ''},
    {key: 'city', title: 'City', tag: '<span id="city">@@city@@</span>', type: 'select',
      options: [
        'Manchester',
        'Hartford',
        'New Haven',
        'Boston',
        'New York'
      ], value: ''
    },
    {key: 'state', title: 'State', tag: '<span id="state">@@State@@</span>', type: 'select',
      options: [
        'CT',
        'MA',
        'WY',
        'NY',
        'ID'
      ], value: ''
    },
    {key: 'zipcode', title: 'Zip Code', tag: '<span id="zipcode">@@Zip Code@@</span>', type: 'text', value: ''},
    {key: 'telnum', title : 'Tel. Number', tag: '<span id="telnum">@@Tel. Number@@</span>', type: 'text', value: '' },
    {key: 'email', title : 'Email Addr.', tag: '<span id="email">@@Email Addr.@@</span>', type: 'text', value: ''},
    {key: 'title', title : 'Title', tag: '<span id="title">@@Title@@</span>', type: 'text', value: ''},
    {key: 'para', title : 'Paragraph', tag: '< span id="para">@@Paragraph@@</span>', type: 'textarea', value: ''}
  ];
  docEle: HTMLDivElement;
  selectedTab: number = 1;
  constructor(private service: DataService){}

  ngOnInit(){
    this.service.get('http://localhost:3000/api/data').subscribe( data=> {
      this.data = this.trimDocData(data);
    })
  }

  trimDocData(data: string): string {
    this.docEle = document.createElement('div');
    this.docEle.innerHTML = data;
    return this.docEle.getElementsByClassName('3DWordSection1')[0].innerHTML;
  }

  onItemDrop(event) {
    // console.log('Element was dragged', event.dragData);
    // console.log('co-ordinates : ', event.nativeEvent.clientX, ' , ', event.nativeEvent.clientY);
    // console.log(event.dragData, ' dropped on ', event.nativeEvent.target);
    event.nativeEvent.target.innerHTML = event.dragData.tag;
  }

  save() : void{
    this.docEle.getElementsByClassName('3DWordSection1')[0].innerHTML = this.docEleTpl.nativeElement.innerHTML;
    this.service.post(this.docEle.outerHTML).subscribe( res => {
      console.log(res);
    })
  }

  saveAndPreview() : void {
    this.save();
    this.switchToPreview()
  }

  switchToPreview(){
    this.selectedTab = 1;
  }
}
