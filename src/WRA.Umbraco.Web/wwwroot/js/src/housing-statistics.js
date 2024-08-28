import './components/table-hover.js';

const regionSelect = document.querySelector('.js-region-select');
const countySelect = document.querySelector('.js-county-select');
const housingStats = document.querySelector('.js-housing-stats');
const housingStatsHeading = document.querySelector('.js-housing-stats__heading');
const housingStatsToggles = document.querySelectorAll('.js-housing-stats__toggle');
const homeSalesTable = document.querySelector('.js-home-sales-table');
const medianPriceTable = document.querySelector('.js-median-price-table');
const loader = document.querySelector('.js-results-loader');

const months = [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('en', { month: 'long' }));
const quarters = [1, 2, 3, 4];
let counties = [];
let years = [];
let showQuarters = false;

let data = [];
let tableData = [];
const chartData = {
    d: {
        locationName: '',
        years: [],
        medianPrice: {
            cols: [],
            rows: []
        },
        soldCount: {
            cols: [],
            rows: []
        },
        medianPriceAnnualComp: {
            cols: [
                {
                    id: 'datereported',
                    label: 'Date Reported',
                    type: 'date'
                }
            ],
            rows: []
        },
        soldCountAnnualComp: {
            cols: [
                {
                    id: 'datereported',
                    label: 'Date Reported',
                    type: 'date'
                }
            ],
            rows: []
        }
    }
};

const currencyOptions = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
};

const getMedianValue = arr => {
    const s = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : ((s[mid - 1] + s[mid]) / 2);
};

const buildTable = table => {
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    thead.innerHTML = '<tr><th class="p-2"></th></tr>';
    tbody.innerHTML = '';

    if (showQuarters) {
        quarters.forEach(quarter => thead.querySelector('tr').innerHTML += `<th class="p-2">Q${quarter}</th>`);
    } else {
        months.forEach(month => thead.querySelector('tr').innerHTML += `<th class="p-2">${month.slice(0,3)}</th>`);
    }

    thead.querySelector('tr').innerHTML += '<th class="p-2">YTD</th>';

    years.forEach(year => {
        const tr = document.createElement('tr');

        tbody.append(tr);
        tr.innerHTML = `<td class="p-2">${year}</td>`;

        if (table.classList.contains('js-home-sales-table')) {
            const ytdValues = [];

            if (showQuarters) {
                quarters.forEach((_, qindex) => {
                    let value = 0;

                    months.slice(qindex * 3, qindex * 3 + 3).forEach(month => {
                        const values = tableData
                                        .filter(x => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year)
                                        .map(x => x.soldCount);
                        value += values.reduce((a, b) => a + b, 0);
                    });

                    ytdValues.push(value);
                    tr.innerHTML += `<td class="p-2">${value ? value.toLocaleString() : 'n/a'}</td>`;
                });
            } else {
                months.forEach(month => {
                    const values = tableData
                                    .filter(x => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year)
                                    .map(x => x.soldCount);
                    const value = values.reduce((a, b) => a + b, 0);

                    ytdValues.push(value);
                    tr.innerHTML += `<td class="p-2">${value ? value.toLocaleString() : 'n/a'}</td>`;
                });
            }

            const ytdValue = ytdValues.reduce((a, b) => a + b, 0);
            tr.innerHTML += `<td class="p-2">${ytdValue.toLocaleString()}</td>`;
        } else if (table.classList.contains('js-median-price-table')) {
            if (showQuarters) {
                quarters.forEach((_, qindex) => {
                    let values = [];

                    months.slice(qindex * 3, qindex * 3 + 3).forEach(month => {
                        const quarterValues = tableData
                                                .filter(x => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year)
                                                .map(x => x.medianSalePrice);
                        values = values.concat(quarterValues);
                    });

                    const value = values.length ? getMedianValue(values) : 0;
                    const dollars = value !== 0 ? value.toLocaleString('en', currencyOptions) : 'n/a';
                    tr.innerHTML += `<td class="p-2">${dollars}</td>`;
                });
            } else {
                months.forEach(month => {
                    const values = tableData
                                    .filter(x => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year)
                                    .map(x => x.medianSalePrice);
                    const value = values.length ? getMedianValue(values) : 0;
                    const dollars = value !== 0 ? value.toLocaleString('en', currencyOptions) : 'n/a';
                    tr.innerHTML += `<td class="p-2">${dollars}</td>`;
                });
            }

            const ytdValues = tableData.filter(x => x.yearNumber === year).map(x => x.medianSalePrice);
            const ytdValue = getMedianValue(ytdValues);
            const ytdDollars = ytdValue.toLocaleString('en', currencyOptions);
            tr.innerHTML += `<td class="p-2">${ytdDollars}</td>`;
        }
    });

    table.tableHover({
        headRows: false,
        headCols: false,
        ignoreCols: [1],
        colClass: 'hover',
        cellClass: 'hover-cell',
        clickClass: 'click-hover'
    });
};

