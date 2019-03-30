import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  url: string = "/api/users";
  url_1: string = "/api/dealers";
  url_2: string = "/api/candidates";

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get(this.url);
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

  public getOrgList(id): Observable<any> {
    return this.http.get(this.url_1 + "/orglist/" + id);
  }

  public getCandidateList(id): Observable<any> {
    return this.http.get(this.url_2 + "/" + id);
  }


}