import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador } from '../class/administrador';
import { Especialista } from '../class/especialista';
import { Paciente } from '../class/paciente';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  listado: any[] = [];
  constructor(private firestore: AngularFirestore) {

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

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string) {
    return this.firestore.collection(path).doc(id).valueChanges();
  }

  getDatosUserAdmin(uid: string) {
    const path = 'administradores';
    const id = uid;
    this.getDoc(path, id).subscribe(res => {
      console.log(res);
    })
  }

  userAdmin(mail: string) {

    this.getAdministradores().subscribe(usuario => {
      this.listado = usuario;
    })
    for (let i = 0; i < this.listado.length; i++) {
      if (this.listado[i].mail == mail) {
        return true;
        break;
      }
    }
    return false;

  }

  async savePaciente(res: Paciente) {
    let entidad = { 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'obraSocial': res.obraSocial, 'mail': res.mail, 'foto1': res.foto1, 'foto2': res.foto2, 'paciente': res.paciente }
    return await this.firestore.collection('pacientes').add(entidad);
  }

  async saveEspecialista(res: Especialista) {
    let entidad = { 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'especialidad': res.especialidad, 'mail': res.mail, 'foto1': res.foto1, 'especialista': res.especialista }
    return await this.firestore.collection('especialistas').add(entidad);
  }

  async saveAdmin(res: Administrador) {
    let entidad = { 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'mail': res.mail, 'foto1': res.foto1, 'admin': res.admin }
    return await this.firestore.collection('administradores').add(entidad);
  }

}