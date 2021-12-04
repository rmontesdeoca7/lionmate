import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllBreed(){
    return this.http.get<any>(url+'breeds/list/all')
  }

  getImg(breed:string) {
    return this.http.get<any>(url+`breed/${breed}/images/random`)
  }

  getGallery(breed:string, sub:string) {
    return this.http.get<any>(url+`breed/${breed}/${sub}/images/random/8`)
  }

}
