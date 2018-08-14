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
  tags = [];
  docEle: HTMLDivElement;
  selectedTab: number = 0;
  constructor(private service: DataService){}

  ngOnInit(){
    this.service.get('http://localhost:3000/api/data').subscribe( data=> {
      this.data = this.trimDocData(data);
    });

    this.service.getTags().subscribe( tags => {
      this.tags = tags;
    });
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
