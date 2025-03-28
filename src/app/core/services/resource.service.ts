import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService {

  APIUrl = environment.apiUrl + this.getResourceUrl()

  abstract getResourceUrl(): string;

  // options = { withCredentials: true };

  protected constructor(protected http: HttpClient) { }

  add(resource: any): Observable<any> {
    return this.http
      .post(this.APIUrl, resource, { observe: 'response' })
      .pipe(catchError((err) => {
        throw new Error('Error', err.message);
      }))
  };

  get(): Observable<any> {
    return this.http
      .get(this.APIUrl)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
      }))

  }

}
