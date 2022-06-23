import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {
  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  turno: Turnos;
  estadoTurno:boolean =false;
  comentario:any;

  constructor(public serv: TurnosService) { 
    this.turno = new Turnos();
  }

  ngOnInit(): void {
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
    if (this.turno.estado == 'REALIZADO'||this.turno.estado == 'ACEPTADO'||this.turno.estado == 'RECHAZADO') {
      this.estadoTurno = true;
    } else {
      this.estadoTurno = false;
    }
  }

  cancelarTurno() {

    if(!this.comentario){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe ingresar un comentario!'
      })
    }else{
    this.turno.estado = 'CANCELADO';
    this.turno.resenia = this.comentario;
    this.serv.actualizarEstado(this.turno!);
    Swal.fire({
      icon: 'success',
      title: 'El turno fue cancelado',
      showConfirmButton: false,
      timer: 1500,
    });
  
    }
  }

}
