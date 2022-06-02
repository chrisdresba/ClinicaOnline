import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storareRef = firebase.app().storage().ref();

  constructor(private storage: AngularFireStorage) { }

  async subirImagen(nombre: string, imgBase: any) {

    try {
      let respuesta = await this.storareRef.child("usuarios/" + nombre).putString(imgBase, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      return null;
    }

  }
}