import {Injectable} from '@angular/core'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MasterService{
    httpOptions;
    constructor(private http:HttpClient){
    this.httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': sessionStorage.getItem('stone')
    })
};
    }
    post(uri,body):Observable<any>{
        let sub=this.http.post(uri,body,this.httpOptions);
        sub.subscribe(res=>{
        },error=>{
            //Control de errores
            console.log(error);
        });
        return sub;
    }
    get(uri):Observable<any>{
        let sub=this.http.get(uri,this.httpOptions);
        sub.subscribe(res=>{
        },error=>{
            //Control de errores
            console.log(error);
        });
        return sub;
    }
}