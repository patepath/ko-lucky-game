import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _fs: Firestore) { }

  add(emply: Employee) {
    emply.id = parseInt(doc(collection(this._fs, 'id')).id);
    return addDoc(collection(this._fs, 'Employees'), emply);
  }

  getAll(): Observable<Employee[]> {
    let ref = collection(this._fs, 'Employees');
    return collectionData(ref, { idField: 'id'}) as Observable<Employee[]>;
  }
}
