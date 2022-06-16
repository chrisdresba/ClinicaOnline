import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialista } from '../class/especialista';
import { Paciente } from '../class/paciente';
import { Turnos } from '../class/turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  listado: any[] = [];
  constructor(private firestore: AngularFirestore) {
    this.getTurnos().subscribe(turno => {
      this.listado = turno;
    })
   }

   getTurnos = (): Observable<any[]> => {
    return this.firestore.collection('turnos').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Turnos[];
      })
    );
  }

  async saveTurno(res: Turnos) {
    let entidad = { 'id':res.id, 'fecha': res.fecha, 'hora': res.hora, 'paciente': res.paciente, 'especialista': res.especialista, 'especialidad': res.especialidad, 'estado': res.estado, 'encuesta': res.encuesta, 'resenia': res.resenia, 'comentarioPaciente': res.comentarioPaciente,'diagnosticoPaciente': res.diagnosticoPaciente  }
    return await this.firestore.collection('turnos').doc(res.id).set(entidad);
  }

  actualizarEstado ( res: Turnos ) {
    return this.firestore.collection( 'turnos' ).doc(res.id).update ( {...res} );
  }

}
