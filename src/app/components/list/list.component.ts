import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public breedList:any[] = [];
  public searchForm!:FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.getAllBreed();
    this.searchForm = this.fb.group({
      search:  ['', Validators.required ],
    });

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


  onChange(event:any){
    if(event.length >0){

      this.breedList = this.breedList.filter(todo => {
        const todoText = todo.breed.toLowerCase();
        const searchText = event.toLowerCase();
        return todoText.includes(searchText)
      })
    }else {
      this.getAllBreed()
    }

  }


}
