import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { TurnosService } from 'src/app/services/turnos.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-graficodiario',
  templateUrl: './graficodiario.component.html',
  styleUrls: ['./graficodiario.component.scss']
})
export class GraficodiarioComponent implements OnInit{

  constructor(public servTurnos:TurnosService,public firebase:FirebaseService){

  }
  ngOnInit(): void {}

 
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
    labels: [ 'Mayo', 'Junio', 'Julio' ],
    datasets: [
      { data: [ 65, 59, 80 ], label: 'Pacientes' },
      { data: [ 28, 48, 40 ], label: 'Especialistas' },
      { data: [ 28, 48, 40 ], label: 'Administrador' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
   // console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.chart?.update();
  }
}