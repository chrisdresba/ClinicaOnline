import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { TurnosService } from 'src/app/services/turnos.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  public listado: any[] = [];
  public rango: string[] = [];
  public valores: any[] = [];

  constructor(public servTurnos: TurnosService, public firebase: FirebaseService) {
    setTimeout(()=>{ 
      this.randomize(); 
    },4000)

  }

  ngOnInit(): void {
    this.firebase.getLogs().subscribe(logs => {
      this.listado = logs;
    });

    var res = new Date();
    this.rango = [(res.getDate()-3)+ "/" + (res.getMonth() + 1) + "/" + res.getFullYear(),
    (res.getDate()-2) + "/" + (res.getMonth() + 1) + "/" + res.getFullYear(),
    (res.getDate()-1) + "/" + (res.getMonth() + 1) + "/" + res.getFullYear(),
    res.getDate() + "/" + (res.getMonth() + 1) + "/" + res.getFullYear()]
  
    setTimeout(()=>{ 
      let cuatro = 0;
      let tres = 0;
      let dos = 0;
      let uno = 0;
      this.listado.forEach(element =>{
        switch(element.fechaIngreso){
          case this.rango[0]:
            cuatro++;
          break;
          case this.rango[1]:
            tres++;
          break;
          case this.rango[2]:
            dos++;
          break;
          case this.rango[3]:
            uno++;
          break; 
        }
  
      })
       this.valores = [cuatro,tres,dos,uno];
      },2000)
    
  }


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };



  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.rango,
    datasets: [
      { data: this.valores, label: 'Ingresos' }
    
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {

    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //  console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.labels = this.rango;
    this.barChartData.datasets[0].data = this.valores;
    this.chart?.update();
  }

  public descargarGrafico(){

     const element = document.querySelector("#box") as HTMLElement;
 
     if( !element ) return
 
     html2canvas( element ).then((canvas : any) => {
       var pdfFile = new jsPDF('l', 'px', "a4");
       var imgData  = canvas.toDataURL("image/jpeg", 1.0);
       pdfFile.text('Ingresos en el sistema',200,20);
       pdfFile.addImage(imgData,20,100,canvas.width, canvas.height);
       pdfFile.save('InformeLogs.pdf');
     });
      
   }
    
  }
