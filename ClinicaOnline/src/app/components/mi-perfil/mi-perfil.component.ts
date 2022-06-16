import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Horarios } from 'src/app/class/horarios';
import { HorariosEspecialistasService } from 'src/app/services/horarios-especialistas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


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
  loadAtencion: boolean = false;
  usuario: any;
  usuarioLog: any;
  urlImagen: string = '/assets/especialistaDefault.jpg';
  horaDesde: string = '';
  horaHasta: string = '';
  dias: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  horarioDesde: string[] = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
  horarioHasta: string[] = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  horarioDesdeSab: string[] = ['8', '9', '10', '11', '12', '13'];
  horarioHastaSab: string[] = ['9', '10', '11', '12', '13', '14'];
  dia: string = '';
  objHorario: Horarios;
  diaSabado: boolean = false;
  mostrarHorario: boolean = false;

  constructor(public serv: UsuariosService, public servHorario: HorariosEspecialistasService) {
    this.objHorario = new Horarios();
  }

  ngOnInit(): void {

    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.serv.traerUsuario(this.usuarioLog);
    }
  }

  configuracion() {
    this.loadAtencion = true;
  }

  cerrarConfiguracion() {
    this.loadAtencion = false;
  }

  guardarHorario() {
    let inicio = parseInt(this.horaDesde); 
    let fin = parseInt(this.horaHasta); 
    if (!this.especialidad ||
      !this.dia ||
      !this.horaDesde ||
      !this.horaHasta) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los datos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {

      if (inicio >= fin) {
        Swal.fire({
          icon: 'warning',
          title: 'Corrobore el horario de atención',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.objHorario.iniciarHorario(this.especialidad, this.usuario.mail, this.dia, this.horaDesde, this.horaHasta);
        this.servHorario.saveHorario(this.objHorario);
        Swal.fire({
          icon: 'success',
          title: 'La configuración se realizo con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.limpiarForm();
        this.cerrarConfiguracion();
      }
    }
  }

  limpiarForm(){
    this.dia='';
    this.especialidad='';
    this.horaDesde='';
    this.horaHasta='';
  }

}
