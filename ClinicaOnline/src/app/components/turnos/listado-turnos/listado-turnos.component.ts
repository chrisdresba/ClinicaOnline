import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})

export class ListadoTurnosComponent implements OnInit {

  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<Turnos>();
  @Input() public listadoTurnos?: Turnos[];


  constructor(public serv: TurnosService) {
    this.serv.getTurnos().subscribe(turno => {
      this.listadoTurnos = turno;
    });
  }
  ngOnInit(): void {

  }


  eligeTurno(turno: Turnos) {
    this.turnoSeleccionado.emit(turno);
  }

}
