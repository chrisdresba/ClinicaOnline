import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Administrador } from 'src/app/class/administrador';
import { Especialidades } from 'src/app/class/especialidades';
import { Especialista } from 'src/app/class/especialista';
import { Horarios } from 'src/app/class/horarios';
import { Paciente } from 'src/app/class/paciente';
import { Turnos } from 'src/app/class/turnos';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosEspecialistasService } from 'src/app/services/horarios-especialistas.service';
import { StorageService } from 'src/app/services/storage.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitar-turnos',
  templateUrl: './solicitar-turnos.component.html',
  styleUrls: ['./solicitar-turnos.component.scss']
})
export class SolicitarTurnosComponent implements OnInit {

  public especialidades: Especialidades[] = [];
  public especialistas: Especialista[] = [];
  public especialistasFilter: Especialista[] = [];
  public horarios: Horarios[] = [];
  public horariosFilter: Horarios[] = [];
  public turno: Turnos;
  auxEs: boolean = false;
  auxEsp: boolean = false;
  auxHor: boolean = false;
  usuario: any;
  usuarioLog: any;
  especialidad: string = '';
  especialista: any;
  especialistaSeleccionado: any[] = [];
  pacienteSeleccionado: any[] = [];
  dias: string[] = [];
  dia: string = '';
  horario: number[] = [];
  horaDesde?: number;
  horaHasta?: number;
  diaSeleccionado: string = '';
  horaSeleccionada: string = '';

  constructor(public serv: UsuariosService,public servTurno:TurnosService, public servEsp: EspecialidadesService, public servHor: HorariosEspecialistasService) {
    this.turno = new Turnos();
  }

  ngOnInit(): void {
    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.serv.traerUsuario(this.usuarioLog);
    }

    this.pacienteSeleccionado.push(this.usuario.id);
    this.pacienteSeleccionado.push(this.usuario.nombre + ' ' + this.usuario.apellido);

    this.servEsp.getEspecialidades().subscribe(esp => {
      this.especialidades = esp;
    })

    this.serv.getEspecialistas().subscribe(esp => {
      this.especialistas = esp;
    })

    this.servHor.getHorarios().subscribe(hora => {
      this.horarios = hora;
    })
  }



  cargarTurno() {
    try {

      if (
        !this.diaSeleccionado ||
        !this.horaSeleccionada
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Debe elegir una fecha y horario',
          showConfirmButton: false,
          timer: 1500,
        });

      } else {

        this.turno.iniciarTurnos(this.diaSeleccionado, this.horaSeleccionada, this.pacienteSeleccionado, this.especialistaSeleccionado, this.especialidad);
        this.servTurno.saveTurno(this.turno);
        Swal.fire({
          icon: 'success',
          title: 'La turno fue creado con exito',
          showConfirmButton: false,
          timer: 1500,
        });

      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })

    }

  }


  eligeEspecialidad(esp: Especialidades) {
    this.especialidad = esp.nombre;
    this.especialistas?.forEach(element => {
      element.especialidad?.forEach(item => {
        if (item == this.especialidad) {
          this.especialistasFilter.push(element);
        }
      })
    })
    this.auxEs = true;
    this.auxEsp = true;
  }

  eligeEspecialista(esp: Especialista) {
    this.especialista = {
      'nombre': esp.nombre + ' ' + esp.apellido,
      'mail': esp.mail
    };
    this.especialistaSeleccionado.push(esp.id);
    this.especialistaSeleccionado.push(esp.nombre + ' ' + esp.apellido);

    this.horarios?.forEach(element => {
      if (element.especialista == this.especialista.mail && element.especialidad == this.especialidad) {
        this.horaDesde = parseInt(element.horaDesde);
        this.horaHasta = parseInt(element.horaHasta);
        this.dia = element.dia;
        this.horariosFilter.push(element);
      }
    })
    this.auxEsp = false;
    this.auxHor = true;

    for (let index = this?.horaDesde; index! < this.horaHasta!; index!++) {
      this.horario.push(index!);
    }

    this.diasDisponibles();
  }


  diasDisponibles() {
    let dia = 0;
    switch (this.dia) {
      case 'lunes': dia = 1;
        break;
      case 'martes': dia = 2;
        break;
      case 'miercoles': dia = 3;
        break;
      case 'jueves': dia = 4;
        break;
      case 'viernes': dia = 5;
        break;
      case 'sabado': dia = 6;
        break;
    }

    let res = new Date();
    let diaActual = res.getDay()

    if (diaActual >= dia) {
      let fecha = this.agregarDias(res, (diaActual - dia));
      this.dias.push(fecha);
      let fecha2 = this.agregarDias(res, (diaActual - dia) + 7);
      this.dias.push(fecha2);
    } else {
      let aux = diaActual + 7;
      let fecha = this.agregarDias(res, (aux - dia));
      this.dias.push(fecha);
      let fecha2 = this.agregarDias(res, (aux - dia) + 7);
      this.dias.push(fecha2);
    }

  }

  eligeHorario(hora: any) {
    this.horaSeleccionada = hora;
  }

  eligeDia(dia: any) {
    this.diaSeleccionado = dia;
  }


  agregarDias(date: any, days: any) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    let formato = res.getDate() + "/" + (res.getMonth() + 1) + "/" + res.getFullYear();
    return formato;
  }



}
