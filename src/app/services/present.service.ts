import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Present } from '../models/present';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentService {

  constructor(private _fs: Firestore) { }

  add(present: Present) {
    //emply.id = doc(collection(this._fs, 'id')).id;
    return addDoc(collection(this._fs, 'Presents'), present);
  }

  edit(present: Present) {
    let presentIns = doc(this._fs, 'Presents', present.id);
    let updateData = {
      name: present.name,
    }

    return updateDoc(presentIns, updateData);
  }

  findAll(): Observable<Present[]> {
    let ref = query(collection(this._fs, 'Presents'), orderBy('name'));
    return collectionData(ref, { idField: 'id'}) as Observable<Present[]>;
  }
}
