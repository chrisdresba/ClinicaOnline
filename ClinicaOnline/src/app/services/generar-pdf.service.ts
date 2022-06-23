import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class GenerarPDFService {

  constructor() { }

  crearPDFHistoria ( nombrePDF : string,nombre:string, data : any[] ) {
    const doc = new jsPDF( 'portrait', 'px', 'a4' );
    const image = new Image();
    image.src = "/assets/logo.png";
    doc.text( "HISTORIA CLINICA: "+nombre,140,70);
    const fecha = (new Date()).toLocaleString();
    doc.addImage( image, 'PNG', 10, 10, 60, 60 );
    doc.text( "Fecha Emisión: " + fecha, 240, 20 );

    let posicion = 120;

    data.forEach(element=>{
      doc.text("Fecha: " + element.fecha, 35, posicion+=15);
      doc.text("Altura: " + element.altura +" cm", 35, posicion+=15);
      doc.text("Peso: " + element.peso + " Kg", 35, posicion+=15);
      doc.text("Presion: " + element.presion, 35, posicion+=15);
      doc.text("Temperatura: " + element.temperatura+"°C", 35, posicion+=15);
      if (element.clave != '') {
        doc.text(element.clave + ": "+ element.valor, 35, posicion+=15);
      }
      if (element.clave1 != '') {
        doc.text(element.clave1 + ": "+ element.valor1, 35, posicion+=15);
      }
      if (element.clave2 != '') {
        doc.text(element.clave2 + ": "+ element.valor2, 35, posicion+=15);
      }
      posicion+=30;      

    })
    doc.save( nombrePDF );
  }

  crearPDFTurnos ( nombrePDF : string,nombre:string, data : any[] ) {
    const doc = new jsPDF( 'portrait', 'px', 'a4' );
    const image = new Image();
    image.src = "/assets/logo.png";
    doc.text( "TURNOS: ESPECIALISTA "+nombre,140,70);
    const fecha = (new Date()).toLocaleString();
    doc.addImage( image, 'PNG', 10, 10, 60, 60 );
    doc.text( "Fecha Emisión: " + fecha, 240, 20 );
    let posicion = 120;

    data.forEach(element=>{

      if(element.estado == 'REALIZADO'){
      doc.text("Fecha: " + element.fecha, 35, posicion+=15);
      doc.text("Hora: " + element.hora +":00 hs", 35, posicion+=15);
      doc.text("Especialidad: " + element.especialidad, 35, posicion+=15);
      doc.text("Paciente: " + element.pacienteNombre, 35, posicion+=15);
      doc.text("Estado de turno: " + element.estado, 35, posicion+=15);
      posicion+=30;  
      }    

    })
    doc.save( nombrePDF );
  }

  
}