import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UIChart } from 'primeng/chart';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from 'src/app/modules/main/app.main.component';
import { AppBreadcrumbService } from 'src/app/modules/main/breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    cities: SelectItem[];

    ordersChart: any;

    ordersOptions: any;

    selectedCity: any;

    timelineEvents: any[];

    overviewChartData1: any;

    overviewChartData2: any;

    overviewChartData3: any;

    overviewChartData4: any;

    overviewChartOptions1: any;

    overviewChartOptions2: any;

    overviewChartOptions3: any;

    overviewChartOptions4: any;

    chatMessages: any[];

    chatEmojis: any[];

    chartMonthlyData: any;

    chartMonthlyOptions: any;

    doughnutData: any;

    doughnutOptions: any;

    storeATotalValue = 100;

    storeADiff = 0;

    storeAStatus = 0;

    storeAData: any;

    storeAOptions: any;

    storeBTotalValue = 120;

    storeBDiff = 0;

    storeBStatus = 0;

    storeBData: any;

    storeBOptions: any;

    storeCTotalValue = 150;

    storeCDiff = 0;

    storeCStatus = 0;

    storeCData: any;

    storeCOptions: any;

    storeDTotalValue = 80;

    storeDDiff = 0;

    storeDStatus = 0;

    storeDData: any;

    storeDOptions: any;

    storeInterval: any;

    pieData: any;

    pieOptions: any;

    mainData: any;

    events: any[];

    @ViewChild('doughnut') doughnutViewChild: UIChart;

    @ViewChild('bar') chartViewChild: UIChart;

    @ViewChild('storeA') storeAViewChild: UIChart;

    @ViewChild('storeB') storeBViewChild: UIChart;

    @ViewChild('storeC') storeCViewChild: UIChart;

    @ViewChild('storeD') storeDViewChild: UIChart;

    @ViewChild('pie') pieViewChild: UIChart;

    @ViewChild('chatcontainer') chatContainerViewChild: ElementRef;

    constructor(public app: AppComponent, public appMain: AppMainComponent,
                private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: ['/'] }
        ]);
    }

    ngOnInit() {

        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        this.ordersChart = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [{
                label: 'Novos Pedidos',
                data: [31, 83, 69, 29, 62, 25, 59, 26, 46],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }, {
                label: 'Pedidos Completos',
                data: [67, 98, 27, 88, 38, 3, 22, 60, 56],
                borderColor: [
                    '#3F51B5',
                ],
                backgroundColor: [
                    'rgba(63, 81, 181, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }]
        };

        this.ordersOptions = this.getOrdersOptions();

        this.overviewChartData1 = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [
                {
                    data: [50, 64, 32, 24, 18, 27, 20, 36, 30],
                    borderColor: [
                        '#4DD0E1',
                    ],
                    backgroundColor: [
                        'rgba(77, 208, 225, 0.8)',
                    ],
                    borderWidth: 2,
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.overviewChartData2 = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [
                {
                    data: [11, 30, 52, 35, 39, 20, 14, 18, 29],
                    borderColor: [
                        '#4DD0E1',
                    ],
                    backgroundColor: [
                        'rgba(77, 208, 225, 0.8)',
                    ],
                    borderWidth: 2,
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.overviewChartData3 = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [
                {
                    data: [20, 29, 39, 36, 45, 24, 28, 20, 15],
                    borderColor: [
                        '#4DD0E1',
                    ],
                    backgroundColor: [
                        'rgba(77, 208, 225, 0.8)',
                    ],
                    borderWidth: 2,
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.overviewChartData4 = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [
                {
                    data: [30, 39, 50, 21, 33, 18, 10, 24, 20],
                    borderColor: [
                        '#4DD0E1',
                    ],
                    backgroundColor: [
                        'rgba(77, 208, 225, 0.8)',
                    ],
                    borderWidth: 2,
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.overviewChartOptions1 = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.overviewChartOptions2 = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.overviewChartOptions3 = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.overviewChartOptions4 = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.setOverviewColors();

        this.appMain['refreshChart'] = () => {
            this.ordersOptions = this.getOrdersOptions();
            this.setOverviewColors();
        };

        this.timelineEvents = [
            { status: 'Pedidos', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#E91E63', description: 'Richard Jones (C8012) pediu um camisa azul por R$ 79.' },
            { status: 'Processando', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#FB8C00', description: 'Pedido #99207 foi processado com sucesso.' },
            { status: 'Enviados', date: '15/10/2020 16:15', icon: 'pi pi-compass', color: '#673AB7', description: 'Pedido #99207 foi enviado com o código 2222302090.' },
            { status: 'Entregados', date: '16/10/2020 10:00', icon: 'pi pi-check-square', color: '#0097A7', description: 'Richard Jones (C8012) recebeu o sua camisa azul.' }
        ];

        this.chartMonthlyData = this.getChartData();
        this.chartMonthlyOptions = this.getChartOptions();

        this.doughnutData = this.getDoughnutData();
        this.doughnutOptions = this.getDoughnutOptions();

        this.pieData = this.getPieData();
        this.pieOptions = this.getPieOptions();

        this.appMain['refreshChart'] = () => {
            this.chartMonthlyData = this.getChartData();
            this.chartMonthlyOptions = this.getChartOptions();
            this.doughnutData = this.getDoughnutData();
            this.doughnutOptions = this.getDoughnutOptions();
            this.pieData = this.getPieData();
            this.pieOptions = this.getPieOptions();
        };

        this.storeAData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [{
                data: [55, 3, 45, 6, 44, 58, 84, 68, 64],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
            ]
        };

        this.storeBData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [{
                data: [81, 75, 63, 100, 69, 79, 38, 37, 76],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
            ]
        };

        this.storeCData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [{
                data: [99, 55, 22, 72, 24, 79, 35, 91, 48],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
            ]
        };

        this.storeDData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
            datasets: [{
                data: [5, 51, 68, 82, 28, 21, 29, 45, 44],
                borderColor: [
                    '#4DD0E1',
                ],
                backgroundColor: [
                    'rgba(77, 208, 225, 0.8)',
                ],
                borderWidth: 2,
                fill: true,
                tension: .4
            }
            ]
        };

        this.storeAOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            aspectRatio: 4,
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.storeBOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            aspectRatio: 4,
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.storeCOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            aspectRatio: 4,
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        this.storeDOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            responsive: true,
            aspectRatio: 4,
            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            },
            tooltips: {
                enabled: false
            },
            elements: {
                point: {
                    radius: 0
                }
            },
        };

        const calculateStore = (storeData, totalValue) => {
            let randomNumber = +((Math.random() * 500).toFixed(2));
            let data = [...storeData.datasets[0].data];
            let length = data.length;
            data.push(randomNumber);
            data.shift();
            storeData.datasets[0].data = data;

            let diff = +((data[length - 1] - data[length - 2]).toFixed(2));
            let status = diff === 0 ? 0 : (diff > 0 ? 1 : -1);
            totalValue = +((totalValue + diff).toFixed(2));

            return { diff, totalValue, status };
        };

        this.storeInterval = setInterval(() => {
            requestAnimationFrame(() => {
                const { diff: storeADiff, totalValue: storeATotalValue, status: storeAStatus } =
                    calculateStore(this.storeAData, this.storeATotalValue);
                this.storeADiff = storeADiff;
                this.storeATotalValue = storeATotalValue;
                this.storeAStatus = storeAStatus;
                this.storeAViewChild.refresh();

                const { diff: storeBDiff, totalValue: storeBTotalValue, status: storeBStatus } =
                    calculateStore(this.storeBData, this.storeBTotalValue);
                this.storeBDiff = storeBDiff;
                this.storeBTotalValue = storeBTotalValue;
                this.storeBStatus = storeBStatus;
                this.storeBViewChild.refresh();

                const { diff: storeCDiff, totalValue: storeCTotalValue, status: storeCStatus } =
                    calculateStore(this.storeCData, this.storeCTotalValue);
                this.storeCDiff = storeCDiff;
                this.storeCTotalValue = storeCTotalValue;
                this.storeCStatus = storeCStatus;
                this.storeCViewChild.refresh();

                const { diff: storeDDiff, totalValue: storeDTotalValue, status: storeDStatus } =
                    calculateStore(this.storeDData, this.storeDTotalValue);
                this.storeDDiff = storeDDiff;
                this.storeDTotalValue = storeDTotalValue;
                this.storeDStatus = storeDStatus;
                this.storeDViewChild.refresh();
            });
        }, 2000);
    }

    ngOnDestroy() {
        if (this.storeInterval) {
            clearInterval(this.storeInterval);
        }
    }

    onEmojiClick(chatInput, emoji) {
        if (chatInput) {
            chatInput.value += emoji;
            chatInput.focus();
        }
    }

    onChatKeydown(event) {
        if (event.key === 'Enter') {
            const message = event.currentTarget.value;
            const lastMessage = this.chatMessages[this.chatMessages.length - 1];

            if (lastMessage.from) {
                this.chatMessages.push({ messages: [message] });
            }
            else {
                lastMessage.messages.push(message);
            }

            if (message.match(/primeng|primereact|primefaces|primevue/i)) {
                this.chatMessages.push({ from: 'Ioni Bowcher', url: 'assets/demo/images/avatar/ionibowcher.png', messages: ['Always bet on Prime!'] });
            }

            event.currentTarget.value = '';

            const el = this.chatContainerViewChild.nativeElement;
            setTimeout(() => {
                el.scroll({
                    top: el.scrollHeight,
                    behavior: 'smooth'
                });
            }, 1);
        }
    }

    setOverviewColors() {
        const { pinkBorderColor, pinkBgColor, tealBorderColor, tealBgColor } = this.getOverviewColors();

        this.overviewChartData1.datasets[0].borderColor[0] = tealBorderColor;
        this.overviewChartData1.datasets[0].backgroundColor[0] = tealBgColor;

        this.overviewChartData2.datasets[0].borderColor[0] = tealBorderColor;
        this.overviewChartData2.datasets[0].backgroundColor[0] = tealBgColor;

        this.overviewChartData3.datasets[0].borderColor[0] = pinkBorderColor;
        this.overviewChartData3.datasets[0].backgroundColor[0] = pinkBgColor;

        this.overviewChartData4.datasets[0].borderColor[0] = tealBorderColor;
        this.overviewChartData4.datasets[0].backgroundColor[0] = tealBgColor;
    }

    getOverviewColors() {
        const isLight = this.app.layoutMode === 'light';
        return {
            pinkBorderColor: isLight ? '#E91E63' : '#EC407A',
            pinkBgColor: isLight ? '#F48FB1' : '#F8BBD0',
            tealBorderColor: isLight ? '#009688' : '#26A69A',
            tealBgColor: isLight ? '#80CBC4' : '#B2DFDB'
        };
    }

    getOrdersOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
        const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
        return {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontFamily,
                        color: textColor,
                    }
                }
            },
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        fontFamily,
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                },
                x: {
                    ticks: {
                        fontFamily,
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                }
            }
        };
    }

    getColors() {
        const isLight = this.app.layoutMode === 'light';
        return {
            pinkColor: isLight ? '#EC407A' : '#F48FB1',
            purpleColor: isLight ? '#AB47BC' : '#CE93D8',
            deeppurpleColor: isLight ? '#7E57C2' : '#B39DDB',
            indigoColor: isLight ? '#5C6BC0' : '#9FA8DA',
            blueColor: isLight ? '#42A5F5' : '#90CAF9',
            lightblueColor: isLight ? '#29B6F6' : '#81D4FA',
            cyanColor: isLight ? '#00ACC1' : '#4DD0E1',
            tealColor: isLight ? '#26A69A' : '#80CBC4',
            greenColor: isLight ? '#66BB6A' : '#A5D6A7',
            lightgreenColor: isLight ? '#9CCC65' : '#C5E1A5',
            limeColor: isLight ? '#D4E157' : '#E6EE9C',
            yellowColor: isLight ? '#FFEE58' : '#FFF59D',
            amberColor: isLight ? '#FFCA28' : '#FFE082',
            orangeColor: isLight ? '#FFA726' : '#FFCC80',
            deeporangeColor: isLight ? '#FF7043' : '#FFAB91',
            brownColor: isLight ? '#8D6E63' : '#BCAAA4'
        };
    }

    getPieData() {
        const { limeColor, blueColor, tealColor } = this.getColors();
        const borderColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
        return {
            labels: ['O', 'D', 'R'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        blueColor,
                        tealColor,
                        limeColor
                    ],
                    borderColor
                }
            ]
        };
    }

    getPieOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
        return {
            responsive: true,
            aspectRatio: 1,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        fontFamily,
                        color: textColor
                    }
                },
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            cutout: '0',
        };
    }

    getChartData() {
        const { limeColor, amberColor, orangeColor, blueColor, lightblueColor,
            cyanColor, tealColor, greenColor, lightgreenColor } = this.getColors();

        return {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
            datasets: [
                {
                    label: '2012',
                    data: [6, 25, 97, 12, 7, 70, 42],
                    borderColor: blueColor,
                    backgroundColor: blueColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2013',
                    data: [81, 3, 5, 11, 59, 47, 99],
                    borderColor: lightblueColor,
                    backgroundColor: lightblueColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2014',
                    data: [68, 47, 46, 46, 61, 70, 94],
                    borderColor: cyanColor,
                    backgroundColor: cyanColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2015',
                    data: [31, 9, 18, 76, 6, 11, 79],
                    borderColor: tealColor,
                    backgroundColor: tealColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2016',
                    data: [85, 37, 47, 29, 2, 10, 54],
                    borderColor: greenColor,
                    backgroundColor: greenColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2017',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    borderColor: lightgreenColor,
                    backgroundColor: lightgreenColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2018',
                    data: [89, 18, 95, 18, 97, 61, 54],
                    borderColor: limeColor,
                    backgroundColor: limeColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2019',
                    data: [18, 36, 39, 58, 41, 50, 72],
                    borderColor: amberColor,
                    backgroundColor: amberColor,
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: '2020',
                    data: [31, 4, 35, 74, 47, 35, 46],
                    borderColor: orangeColor,
                    backgroundColor: orangeColor,
                    borderWidth: 2,
                    fill: true
                }
            ]
        };
    }

    getChartOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const gridLinesColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';
        const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
        return {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontFamily,
                        color: textColor
                    }
                },
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        fontFamily,
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                },
                x: {
                    categoryPercentage: .9,
                    barPercentage: .8,
                    ticks: {
                        fontFamily,
                        color: textColor
                    },
                    grid: {
                        color: gridLinesColor
                    }
                }
            },
        };
    }

    getDoughnutData() {
        const { blueColor, lightblueColor, cyanColor, tealColor, greenColor,
            lightgreenColor, orangeColor } = this.getColors();
        const borderColor = getComputedStyle(document.body).getPropertyValue('--divider-color') || 'rgba(160, 167, 181, .3)';

        return {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [
                {
                    data: [11, 29, 71, 33, 28, 95, 6],
                    backgroundColor: [blueColor, lightblueColor, cyanColor, tealColor, greenColor, lightgreenColor, orangeColor],
                    borderColor
                }
            ]
        };
    }

    getDoughnutOptions() {
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color') || 'rgba(0, 0, 0, 0.87)';
        const fontFamily = getComputedStyle(document.body).getPropertyValue('--font-family');
        return {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        fontFamily,
                        color: textColor
                    }
                },
            },
            circumference: 180,
            rotation: -90,
            animation: {
                animateScale: true,
                animateRotate: true
            }
        };
    }

    changeMonthlyDataView() {
        if (this.chartViewChild.chart.options.scales.x.stacked) {
            this.chartViewChild.chart.options.scales.x.stacked = false;
            this.chartViewChild.chart.options.scales.y.stacked = false;
        }
        else {
            this.chartViewChild.chart.options.scales.x.stacked = true;
            this.chartViewChild.chart.options.scales.y.stacked = true;
        }

        this.chartViewChild.chart.update();
    }

    changeDoughnutDataView() {
        if (this.doughnutViewChild.chart.options.circumference === 180) {
            this.doughnutViewChild.chart.options.circumference = 360;
            this.doughnutViewChild.chart.options.rotation = -45;
        } else {
            this.doughnutViewChild.chart.options.circumference = 180;
            this.doughnutViewChild.chart.options.rotation = -90;
        }

        this.doughnutViewChild.chart.update();
    }

    togglePieDoughnut() {
        this.pieViewChild.chart.options.cutout = this.pieViewChild.chart.options.cutout !== '0' ? '0' : '50%';
        this.pieViewChild.chart.update();
    }

    changePieDoughnutDataView() {
        if (this.pieViewChild.chart.options.circumference === 180) {
            this.pieViewChild.chart.options.circumference = 360;
            this.pieViewChild.chart.options.rotation = -45;
        } else {
            this.pieViewChild.chart.options.circumference = 180;
            this.pieViewChild.chart.options.rotation = -90;
        }

        this.pieViewChild.chart.update();
    }
}
