import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { TurnosService } from 'src/app/services/turnos.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';


@Component({
  selector: 'app-graficoespecialidad',
  templateUrl: './graficoespecialidad.component.html',
  styleUrls: ['./graficoespecialidad.component.scss']
})
export class GraficoespecialidadComponent implements OnInit {

  public listado: any[] = [];
  public especialidades: any[] = [];
  public especialidad:string[] = [];
  public valores: any[] = [];
  constructor(public servTurnos: TurnosService, public serv: EspecialidadesService) {
    setTimeout(() => {
      this.randomize();
    }, 3000)

  }
  ngOnInit(): void {
    this.serv.getEspecialidades().subscribe(aux => {
      this.especialidades = aux;
    });

    this.servTurnos.getTurnos().subscribe(turnos => {
      this.listado = turnos;
    });

    setTimeout(() => {

      this.especialidades.forEach(element => {
        let aux = 0;
        this.especialidad.push(element.nombre);
        this.listado.forEach(turno => {
          if (element.nombre == turno.especialidad) {
            aux++;
          }
        })
        this.valores.push({ data: [aux], label: element.nombre })
      })

    }, 3000)


  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [ 'hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny' ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map(_ => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push([ 'Line 1', 'Line 2', 'Line 3' ]);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  public randomize(){
    this.pieChartData.labels = this.especialidad;
    this.pieChartData.datasets = this.valores;
  }

  public descargarGrafico() {

    const element = document.querySelector("#box") as HTMLElement;

    if (!element) return

    html2canvas(element).then((canvas: any) => {
      var pdfFile = new jsPDF('l', 'px', "a4");
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdfFile.text('Ingresos en el sistema', 200, 20);
      pdfFile.addImage(imgData, 20, 100, canvas.width, canvas.height);
      pdfFile.save('InformeLogs.pdf');
    });

  }
}