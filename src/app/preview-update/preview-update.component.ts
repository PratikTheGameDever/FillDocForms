import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-preview-update',
  templateUrl: './preview-update.component.html',
  styleUrls: ['./preview-update.component.css']
})
export class PreviewUpdateComponent implements OnInit {
  @ViewChild('form') ngForm: NgForm;
  @ViewChild('docEle') templateEle: ElementRef;
  data = '';
  docEle: HTMLDivElement;
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

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.get('http://localhost:3000/api/data/template').subscribe( data=> {
      this.templateEle.nativeElement.innerHTML = this.trimDocData(data);
    })
    this.ngForm.form.valueChanges.subscribe(x => {
      this.tags.forEach(tag => {
        let ele = window.document.getElementById(tag.key);
        if(ele !== undefined && ele !== null){
          ele.innerHTML = x[tag.key] || ele.innerHTML;
        }
      });
    })
  }

  trimDocData(data: string): string {
    this.docEle = document.createElement('div');
    this.docEle.innerHTML = data;
    return this.docEle.getElementsByClassName('3DWordSection1')[0].innerHTML;
  }

}
