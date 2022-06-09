import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {
  nombre: string = '';
  apellido: string = '';
  dni?: number;
  especialidad: string = '';
  mail: string = '';
  edad?: number;
  load: boolean = false;
  usuario:any;
  usuarioLog: any;
  urlImagen: string = '/assets/especialistaDefault.jpg';


  constructor(public serv: UsuariosService) {

  }

  ngOnInit(): void {

    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.serv.traerUsuario(this.usuarioLog);

    }
  }

}
