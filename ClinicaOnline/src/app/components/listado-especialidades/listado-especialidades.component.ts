import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Especialidades } from 'src/app/class/especialidades';
import { EspecialidadesService } from 'src/app/services/especialidades.service';


@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.scss']
})
export class ListadoEspecialidadesComponent implements OnInit {

  public listadoEspecialidades : Especialidades[] = [];
  @Output() onSeleccionEspecialidad : EventEmitter<Especialidades> = new EventEmitter<Especialidades>();


  constructor(public serv: EspecialidadesService) {
    this.serv.getEspecialidades().subscribe(esp => {
      this.listadoEspecialidades = esp;
    });
   }

  ngOnInit(): void {
  }

  eligeEspecialidad ( esp : any ) {
    this.onSeleccionEspecialidad.emit( esp );
  }


}