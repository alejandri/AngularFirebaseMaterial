import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../_interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbPath = '/registros1';
  registrosRef: AngularFirestoreCollection<Post>;

  constructor(private db: AngularFirestore) {
    this.registrosRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Post> {
    return this.registrosRef;
  }
  getIncubadora(idIncub:number): AngularFirestoreCollection<Post> {
    this.registrosRef = this.db.collection('/registros'+idIncub);
    return this.registrosRef;
  }

  create(incub:number, registro: Post): any {
    let collection = 'registros'+incub;
    this.registrosRef = this.db.collection(collection);
    return this.registrosRef.add({ ...registro });
  }

  update(id: string, data: any): Promise<void> {
    return this.registrosRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.registrosRef.doc(id).delete();
  }
}