import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SalesLeadsService
{

  private salesLeadsEndPoint = 'http://cladevwrk03:4321/api/merchant';

  constructor(private http: Http) { }

  getSalesLeads()
  {
    const url = this.salesLeadsEndPoint;

    console.log('Inside the getSalesLeads Method. Hitting this url: ' + url)
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response)
  {
    let body = res.json();
    console.log(body)
    return body || {};
  }

  private handleError(error: Response | any)
  {
    let errMsg: string;
    if (error instanceof Response)
    {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else
    {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
