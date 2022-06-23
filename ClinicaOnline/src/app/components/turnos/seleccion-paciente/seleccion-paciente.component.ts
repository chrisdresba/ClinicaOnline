import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Paciente } from 'src/app/class/paciente';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seleccion-paciente',
  templateUrl: './seleccion-paciente.component.html',
  styleUrls: ['./seleccion-paciente.component.scss']
})
export class SeleccionPacienteComponent implements OnInit {

  public listado : Paciente[] = [];
  @Output() onSeleccionPaciente : EventEmitter<Paciente> = new EventEmitter<Paciente>();


  constructor(public serv: UsuariosService) {
    this.serv.getPacientes().subscribe(pac => {
      this.listado = pac;
    });
   }

  ngOnInit(): void {
  }

  eligePaciente( pac : any ) {
    this.onSeleccionPaciente.emit( pac );
  }


}