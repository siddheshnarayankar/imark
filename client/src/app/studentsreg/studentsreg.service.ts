import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentsregService {

  url: string = "/api/dealers";
  url_1: string = "/api/candidates";
  url_2: string = "/api/studenttokens";


  constructor(private http: HttpClient) { }

  public get(std_d_id, std_o_id, passcode): Observable<any> {
    return this.http.get(this.url_2 + "/" + std_d_id + "/" + std_o_id + "/" + passcode);
  }

  public add(data): Observable<any> {
    return this.http.post(this.url, data);
  }

  public edit(id, data): Observable<any> {
    return this.http.put(this.url + "/" + id, data);
  }

  public delete(id): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
  public addImage(data): Observable<any> {
    return this.http.post(this.url_1 + "/test", data);
  }

  public getCurrentOrgDetails(current_Org_id): Observable<any> {
    return this.http.get(this.url + "/" + current_Org_id);
  }

  public addCandidates(data): Observable<any> {
    return this.http.post(this.url_1, data);
  }
  public setStatusFlag(std_d_id, std_o_id,passcode): Observable<any> {
    return this.http.put(this.url_2 + "/codestatus/" + std_d_id + "/" + std_o_id + "/" + passcode,'false');
  }


}
