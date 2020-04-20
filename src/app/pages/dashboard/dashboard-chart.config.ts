export const maxColumn: number = 10;

export const chartColor: string[] = ["#ec250d", "#1d8cf8", "#00f2c3"];

const chartLabels = new Array(maxColumn).fill("•");

const gradientChartOptionsConfigurationWithTooltipRed: any = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    labels: {
      fontColor: '#ffffff',
      padding: 20
    }
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 0,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    footerSpacing: 0,
    footerFontSize: 0,
    yPadding: 11,
    callbacks: {
      title: (tooltipItem, data) => {
          return 'Number of views';
      }
  }
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a"
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(233,32,16,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a"
      }
    }]
  }
};

export const datasetDefaultConfig = {
  data: [],
  fill: true,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
  borderColor: chartColor[0],     
  pointBackgroundColor: chartColor[0],  
  pointHoverBackgroundColor: chartColor[0]
}

export const chartConfig = {
  type: 'line',
  data: {
    labels: chartLabels,
    datasets: []
  },
  options: gradientChartOptionsConfigurationWithTooltipRed
};