const buildTables = () => {
    [homeSalesTable, medianPriceTable].forEach(table => {
        buildTable(table);
    });
};

const buildCharts = () => {
    google.charts.load('current', { packages: ['corechart', 'controls', 'table'] });

    google.charts.setOnLoadCallback(() => {
        const tempYears = [];
        const yearsToShow = 5;

        for (let i = 0; i < chartData.d.years.length; i++) {
            if (Number(chartData.d.years[i]) > new Date().getFullYear() - yearsToShow) {
                tempYears.push(chartData.d.years[i]);
            }
        }

        chartData.d.years = tempYears;

        const tempRows = [];
        const tempCols = [];

        for (let i = 0; i < chartData.d.medianPriceAnnualComp.rows.length; i++) {
            if (new Date(eval(chartData.d.medianPriceAnnualComp.rows[i].c[0].v)).getFullYear() >= new Date().getFullYear() - yearsToShow) {
                tempRows.push(chartData.d.medianPriceAnnualComp.rows[i]);
            }
        }

        for (let i = 0; i < chartData.d.medianPriceAnnualComp.cols.length; i++) {
            let col = chartData.d.medianPriceAnnualComp.cols[i];
            if (col.type == 'date' || Number(col.id) > new Date().getFullYear() - yearsToShow) {
                tempCols.push(chartData.d.medianPriceAnnualComp.cols[i]);
            }
        }

        chartData.d.medianPriceAnnualComp.rows = tempRows;
        chartData.d.medianPriceAnnualComp.cols = tempCols;

        const tempRowsTwo = [];
        const tempColsTwo = [];

        for (let i = 0; i < chartData.d.soldCountAnnualComp.rows.length; i++) {
            if (new Date(eval(chartData.d.soldCountAnnualComp.rows[i].c[0].v)).getFullYear() >= new Date().getFullYear() - yearsToShow) {
                tempRowsTwo.push(chartData.d.soldCountAnnualComp.rows[i]);
            }
        }

        for (let i = 0; i < chartData.d.soldCountAnnualComp.cols.length; i++) {
            let col = chartData.d.soldCountAnnualComp.cols[i];
            if (col.type == 'date' || Number(col.id) > new Date().getFullYear() - yearsToShow) {
                tempColsTwo.push(chartData.d.soldCountAnnualComp.cols[i]);
            }
        }

        chartData.d.soldCountAnnualComp.rows = tempRowsTwo;
        chartData.d.soldCountAnnualComp.cols = tempColsTwo;

        const tempRowsThree = [];
        const tempColsThree = chartData.d.medianPrice.cols = [...chartData.d.medianPrice.cols.slice(0, 1), ...chartData.d.medianPrice.cols.slice(chartData.d.medianPrice.cols.length - yearsToShow)];

        for (let i = 0; i < chartData.d.medianPrice.rows.length; i++) {
            let rows = chartData.d.medianPrice.rows[i].c;
            let trw = [...rows.slice(0, 1), ...rows.slice(rows.length - yearsToShow)]
            tempRowsThree.push({ c: trw});
        }

        chartData.d.medianPrice.rows = tempRowsThree;
        chartData.d.medianPrice.cols = tempColsThree;

        const tempRowsFour = [];
        const tempColsFour = chartData.d.soldCount.cols = [...chartData.d.soldCount.cols.slice(0, 1), ...chartData.d.soldCount.cols.slice(chartData.d.soldCount.cols.length - yearsToShow)];

        for (let i = 0; i < chartData.d.soldCount.rows.length; i++) {
            let rows = chartData.d.soldCount.rows[i].c;
            let trw = [...rows.slice(0, 1), ...rows.slice(rows.length - yearsToShow)]
            tempRowsFour.push({ c: trw });
        }

        chartData.d.soldCount.rows = tempRowsFour;
        chartData.d.soldCount.cols = tempColsFour;

        // set initial range for ChartRangeFilter
        const rangestate = {
            range: {
                start: new Date(chartData.d.latestYear - 1, chartData.d.latestMonth - 1, 1),
                end: new Date(chartData.d.latestYear, chartData.d.latestMonth - 1, 1)
            }
        };

        let mpaView;

        switch (chartData.d.DataSetType) {
            case 0:
                // statewide, plot regions and statewide data
                mpaView = {
                    columns: [
                        {
                            calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
                            type: 'string'
                        }
                    ]
                };

                for (let i = 1; i < chartData.d.medianPriceAnnualComp.cols.length; i++) {
                    mpaView.columns.push(i);
                }

                break;

            case 1:
                // region, plot counties and statewide as well
                mpaView = {
                    columns: [
                        {
                            calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
                            type: 'string'
                        }
                    ]
                };

                for (let i = 1; i < chartData.d.medianPriceAnnualComp.cols.length; i++) {
                    mpaView.columns.push(i);
                }

                break;

            case 2:
                mpaView = {
                    columns: [
                        {
                            calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
                            type: 'string'
                        }
                    ]
                };

                for (let i = 1; i < chartData.d.medianPriceAnnualComp.cols.length; i++) {
                    mpaView.columns.push(i);
                }

                break;
        }

        const mpAnnualComparisonData = new google.visualization.DataTable(eval(chartData.d.medianPriceAnnualComp));
        const mpAnnualComparisonDashboard = new google.visualization.Dashboard(document.getElementById('mpAnnualComparison'));
        const mpAnnualComparisonControl = new google.visualization.ControlWrapper({
            controlType: 'ChartRangeFilter',
            containerId: 'mpAnnualComparisonControl',
            options: {
                filterColumnIndex: 0,
                ui: {
                    chartType: 'LineChart',
                    chartOptions: {
                        enableInteractivity: true,
                        height: 40,
                        chartArea: {
                            width: '70%'
                        },
                        hAxis: {
                            minValue: new Date(new Date().getFullYear() -5, 0, 1), // 'auto',
                            maxValue: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 'auto'
                            textPosition: 'none'
                        },
                        snapToData: true
                    },
                    // Thus, this view has two columns: the date (axis) and the county value
                    chartView: {
                        columns: [0, 1]
                    },
                    minRangeSize: 86400000 // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
                }
            },
            state: rangestate
        });

        const mpAnnualComparisonChart = new google.visualization.ChartWrapper({
            chartType: 'LineChart',
            containerId: 'mpAnnualComparisonChart',
            options: {
            title: `Median Price Annual Comparison - ${chartData.d.locationName}`,
            height: 400,
                // Use the same chart area width as the control for axis alignment.
                chartArea: {
                    width: '70%'
                },
                hAxis: {
                    slantedText: false,
                    format: 'MMMM yyyy'
                },
                vAxis: {
                    format: '$0,000'
                }
            },
            // Convert the first column from 'date' to 'string'.
            view: mpaView
        });

        mpAnnualComparisonDashboard.bind(mpAnnualComparisonControl, mpAnnualComparisonChart);
        mpAnnualComparisonDashboard.draw(mpAnnualComparisonData);

        const scAnnualComparisonData = new google.visualization.DataTable(eval(chartData.d.soldCountAnnualComp));
        const scAnnualComparisonDashboard = new google.visualization.Dashboard(document.getElementById('scAnnualComparison'));
        const scAnnualComparisonControl = new google.visualization.ControlWrapper({
            controlType: 'ChartRangeFilter',
            containerId: 'scAnnualComparisonControl',
            options: {
                filterColumnIndex: 0,
                ui: {
                    chartType: 'LineChart',
                    chartOptions: {
                        enableInteractivity: true,
                        height: 40,
                        chartArea: {
                            width: '70%'
                        },
                        hAxis: {
                            minValue: new Date(new Date().getFullYear() - 5, 0, 1), // 'auto',
                            maxValue: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 'auto'
                            textPosition: 'none'
                        },
                        snapToData: true
                    },
                    // Thus, this view has two columns: the date (axis) and the county value
                    chartView: {
                        columns: [0, 1]
                    },
                    minRangeSize: 86400000 // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
                }
            },
            state: rangestate
        });

        const scAnnualComparisonChart = new google.visualization.ChartWrapper({
            chartType: 'LineChart',
            containerId: 'scAnnualComparisonChart',
            options: {
                title: `Number of Sales Comparison - ${chartData.d.locationName}`,
                height: 400,
                // Use the same chart area width as the control for axis alignment.
                chartArea: {
                    width: '70%'
                },
                hAxis: {
                    slantedText: false,
                    format: 'MMM yyyy'
                },
                vAxes: [{}]
            },
            // Convert the first column from 'date' to 'string'.
            view: mpaView
        });

        scAnnualComparisonDashboard.bind(scAnnualComparisonControl, scAnnualComparisonChart);
        scAnnualComparisonDashboard.draw(scAnnualComparisonData);

        const categoryPicker = new google.visualization.ControlWrapper({
            controlType: 'CategoryFilter',
            containerId: 'mpYearSlider',
            options: {
                useFormattedValue: true,
                filterColumnLabel: 'Month',
                ui: {
                    caption: 'Months',
                    sortValues: false,
                    allowTyping: false,
                    allowMultiple: true,
                    selectedValuesLayout: 'aside'
                }
            },
            state: {
                selectedValues: []
            }
        });

        const categoryPicker2 = new google.visualization.ControlWrapper({
            controlType: 'CategoryFilter',
            containerId: 'mpYearSlider2',
            options: {
                useFormattedValue: true,
                filterColumnLabel: 'Month',
                ui: {
                    caption: 'Months',
                    sortValues: false,
                    allowTyping: false,
                    allowMultiple: true,
                    selectedValuesLayout: 'aside'
                }
            },
            state: {
                selectedValues: []
            }
        });

        const chCols = [{
            calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
            type: 'string'
        }];
        
        for (let i = 1; i < chartData.d.medianPrice.cols.length; i++) {
            chCols.push(i);
        }

        const mpChart = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            containerId: 'chart_div',
            options: {
                title: `Median Price - ${chartData.d.locationName}`,
                height: 400,
                hAxis: {
                    title: 'Month',
                    slantedText: false,
                    showTextEvery: 1,
                    minValue: 1,
                    maxValue: 12,
                    format: '#'
                },
                fontName: 'Verdana'

            },
            view: {
                columns: chCols
            }
        });

        const scChart = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            containerId: 'sold_count_chart',
            options: {
                title: `Number of Sales - ${chartData.d.locationName}`,
                height: 400,
                hAxis: {
                    title: 'Month',
                    showTextEvery: 1,
                    minValue: 1,
                    maxValue: 12,
                    format: '#'
                },
                fontName: 'Verdana'
            },
            view: {
                columns: chCols
            }
        });

        const mpData = new google.visualization.DataTable(chartData.d.medianPrice, 0.5);
        const scData = new google.visualization.DataTable(chartData.d.soldCount, 0.5);

        new google.visualization.Dashboard(document.getElementById('dashboard'))
            .bind([categoryPicker], [mpChart])
            .draw(mpData);

        new google.visualization.Dashboard(document.getElementById('dashboard2'))
            .bind([categoryPicker2], [scChart])
            .draw(scData);
    });
};

