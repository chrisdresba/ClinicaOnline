import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }
 
  async crearDatos(item:any){
    return await this.firestore.collection('logsUsuarios').add(item);
  }

  getLogs = (): Observable<any[]> => {
    return this.firestore.collection('logsUsuarios').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as any[];
      })
    );
  }

  getLogsPorFecha ( fecha? : any ) {
    return  this.firestore.collection('logsUsuarios').ref.where( "fecha", "==", fecha ).get().then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }

}
