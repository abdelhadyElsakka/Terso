import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {Router} from "@angular/router";


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  providers:[MessageService],
  animations:[
    trigger('fade',[
      state('void',style({opacity:0})),
      transition('void => *',[animate('1s')]),
      transition('* => void',[animate('500ms')])
    ])
  ]
})
export class ItemCardComponent implements OnInit {

  @Input() itemData:any=[];
  
  media:any;

  baseUrl:string="https://image.tmdb.org/t/p/w500/";
  id: any;
  favList: any;
  favArray: any;

  constructor(private _router:Router, private messageService: MessageService) {
    
  }


  
  favButtonClick(id:number,e:Event){
    this.id=id
    e.stopPropagation();
    const el = document.getElementById(this.id);
    if(el?.classList.contains('fa-solid')){
      this.messageService.add({ key:'c',sticky: true, severity:'warn', summary:'Are you sure you want to remove this item from your Favourite List?', detail:'Confirm to proceed'});
      
    }
    else{
    if(!localStorage.getItem("fav")){
      localStorage.setItem("fav",JSON.stringify([]))
    }else{
      this.favArray=JSON.parse(localStorage.getItem("fav")||"")
      localStorage.setItem("fav",JSON.stringify([...this.favArray, this.itemData]))
    }
    
    el?.classList.add('fa-solid');
    this.addSingle(this.itemData)
    }
  }

  addSingle(data:any) {
    if(data.title){
      this.messageService.add({severity:'success', summary:`Added ${data.title} To Your Favourite List` , life:1200});
    }else if(data.name){
      this.messageService.add({severity:'success', summary:`Added ${data.name} To Your Favourite List` , life:1200});
    }
    
  }

  onConfirm(id:number){
  const el = document.getElementById(this.id);
 
  this.favArray=this.favArray.filter((item:any)=>{
    return item.id != this.id 
  })

  localStorage.setItem("fav",JSON.stringify(this.favArray))
  this.messageService.add({severity:'success', summary:`Removed From Your Favourite List` , life:1200});
  el?.classList.remove('fa-solid');
  this.messageService.clear('c');
}

  onReject(){this.messageService.clear('c')}

  getMediaDetails(){
    if(this.media){
      this._router.navigate(['/details/'+this.media+'/'+this.itemData.id]);
      
    }else if(!this.media){
      this._router.navigate(['/details/person/'+this.itemData.id]);
    }
  }

  ngOnInit(): void {

    this.media=this.itemData.media_type    

  }
  ngAfterViewChecked(){
    this.favArray=JSON.parse(localStorage.getItem("fav")||"")
    for(let item of this.favArray){
      const elem = document.getElementById(item.id);
      if(elem){
        elem.classList.add('fa-solid');
      }
      
    } 
  }

}
