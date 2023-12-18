import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, orderBy, query, updateDoc, } from '@angular/fire/firestore';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _fs: Firestore) { }

  add(emply: Employee) {
    //emply.id = doc(collection(this._fs, 'id')).id;
    return addDoc(collection(this._fs, 'Employees'), emply);
  }

  edit(emply: Employee) {
    let emplyIns = doc(this._fs, 'Employees', emply.id);
    let updateData = {
      code: emply.code,
      fullName: emply.fullName,
    }

    return updateDoc(emplyIns, updateData);
  }

  findAll(): Observable<Employee[]> {
    let ref = query(collection(this._fs, 'Employees'), orderBy('code'));
    return collectionData(ref, { idField: 'id'}) as Observable<Employee[]>;
  }
}
