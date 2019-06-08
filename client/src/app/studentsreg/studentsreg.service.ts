import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentsregService {

  url: string = "/api/dealers";
  url_1: string = "/api/candidates";
  url_2: string = "/api/studenttokens";


  constructor(private http: HttpClient) { }

  public get(urlLink, passcode): Observable<any> {
    return this.http.get(this.url + "/" + urlLink + "/" + passcode);
  }

  public getCollegeList():Observable<any>{
    return this.http.get(this.url + '/' + 'dealers')
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

  public getCurrentOrgDetails(orgURLPrfix): Observable<any> {
    return this.http.get(this.url + "/" + orgURLPrfix);
  }

  public addCandidates(data): Observable<any> {
    return this.http.post(this.url_1, data);
  }
  public updateCandidates(id,data): Observable<any> {
    return this.http.put(this.url_1 + "/" + id, data);
  }
  public setStatusFlag(urlLink,passcode): Observable<any> {
    return this.http.put(this.url + "/codestatus/"  + urlLink + "/" + passcode,'false');
  }

  public getURLPrfix(urlLink): Observable<any> {
    return this.http.get(this.url + "/getUrlPrfix/" + urlLink);
  }
}
