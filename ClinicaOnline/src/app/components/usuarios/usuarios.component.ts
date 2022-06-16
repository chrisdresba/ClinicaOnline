import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/class/especialista';
import { Paciente } from 'src/app/class/paciente';
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
  nombre: string = '';
  apellido: string = '';
  dni?: number;
  especialidad?: string[] = [];
  urlImagen: string = '/assets/especialistaDefault.jpg';
  estadoEsp?: boolean;


  constructor(public serv: UsuariosService) {
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

  tomarEspecialistaParaDetalles(Nuevo: Especialista) {
    this.especialista = Nuevo;
    this.nombre = Nuevo.nombre;
    this.apellido = Nuevo.apellido;
    this.dni = Nuevo.dni;
    this.especialidad = Nuevo.especialidad;
    this.urlImagen = Nuevo.foto1;
    this.estadoEsp = Nuevo.estado;
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