const loadData = () => {
    if (regionSelect.value === 'WI') {
        tableData = data.filter(x => x.grandparentName === regionSelect.value);
    } else if (countySelect.value !== '') {
        tableData = data.filter(x => x.locationName === countySelect.value);
    } else {
        tableData = data.filter(x => x.parentName === regionSelect.value);
        counties = tableData[0].grandparentName === 'WI' ? [...new Set(tableData.map(x => x.locationName))] : [];

        countySelect.parentNode.parentNode.hidden = counties.length === 0;
        if (counties.length) {
            countySelect.innerHTML = '<option value="">Please Choose</option>';
            counties.forEach(county => {
                countySelect.innerHTML += `<option value="${county}">${county}</option>`;
            });
        }
    }

    years = [...new Set(tableData.map(x => x.yearNumber))];
    chartData.d.years = years;
    chartData.d.locationName = countySelect.value === '' ? regionSelect.value : `${countySelect.value} County`;

    chartData.d.medianPrice.cols = [{
        id: 'month',
        label: 'Month',
        type: 'number'
    }];
    chartData.d.medianPrice.rows = [];

    chartData.d.soldCount.cols = [{
        id: 'month',
        label: 'Month',
        type: 'string'
    }];
    chartData.d.soldCount.rows = [];

    chartData.d.medianPriceAnnualComp.cols = [
        {
            id: 'datereported',
            label: 'Date Reported',
            type: 'date'
        }
    ];
    chartData.d.medianPriceAnnualComp.rows = [];

    chartData.d.soldCountAnnualComp.cols = [
        {
            id: 'datereported',
            label: 'Date Reported',
            type: 'date'
        }
    ];
    chartData.d.soldCountAnnualComp.rows = [];

    years.forEach((year, yindex) => {
        chartData.d.medianPrice.cols.push({
            id: year.toString(),
            label: year.toString(),
            type: 'number'
        });

        chartData.d.soldCount.cols.push({
            id: year.toString(),
            label: year.toString(),
            type: 'number'
        });

        months.forEach((month, mindex) => {
            const mpRow = {
                c: []
            };

            const scRow = {
                c: []
            };

            years.forEach((year, y2index) => {
                const mpValues = tableData.filter(x => x.datePartName === month && x.yearNumber === year)
                                    .map(x => x.medianSalePrice);
                const mpValue = getMedianValue(mpValues);
                const scValues = tableData.filter(x => x.datePartName === month && x.yearNumber === year)
                                    .map(x => x.soldCount);
                const scValue = scValues.reduce((a, b) => a + b, 0);

                if (y2index <= yindex) {
                    mpRow.c.push({
                        v: mpValue ? Math.round(mpValue) : null,
                        f: mpValue ? Math.round(mpValue).toLocaleString('en', currencyOptions) : null
                    });

                    scRow.c.push({
                        v: scValue || null,
                        f: scValue ? scValue.toLocaleString() : null
                    });
                }
            });

            mpRow.c.push({
                v: `Date(${year},${mindex},1)`,
                f: `${month.slice(0,3)} ${year}`
            });

            scRow.c.push({
                v: `Date(${year},${mindex},1)`,
                f: `${month.slice(0,3)} ${year}`
            });

            mpRow.c.reverse();
            scRow.c.reverse();

            years.forEach((_, y2index) => {
                if (y2index > yindex) {
                    mpRow.c.push({
                        v: null,
                        f: null
                    });
                }
            });

            chartData.d.medianPriceAnnualComp.rows.push(mpRow);
            chartData.d.soldCountAnnualComp.rows.push(scRow);
        });
    });

    [...years].reverse().forEach((year, index) => {
        chartData.d.medianPriceAnnualComp.cols.push({
            id: year.toString(),
            label: index === 0 ? 'Value' : (index === 1 ? 'Prior year' : `${index} years prior`),
            type: 'number'
        });

        chartData.d.soldCountAnnualComp.cols.push({
            id: year.toString(),
            label: index === 0 ? 'Value' : (index === 1 ? 'Prior year' : `${index} years prior`),
            type: 'number'
        });
    });

    months.forEach((month, index) => {
        const mpRow = {
            c: [
                {
                    v: index + 1,
                    f: month
                }
            ]
        };

        const scRow = {
            c: [
                {
                    v: index + 1,
                    f: month
                }
            ]
        };

        years.forEach(year => {
            const mpValues = tableData.filter(x => x.datePartName === month && x.yearNumber === year)
                                .map(x => x.medianSalePrice);
            const mpValue = getMedianValue(mpValues);
            const scValues = tableData.filter(x => x.datePartName === month && x.yearNumber === year)
                                .map(x => x.soldCount);
            const scValue = scValues.reduce((a, b) => a + b, 0);

            mpRow.c.push({
                v: mpValue ? Math.round(mpValue) : null,
                f: mpValue ? Math.round(mpValue).toLocaleString('en', currencyOptions) : ''
            });

            scRow.c.push({
                v: scValue || null,
                f: scValue ? `${scValue.toLocaleString()} Sales` : ''
            });
        });

        chartData.d.medianPrice.rows.push(mpRow);
        chartData.d.soldCount.rows.push(scRow);
    });

    chartData.d.latestYear = years.at(-1);
    chartData.d.latestMonth = tableData.filter(x => x.yearNumber === years.at(-1)).at(-1).datePartNumber;

    if (regionSelect.value === 'WI') {
        chartData.d.dataSetType = 0;
    } else if (countySelect.value === '') {
        chartData.d.dataSetType = 1;
    } else {
        chartData.d.dataSetType = 2;
    }

    buildTables();
    buildCharts();
};

fetch('/housing-statistics-data')
    .then(res => res.json())
    .then(res => {
        data = res;
        housingStats.hidden = false;
        loader.hidden = true;
        loadData();
    });

regionSelect.addEventListener('change', () => {
    countySelect.value = '';
    countySelect.parentNode.parentNode.hidden = regionSelect.value === 'WI';
    loadData();
});

countySelect.addEventListener('change', () => {
    loadData();
});

housingStatsToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.replace('btn-secondary', 'btn-primary');
        toggle.style.pointerEvents = 'none';

        housingStatsToggles.forEach(toggle2 => {
            if (toggle2 !== toggle) {
                toggle2.classList.replace('btn-primary', 'btn-secondary');
                toggle2.style.pointerEvents = '';
            }
        });

        showQuarters = toggle.dataset.label === 'Quarter';
        housingStatsHeading.querySelector('span').innerText = toggle.dataset.label;

        buildTables();
    });
});