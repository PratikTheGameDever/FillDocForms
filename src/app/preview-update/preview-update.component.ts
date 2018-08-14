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
  tags = [];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.get('http://localhost:3000/api/data/template').subscribe( data=> {
      this.templateEle.nativeElement.innerHTML = this.trimDocData(data);
    });
    this.service.getTags().subscribe( tags => {
      this.tags = tags;
    });
    
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

  saveFinalData(){
    this.docEle.getElementsByClassName('3DWordSection1')[0].innerHTML = this.templateEle.nativeElement.innerHTML;
    this.service.postFinal(this.docEle.outerHTML, this.templateEle.nativeElement.innerHTML).subscribe( res => {
      this.service.getFinal().subscribe();
    });
  }

}
