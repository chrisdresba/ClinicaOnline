import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Historia } from 'src/app/class/historia';
import { Horarios } from 'src/app/class/horarios';
import { Turnos } from 'src/app/class/turnos';
import { GenerarPDFService } from 'src/app/services/generar-pdf.service';
import { HorariosEspecialistasService } from 'src/app/services/horarios-especialistas.service';
import { TurnosService } from 'src/app/services/turnos.service';
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
  loadHistoria: boolean = false;
  usuario: any;
  usuarioLog: any;
  urlImagen: string = '/assets/especialistaDefault.jpg';
  horaDesde: string = '';
  horaHasta: string = '';
  historia:Historia[] = [];
  turnos:Turnos[] = [];
  dias: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  horarioDesde: string[] = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
  horarioHasta: string[] = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  horarioDesdeSab: string[] = ['8', '9', '10', '11', '12', '13'];
  horarioHastaSab: string[] = ['9', '10', '11', '12', '13', '14'];
  dia: string = '';
  objHorario: Horarios;
  diaSabado: boolean = false;
  mostrarHorario: boolean = false;

  constructor(public serv: UsuariosService,public pdfService:GenerarPDFService, public servHorario: HorariosEspecialistasService,public service:TurnosService) {
    this.objHorario = new Horarios();

  }

  async ngOnInit(){

    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.serv.traerUsuario(this.usuarioLog);
    }
    if(this.usuario.paciente){
      this.historia = await this.service.getHistoriaPaciente(this.usuario.id);
    }
  
    if(this.usuario.especialista){
      this.turnos = await this.service.getTurnosEspecialista(this.usuario.id);
    }
  }

  configuracion() {
    this.loadAtencion = true;
  }

  getHistoria() {
    this.loadHistoria = true;
  }

  cerrarHistoria() {
    this.loadHistoria = false;
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

  async guardarHistoria(){
    const nombre = this.usuario.nombre + " " + this.usuario.apellido;
    const nombreDoc = this.usuario.mail + ".pdf";
    this.pdfService.crearPDFHistoria( nombreDoc,nombre, this.historia );
    return
  }

  async guardarTurnos(){
    const nombre = this.usuario.nombre + " " + this.usuario.apellido;
    const nombreDoc = this.usuario.mail + ".pdf";
    this.pdfService.crearPDFTurnos( nombreDoc,nombre, this.turnos );
    return
  }


  limpiarForm(){
    this.dia='';
    this.especialidad='';
    this.horaDesde='';
    this.horaHasta='';
  }

}
