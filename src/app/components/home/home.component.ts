import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public breedItem:any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllBreed()
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

          // RANDOM
          const lengthArray = aux.length;
          const random = this.getRandom(lengthArray);

          // LOCAL STORAGE
          let local = JSON.parse(localStorage.getItem('favorite') as string);
          
          if(local){
            this.breedItem = local;
          }else {
            this.breedItem = aux[random];
          }

        }
      }
    )
  }
  
  getRandom(max:number) {  
    return Math.floor(
      Math.random() * (max - 0) + 0
    )
  }
}
