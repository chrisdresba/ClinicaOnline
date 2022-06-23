import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from '../class/administrador';
import { Especialista } from '../class/especialista';
import { Horarios } from '../class/horarios';
import { Paciente } from '../class/paciente';
import { SesionService } from './sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  listado: any[] = [];

  listadoPacientes: any[] = [];
  listadoEspecialistas: any[] = [];

  constructor(private firestore: AngularFirestore, public sesion: SesionService) {
    this.getAdministradores().subscribe(usuario => {
      this.listado = usuario;
    })

    this.getEspecialistas().subscribe(usuario => {
      this.listadoEspecialistas = usuario;
    })

    this.getPacientes().subscribe(usuario => {
      this.listadoPacientes = usuario;
    })
  }

  getPacientes = (): Observable<any[]> => {
    return this.firestore.collection('pacientes').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Paciente[];
      })
    );
  }

  getEspecialistas = (): Observable<any[]> => {
    return this.firestore.collection('especialistas').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Especialista[];
      })
    );
  }

  getAdministradores = (): Observable<any[]> => {
    return this.firestore.collection('administradores').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Administrador[];
      })
    );
  }

  userAdmin(mail: string) {
    for (let i = 0; i < this.listado.length; i++) {
      if (this.listado[i].mail == mail) {
        return true;
      }
    }
    return false;
  }

  async savePaciente(res: Paciente) {
    let entidad = { 'id': res.id, 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'obraSocial': res.obraSocial, 'mail': res.mail, 'foto1': res.foto1, 'foto2': res.foto2, 'paciente': res.paciente }
    return await this.firestore.collection('pacientes').doc(res.id).set(entidad);
  }

  async saveEspecialista(res: Especialista) {
    let entidad = { 'id': res.id, 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'especialidad': res.especialidad, 'mail': res.mail, 'foto1': res.foto1, 'especialista': res.especialista, 'estado': false, 'horario': res.horario }
    return await this.firestore.collection('especialistas').doc(res.id).set(entidad);
  }

  async saveAdmin(res: Administrador) {
    let entidad = { 'id': res.id, 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'mail': res.mail, 'foto1': res.foto1, 'admin': res.admin }
    return await this.firestore.collection('administradores').doc(res.id).set(entidad);
  }

  actualizarEspecialista(res: Especialista) {
    return this.firestore.collection('especialistas').doc(res.id).update({ ...res });
  }

  traerUsuario(res: any) {
    for (let i = 0; i < this.listado.length; i++) {
      if (this.listado[i].id == res.uid) {
        return this.listado[i];
      }
    }

    for (let i = 0; i < this.listadoPacientes.length; i++) {
      if (this.listadoPacientes[i].id == res.uid) {
        return this.listadoPacientes[i];
      }
    }

    for (let i = 0; i < this.listadoEspecialistas.length; i++) {
      if (this.listadoEspecialistas[i].id == res.uid) {
        return this.listadoEspecialistas[i];
      }
    }
  }

  ingresoUsuario(email: string) {
    for (let i = 0; i < this.listado.length; i++) {
      if (this.listado[i].mail == email) {
        this.sesion.sesionAdmin = true;
        break;
      }
    }

    for (let i = 0; i < this.listadoEspecialistas.length; i++) {
      if (this.listadoEspecialistas[i].mail == email) {
        this.sesion.sesionEspecialista = true;
        break;;
      }
    }

    for (let i = 0; i < this.listadoPacientes.length; i++) {
      if (this.listadoPacientes[i].mail == email) {
        this.sesion.sesionPaciente = true;
        break;
      }
    }

  }

  getPaciente ( paciente? : any ) {
    return this.firestore.collection('pacientes').ref.where( "id", "==", paciente ).get().then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) ); 
  }

}