import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { Historia } from 'src/app/class/historia';
import { Paciente } from 'src/app/class/paciente';
import { Turnos } from 'src/app/class/turnos';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public listadoPacientes: Paciente[] = [];
  public listadoEsp: Especialista[] = [];
  especialistaSeleccionado?: Especialista;
  especialista?: Especialista;
  pacienteSeleccionado?: Paciente;
  paciente?: Paciente;
  historia: Historia[] = [];
  loadHistoria: boolean = false;
  usuario?: Paciente;
  nombre: string = '';
  apellido: string = '';
  dni?: number;
  especialidad?: string[] = [];
  listadoTurnos?: Turnos[] = [];
  listado:any [] = [];

  urlImagen: string = '/assets/especialistaDefault.jpg';
  estadoEsp?: boolean;


  constructor(public serv: UsuariosService, public service: TurnosService) {
    this.especialista = new Especialista();
  }

  ngOnInit(): void {
    this.serv.getPacientes().subscribe(paciente => {
      this.listadoPacientes = paciente;
    })
    this.serv.getEspecialistas().subscribe(esp => {
      this.listadoEsp = esp;
    })
  }

  getHistoria() {
    this.loadHistoria = true;
  }

  cerrarHistoria() {
    this.loadHistoria = false;
  }

  tomarEspecialistaParaDetalles(Nuevo: Especialista) {
    this.especialista = Nuevo;
    this.nombre = Nuevo.nombre;
    this.apellido = Nuevo.apellido;
    this.dni = Nuevo.dni;
    this.especialidad = Nuevo.especialidad;
    this.urlImagen = Nuevo.foto1;
    this.estadoEsp = Nuevo.estado;
  }

  async tomarPacienteParaDetalles(Nuevo: Paciente) {
    this.paciente = Nuevo;
    this.historia = await this.service.getHistoriaPaciente(this.paciente.id);
    this.getHistoria();
  }

  async tomarPacienteParaDescarga(Nuevo: Paciente) {
    this.paciente = Nuevo;
    this.listadoTurnos = await this.service.getTurnosPaciente(this.paciente.id);

    this.listadoTurnos.forEach(element=>{
      let obj = {
              'Fecha': element.fecha,
              'Hora': element.hora+':00 hs',
              'Paciente': element.pacienteNombre,
              'Especialista': element.especialistaNombre,
              'Especialidad': element.especialidad
      };
      this.listado.push(obj);
    })

    var ws = XLSX.utils.json_to_sheet(this.listado);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.paciente.mail);
    XLSX.writeFile(wb, this.paciente.mail+".xlsx");
  }

  habilitar() {
    this.especialista!.estado = true;
    this.serv.actualizarEspecialista(this.especialista!);
    this.estadoEsp = true;
  }

  inhabilitar() {
    this.especialista!.estado = false;
    this.serv.actualizarEspecialista(this.especialista!);
    this.estadoEsp = false;
  }

  descargarPacientes() {

    // Extract Data (create a workbook object from the table)
    var ws = XLSX.utils.json_to_sheet(this.listadoPacientes);
    // Process Data (add a new row)
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pacientes");
    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(wb, "Pacientes.xlsx");
  }

  descargarEspecialistas() {

    // Extract Data (create a workbook object from the table)
    var ws = XLSX.utils.json_to_sheet(this.listadoEsp);
    // Process Data (add a new row)
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(wb, "Especialistas.xlsx");
  }

}
