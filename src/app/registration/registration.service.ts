import { Injectable } from '@angular/core';
import { Registration } from './registration.model';
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private userURL = "https://localhost:7146/user";
  // private userURL1 = "http://localhost:5057/";
  private reg = Registration;
  //private handleError="";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.userURL)
    // .pipe(
    //   tap(data => this.getUserdata(data)),
    //   catchError(this.handleError)
    // );
  }

  getUserdata(data: Registration[]) {
    console.log(JSON.stringify(data))
  }

  getUser(id: number): Observable<Registration> {
    if (id === 0) {
      return of(this.initializeRegistration());
    }
    const url = `${this.userURL}/${id}`;
    return this.http.get<Registration>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  getUserbyusername(username: string): Observable<Registration> {

    const url = `${this.userURL}/getuser/${username}`;
    return this.http.get<Registration>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
  }

  createUser(registration: Registration): Observable<Registration> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    registration.id = 0;
    return this.http.post<Registration>(this.userURL, registration, { headers })
      .pipe(
        tap(data => console.log('createUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  deleteUser(reg: Registration): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userURL}/deleteuser`;
    return this.http.post<Registration>(url,reg)
      .pipe(
        tap(data => console.log('deleteUser: ' + reg.firstName)),
        catchError(this.handleError)
      );
  }

  updateUser(registration: Registration): Observable<Registration> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.userURL}/${registration.id}`;
    return this.http.put<Registration>(url, registration, { headers })
      .pipe(
        tap(() => console.log('updateUser: ' + registration.id)),
        // Return the product on an update
        map(() => registration),
        catchError(this.handleError)
      );
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage!: string;
    if (err.error && err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status!}: ${err.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


  private initializeRegistration(): Registration {
    return {
      id: 0,
      firstName: "",
      lastName: "",
      userName: "",
      password: ""
    };
  }

}



