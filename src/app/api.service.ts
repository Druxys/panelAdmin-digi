import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Article} from './article';
import {Form} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
    .append('Access-Control-Allow-Origin', '*')
    .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
    .append('Authorization', 'Bearer' + sessionStorage.getItem('token'))
};

const httpHeaders = {
  headers: new HttpHeaders()
    .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
    .append('Authorization', 'Bearer' + sessionStorage.getItem('token'))
};

const apiUrl = 'http://localhost:3000/articles';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl)
      .pipe(
        tap(article => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getArticle(id: number): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Article>(`getProduct id=${id}`))
    );
  }

  addArticle(article: FormData): Observable<Article> {
    return this.http.post<Article>(apiUrl, article, httpHeaders).pipe(
      tap((art: Article) => console.log(`added product w/ id=${article}`)),
      catchError(this.handleError<Article>('addProduct'))
    );
  }

  updateArticle(_id: any, article: Article): Observable<any> {
    const url = `${apiUrl}/${_id}`;
    return this.http.patch(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${article._id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteArticle(_id: any): Observable<Article> {
    const url = `${apiUrl}/${_id}`;
    return this.http.delete<Article>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${_id}`)),
      catchError(this.handleError<Article>('deleteProduct'))
    );
  }
}
