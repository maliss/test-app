import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { SocketsService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { maxColumn, chartColor, datasetDefaultConfig, chartConfig } from './dashboard-chart.config';

interface IStatistic {
  gameId: string;
  name: string;
  viewCount: number[];
  boxArt: string;
  numberStreamers: number;
}

type StatisticsKeys = { [key: string]: IStatistic };

interface IGamedata {
  gameId: string;
  name: string;
  viewCount: number;
  boxArt: string;
  numberStreamers: number;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public myChart;
  public socketsService : SocketsService;
  private socketsServiceSub = Subscription.EMPTY;
  public statistics: StatisticsKeys = {};

  constructor(socketsService:SocketsService) {
    this.socketsService = socketsService;
    this.statistics = {};
  }

  ngOnDestroy() {
    this.socketsServiceSub.unsubscribe();
  }

  ngOnInit() {

    this.initChart();
    this.socketsServiceSub = this.socketsService.dataSub.subscribe((gameData: IGamedata) => {

      this.statistics[gameData.gameId] = {
        gameId: gameData.gameId,
        name: gameData.name,
        numberStreamers: gameData.numberStreamers,
        viewCount: this.statistics[gameData.gameId] ? [...this.statistics[gameData.gameId].viewCount, gameData.viewCount] : [gameData.viewCount],
        boxArt: gameData.boxArt.replace("{width}x{height}", "144x192")
      };

      this.addChartData(this.statistics[gameData.gameId]);
    });
  }

  private initChart = () => {
    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");

    this.myChart = new Chart(this.ctx, chartConfig);
  }

  private addChartData = (currentStatistic: IStatistic) => {
    const chart = this.myChart;

    if (chart.data.datasets.length === 0) {
      chart.data.datasets.push({
        ...datasetDefaultConfig,
        label: currentStatistic.name,
        data: currentStatistic.viewCount,
        gameId: currentStatistic.gameId
      });
    } else {
      const datasetIndex = chart.data.datasets.findIndex(data => data.gameId === currentStatistic.gameId);
      if(datasetIndex == -1)  {
        chart.data.datasets.push({
          ...datasetDefaultConfig,
          label: currentStatistic.name,
          data: currentStatistic.viewCount,
          gameId: currentStatistic.gameId,
          borderColor: chartColor[chart.data.datasets.length],     
          pointBackgroundColor: chartColor[chart.data.datasets.length],  
          pointHoverBackgroundColor: chartColor[chart.data.datasets.length]
        });
      } else {
        chart.data.datasets.forEach((dataset) => { 

          if(dataset.data.length === maxColumn) {
            dataset.data.shift();
          }
          
          dataset.data.push(this.statistics[dataset.gameId].viewCount[this.statistics[dataset.gameId].viewCount.length - 1]);

        })
      };
    }

    chart.update();
  }

}
