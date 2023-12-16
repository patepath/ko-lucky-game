import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    const employees = [
      {code: '001', fullname: ''},
      {code: '002', fullname: ''},
      {code: '003', fullname: ''},
    ]

    return employees;
  }

}
