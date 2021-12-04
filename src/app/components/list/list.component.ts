import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public breedList:any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllBreed();

  }

  getAllBreed(){
    this.apiService.getAllBreed().subscribe(
      resp => {
    
        if(resp.status == "success"){
          const entries = Object.entries(resp.message)
          const aux: any[] = [];
          entries.forEach((entry) => {
            aux.push({
              breed: entry[0],
              subCategory: entry[1],
            })
          })

          const lengthArray = aux.length;
          this.breedList = aux;
        }
      }
    )
  }


  public title:string = '';
  breedSelect:string ='';
  subSelect:string ='';

  modalImg(breed:string, sub:string){
    this.breedSelect = breed;
    this.subSelect = sub; 
 
    this.title = sub;
    this.getGallery(breed, sub);
  }

  public images: any[] = [];
  getGallery(breed:string, sub:string){
    this.apiService.getGallery(breed, sub).subscribe(
      resp => {
        if(resp.status == "success"){
          this.images = resp.message;
        }
      }
    )
  }

  favorite(name:any){ 
    if(name == this.breedSelect){} 
    const info = {
      breed: this.breedSelect,
      subCategory: [this.subSelect]
    }  
    const data = JSON.stringify(info)
    if(localStorage.getItem('favorite') == null){
      localStorage.setItem('favorite', data)
    }else {
      const sure = confirm("Already has a favorite!!! Are you sure to change it?")
      if(sure){
        localStorage.setItem('favorite', data)
      }
    }
  }

}
