import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Historia } from 'src/app/class/historia';
import { Paciente } from 'src/app/class/paciente';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<Turnos>();
  @Input() public listadoTurnos?: Turnos[];
  public listado: Turnos[] = [];
  public pacientes: Paciente[] = [];
  public paciente: Paciente;
  public filtro: any[] = [];
  public pacientesFiltro: Paciente[] = [];
  public usuarioLog: any;
  public usuario: any;
  public estadoPaciente: boolean = false;
  public turnosPaciente: Turnos[] = [];
  public historiaPaciente: Historia[] = [];

  constructor(public serv: TurnosService, public servUser: UsuariosService, public service: TurnosService) {
    this.paciente = new Paciente();
  }

  async ngOnInit() {
    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.servUser.traerUsuario(this.usuarioLog);
    }

    this.servUser.getPacientes().subscribe(paciente => {
      this.pacientes = paciente;
    })

    this.listadoTurnos = await this.serv.getTurnosEspecialistaPac(this.usuario.id);

    this.listadoTurnos.forEach(element => {

      if (element.estado == 'REALIZADO') {
        this.pacientes.forEach(item => {
          if (element.paciente == item.id) {
            this.filtro.push(item);
          }
        })
      }

    })

    this.pacientesFiltro = this.filtro.filter((item, index) => {
      return this.filtro.indexOf(item) === index;
    })


  }


  async eligePaciente(pac :any){
    this.paciente = pac;
    this.turnosPaciente = await this.serv.getTurnosPaciente(this.paciente.id);
    this.historiaPaciente = await this.serv.getHistoriaPaciente(this.paciente.id);
    this.estadoPaciente = true;
  }

  eligeTurno(turno: Turnos) {
    this.turnoSeleccionado.emit(turno);
  }
}
