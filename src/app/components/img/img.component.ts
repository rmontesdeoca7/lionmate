import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  @Input() breed:string = '' ;
  public imgBreed: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getImg(this.breed).subscribe(img => {
      if(img.status === 'success') {
        this.imgBreed = img.message;
      }
      
    })
  }

}
