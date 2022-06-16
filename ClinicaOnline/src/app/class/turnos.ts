import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turnos {
    id:string = '';
    fecha:string = '';
    hora:string = '';
    paciente:any;
    especialista:any;
    especialidad:string = '';
    estado: string = '';
    encuesta:any;
    resenia:string = '';
    comentarioPaciente:string = '';
    diagnosticoPaciente:string = '';


    iniciarTurnos(fecha:string,hora:string,paciente:any,especialista:any,especialidad:string){
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente;
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.estado = 'PENDIENTE';
    }
}

