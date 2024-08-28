(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // wwwroot/js/src/components/table-hover.js
  function A(table) {
    var rows = table.rows;
    var rowCount = rows.length;
    var cellIndexMap = [];
    for (var i2 = 0; i2 < rowCount; i2++) {
      var cells = rows[i2].cells;
      var cellCount = cells.length;
      for (var j = 0; j < cellCount; j++) {
        var cell = cells[j];
        var rowSpan = cell.rowSpan || 1;
        var colSpan = cell.colSpan || 1;
        var colIndex = -1;
        if (!cellIndexMap[i2]) {
          cellIndexMap[i2] = [];
        }
        var indexRow = cellIndexMap[i2];
        while (indexRow[++colIndex]) {
        }
        cell.realIndex = colIndex;
        for (var rowOffset = i2; rowOffset < i2 + rowSpan; rowOffset++) {
          if (!cellIndexMap[rowOffset]) {
            cellIndexMap[rowOffset] = [];
          }
          var row = cellIndexMap[rowOffset];
          for (var colOffset = colIndex; colOffset < colIndex + colSpan; colOffset++) {
            row[colOffset] = 1;
          }
        }
      }
    }
  }
  function B(table) {
    var rowIndex = 0;
    var rows, rowCount, i2;
    if (table.tHead) {
      rows = table.tHead.rows;
      rowCount = rows.length;
      for (i2 = 0; i2 < rowCount; i2++) {
        rows[i2].realRIndex = rowIndex++;
      }
    }
    for (var tBodyIndex = 0; tBodyIndex < table.tBodies.length; tBodyIndex++) {
      rows = table.tBodies[tBodyIndex].rows;
      rowCount = rows.length;
      for (i2 = 0; i2 < rowCount; i2++) {
        rows[i2].realRIndex = rowIndex++;
      }
    }
    if (table.tFoot) {
      rows = table.tFoot.rows;
      rowCount = rows.length;
      for (i2 = 0; i2 < rowCount; i2++) {
        rows[i2].realRIndex = rowIndex++;
      }
    }
  }
  var init_table_hover = __esm({
    "wwwroot/js/src/components/table-hover.js"() {
      HTMLTableElement.prototype.tableHover = function(options) {
        var settings = Object.assign({
          allowHead: true,
          allowBody: true,
          allowFoot: true,
          headRows: false,
          bodyRows: true,
          footRows: false,
          spanRows: true,
          headCols: false,
          bodyCols: true,
          footCols: false,
          spanCols: true,
          ignoreCols: [],
          headCells: false,
          bodyCells: true,
          footCells: false,
          rowClass: "hover",
          colClass: "",
          cellClass: "",
          clickClass: ""
        }, options);
        var table = this;
        var colCells = [], rowCells = [], hoverClassIndex = 0, previousHover = [-1, -1];
        if (!table.tBodies || !table.tBodies.length) {
          return;
        }
        function mapCells(rows, section) {
          for (var i3 = 0; i3 < rows.length; i3++, hoverClassIndex++) {
            var row = rows[i3];
            for (var j = 0; j < row.cells.length; j++) {
              var cell = row.cells[j];
              if (section === "TBODY" && settings.bodyRows || section === "TFOOT" && settings.footRows || section === "THEAD" && settings.headRows) {
                var rowSpan = cell.rowSpan;
                while (--rowSpan >= 0) {
                  rowCells[hoverClassIndex + rowSpan].push(cell);
                }
              }
              if (section === "TBODY" && settings.bodyCols || section === "THEAD" && settings.headCols || section === "TFOOT" && settings.footCols) {
                var colSpan = cell.colSpan;
                while (--colSpan >= 0) {
                  var colIndex = cell.realIndex + colSpan;
                  if (settings.ignoreCols.includes(colIndex + 1)) {
                    break;
                  }
                  if (!colCells[colIndex]) {
                    colCells[colIndex] = [];
                  }
                  colCells[colIndex].push(cell);
                }
              }
              if (section === "TBODY" && settings.allowBody || section === "THEAD" && settings.allowHead || section === "TFOOT" && settings.allowFoot) {
                cell.thover = true;
              }
            }
          }
        }
        function hoverHandler(event, isHover) {
          var target = event.target;
          while (target !== table && !target.thover) {
            target = target.parentNode;
          }
          if (target.thover) {
            handleHover(target, isHover);
          }
        }
        function clickHandler(event) {
          var target = event.target;
          while (target && target !== table && !target.thover) {
            target = target.parentNode;
          }
          if (target.thover && settings.clickClass) {
            var colIndex = target.realIndex;
            var rowIndex = target.parentNode.realRIndex;
            var clickedCells = table.querySelectorAll("td." + settings.clickClass + ", th." + settings.clickClass);
            clickedCells.forEach(function(cell) {
              cell.classList.remove(settings.clickClass);
            });
            if (colIndex !== previousHover[0] || rowIndex !== previousHover[1]) {
              var classesToAdd = [];
              if (settings.rowClass)
                classesToAdd.push("." + settings.rowClass);
              if (settings.colClass)
                classesToAdd.push("." + settings.colClass);
              if (settings.cellClass)
                classesToAdd.push("." + settings.cellClass);
              if (classesToAdd.length) {
                var cellsToHover = table.querySelectorAll("td, th");
                cellsToHover.forEach(function(cell) {
                  if (classesToAdd.some((cls) => cell.matches(cls))) {
                    cell.classList.add(settings.clickClass);
                  }
                });
              }
              previousHover = [colIndex, rowIndex];
            } else {
              previousHover = [-1, -1];
            }
          }
        }
        function handleHover(cell, isHover) {
          var hoverAction = isHover ? "add" : "remove";
          var colIndex = cell.realIndex;
          if (settings.colClass) {
            var colCellSpan = cell.colSpan;
            var colHoverCells = colCells[colIndex] || [];
            for (var i3 = 1; settings.spanCols && i3 < colCellSpan && colCells[colIndex + i3]; i3++) {
              colHoverCells = colHoverCells.concat(colCells[colIndex + i3]);
            }
            colHoverCells.forEach(function(colCell) {
              colCell.classList[hoverAction](settings.colClass);
            });
          }
          if (settings.rowClass) {
            var rowIndex = cell.parentNode.realRIndex;
            var rowHoverCells = rowCells[rowIndex] || [];
            var rowSpan = cell.rowSpan;
            for (var i3 = 1; settings.spanRows && i3 < rowSpan && rowCells[rowIndex + i3]; i3++) {
              rowHoverCells = rowHoverCells.concat(rowCells[rowIndex + i3]);
            }
            rowHoverCells.forEach(function(rowCell) {
              rowCell.classList[hoverAction](settings.rowClass);
            });
          }
          if (settings.cellClass) {
            var sectionName = cell.parentNode.parentNode.nodeName.toUpperCase();
            if (sectionName === "TBODY" && settings.bodyCells || sectionName === "THEAD" && settings.headCells || sectionName === "TFOOT" && settings.footCells) {
              cell.classList[hoverAction](settings.cellClass);
            }
          }
        }
        A(table);
        B(table);
        for (var i2 = 0; i2 < table.rows.length; i2++) {
          rowCells[i2] = [];
        }
        if (table.tHead) {
          mapCells(table.tHead.rows, "THEAD");
        }
        for (var tBodyIndex = 0; tBodyIndex < table.tBodies.length; tBodyIndex++) {
          mapCells(table.tBodies[tBodyIndex].rows, "TBODY");
        }
        if (table.tFoot) {
          mapCells(table.tFoot.rows, "TFOOT");
        }
        table.addEventListener("mouseover", function(event) {
          hoverHandler(event, true);
        });
        table.addEventListener("mouseout", function(event) {
          hoverHandler(event, false);
        });
        table.addEventListener("click", clickHandler);
      };
    }
  });

  // wwwroot/js/src/housing-statistics.js
  var require_housing_statistics = __commonJS({
    "wwwroot/js/src/housing-statistics.js"(exports, module) {
      init_table_hover();
      var regionSelect = document.querySelector(".js-region-select");
      var countySelect = document.querySelector(".js-county-select");
      var housingStats = document.querySelector(".js-housing-stats");
      var housingStatsHeading = document.querySelector(".js-housing-stats__heading");
      var housingStatsToggles = document.querySelectorAll(".js-housing-stats__toggle");
      var homeSalesTable = document.querySelector(".js-home-sales-table");
      var medianPriceTable = document.querySelector(".js-median-price-table");
      var loader = document.querySelector(".js-results-loader");
      var months = [...Array(12).keys()].map((key) => new Date(0, key).toLocaleString("en", { month: "long" }));
      var quarters = [1, 2, 3, 4];
      var counties = [];
      var years = [];
      var showQuarters = false;
      var data = [];
      var tableData = [];
      var chartData = {
        d: {
          locationName: "",
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
                id: "datereported",
                label: "Date Reported",
                type: "date"
              }
            ],
            rows: []
          },
          soldCountAnnualComp: {
            cols: [
              {
                id: "datereported",
                label: "Date Reported",
                type: "date"
              }
            ],
            rows: []
          }
        }
      };
      var currencyOptions = {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      };
      var getMedianValue = (arr) => {
        const s = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(s.length / 2);
        return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
      };
      var buildTable = (table) => {
        const thead = table.querySelector("thead");
        const tbody = table.querySelector("tbody");
        thead.innerHTML = '<tr><th class="p-2"></th></tr>';
        tbody.innerHTML = "";
        if (showQuarters) {
          quarters.forEach((quarter) => thead.querySelector("tr").innerHTML += `<th class="p-2">Q${quarter}</th>`);
        } else {
          months.forEach((month) => thead.querySelector("tr").innerHTML += `<th class="p-2">${month.slice(0, 3)}</th>`);
        }
        thead.querySelector("tr").innerHTML += '<th class="p-2">YTD</th>';
        years.forEach((year) => {
          const tr = document.createElement("tr");
          tbody.append(tr);
          tr.innerHTML = `<td class="p-2">${year}</td>`;
          if (table.classList.contains("js-home-sales-table")) {
            const ytdValues = [];
            if (showQuarters) {
              quarters.forEach((_, qindex) => {
                let value = 0;
                months.slice(qindex * 3, qindex * 3 + 3).forEach((month) => {
                  const values = tableData.filter((x) => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year).map((x) => x.soldCount);
                  value += values.reduce((a, b) => a + b, 0);
                });
                ytdValues.push(value);
                tr.innerHTML += `<td class="p-2">${value ? value.toLocaleString() : "n/a"}</td>`;
              });
            } else {
              months.forEach((month) => {
                const values = tableData.filter((x) => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year).map((x) => x.soldCount);
                const value = values.reduce((a, b) => a + b, 0);
                ytdValues.push(value);
                tr.innerHTML += `<td class="p-2">${value ? value.toLocaleString() : "n/a"}</td>`;
              });
            }
            const ytdValue = ytdValues.reduce((a, b) => a + b, 0);
            tr.innerHTML += `<td class="p-2">${ytdValue.toLocaleString()}</td>`;
          } else if (table.classList.contains("js-median-price-table")) {
            if (showQuarters) {
              quarters.forEach((_, qindex) => {
                let values = [];
                months.slice(qindex * 3, qindex * 3 + 3).forEach((month) => {
                  const quarterValues = tableData.filter((x) => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year).map((x) => x.medianSalePrice);
                  values = values.concat(quarterValues);
                });
                const value = values.length ? getMedianValue(values) : 0;
                const dollars = value !== 0 ? value.toLocaleString("en", currencyOptions) : "n/a";
                tr.innerHTML += `<td class="p-2">${dollars}</td>`;
              });
            } else {
              months.forEach((month) => {
                const values = tableData.filter((x) => x.datePartName.toLowerCase().includes(month.toLowerCase()) && x.yearNumber === year).map((x) => x.medianSalePrice);
                const value = values.length ? getMedianValue(values) : 0;
                const dollars = value !== 0 ? value.toLocaleString("en", currencyOptions) : "n/a";
                tr.innerHTML += `<td class="p-2">${dollars}</td>`;
              });
            }
            const ytdValues = tableData.filter((x) => x.yearNumber === year).map((x) => x.medianSalePrice);
            const ytdValue = getMedianValue(ytdValues);
            const ytdDollars = ytdValue.toLocaleString("en", currencyOptions);
            tr.innerHTML += `<td class="p-2">${ytdDollars}</td>`;
          }
        });
        table.tableHover({
          headRows: false,
          headCols: false,
          ignoreCols: [1],
          colClass: "hover",
          cellClass: "hover-cell",
          clickClass: "click-hover"
        });
      };
      var buildTables = () => {
        [homeSalesTable, medianPriceTable].forEach((table) => {
          buildTable(table);
        });
      };
      var buildCharts = () => {
        google.charts.load("current", { packages: ["corechart", "controls", "table"] });
        google.charts.setOnLoadCallback(() => {
          const tempYears = [];
          const yearsToShow = 5;
          for (let i2 = 0; i2 < chartData.d.years.length; i2++) {
            if (Number(chartData.d.years[i2]) > (/* @__PURE__ */ new Date()).getFullYear() - yearsToShow) {
              tempYears.push(chartData.d.years[i2]);
            }
          }
          chartData.d.years = tempYears;
          const tempRows = [];
          const tempCols = [];
          for (let i = 0; i < chartData.d.medianPriceAnnualComp.rows.length; i++) {
            if (new Date(eval(chartData.d.medianPriceAnnualComp.rows[i].c[0].v)).getFullYear() >= (/* @__PURE__ */ new Date()).getFullYear() - yearsToShow) {
              tempRows.push(chartData.d.medianPriceAnnualComp.rows[i]);
            }
          }
          for (let i2 = 0; i2 < chartData.d.medianPriceAnnualComp.cols.length; i2++) {
            let col = chartData.d.medianPriceAnnualComp.cols[i2];
            if (col.type == "date" || Number(col.id) > (/* @__PURE__ */ new Date()).getFullYear() - yearsToShow) {
              tempCols.push(chartData.d.medianPriceAnnualComp.cols[i2]);
            }
          }
          chartData.d.medianPriceAnnualComp.rows = tempRows;
          chartData.d.medianPriceAnnualComp.cols = tempCols;
          const tempRowsTwo = [];
          const tempColsTwo = [];
          for (let i = 0; i < chartData.d.soldCountAnnualComp.rows.length; i++) {
            if (new Date(eval(chartData.d.soldCountAnnualComp.rows[i].c[0].v)).getFullYear() >= (/* @__PURE__ */ new Date()).getFullYear() - yearsToShow) {
              tempRowsTwo.push(chartData.d.soldCountAnnualComp.rows[i]);
            }
          }
          for (let i2 = 0; i2 < chartData.d.soldCountAnnualComp.cols.length; i2++) {
            let col = chartData.d.soldCountAnnualComp.cols[i2];
            if (col.type == "date" || Number(col.id) > (/* @__PURE__ */ new Date()).getFullYear() - yearsToShow) {
              tempColsTwo.push(chartData.d.soldCountAnnualComp.cols[i2]);
            }
          }
          chartData.d.soldCountAnnualComp.rows = tempRowsTwo;
          chartData.d.soldCountAnnualComp.cols = tempColsTwo;
          const tempRowsThree = [];
          const tempColsThree = chartData.d.medianPrice.cols = [...chartData.d.medianPrice.cols.slice(0, 1), ...chartData.d.medianPrice.cols.slice(chartData.d.medianPrice.cols.length - yearsToShow)];
          for (let i2 = 0; i2 < chartData.d.medianPrice.rows.length; i2++) {
            let rows = chartData.d.medianPrice.rows[i2].c;
            let trw = [...rows.slice(0, 1), ...rows.slice(rows.length - yearsToShow)];
            tempRowsThree.push({ c: trw });
          }
          chartData.d.medianPrice.rows = tempRowsThree;
          chartData.d.medianPrice.cols = tempColsThree;
          const tempRowsFour = [];
          const tempColsFour = chartData.d.soldCount.cols = [...chartData.d.soldCount.cols.slice(0, 1), ...chartData.d.soldCount.cols.slice(chartData.d.soldCount.cols.length - yearsToShow)];
          for (let i2 = 0; i2 < chartData.d.soldCount.rows.length; i2++) {
            let rows = chartData.d.soldCount.rows[i2].c;
            let trw = [...rows.slice(0, 1), ...rows.slice(rows.length - yearsToShow)];
            tempRowsFour.push({ c: trw });
          }
          chartData.d.soldCount.rows = tempRowsFour;
          chartData.d.soldCount.cols = tempColsFour;
          const rangestate = {
            range: {
              start: new Date(chartData.d.latestYear - 1, chartData.d.latestMonth - 1, 1),
              end: new Date(chartData.d.latestYear, chartData.d.latestMonth - 1, 1)
            }
          };
          let mpaView;
          switch (chartData.d.DataSetType) {
            case 0:
              mpaView = {
                columns: [
                  {
                    calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
                    type: "string"
                  }
                ]
              };
              for (let i2 = 1; i2 < chartData.d.medianPriceAnnualComp.cols.length; i2++) {
                mpaView.columns.push(i2);
              }
              break;
            case 1:
              mpaView = {
                columns: [
                  {
                    calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
                    type: "string"
                  }
                ]
              };
              for (let i2 = 1; i2 < chartData.d.medianPriceAnnualComp.cols.length; i2++) {
                mpaView.columns.push(i2);
              }
              break;
            case 2:
              mpaView = {
                columns: [
                  {
                    calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
                    type: "string"
                  }
                ]
              };
              for (let i2 = 1; i2 < chartData.d.medianPriceAnnualComp.cols.length; i2++) {
                mpaView.columns.push(i2);
              }
              break;
          }
          const mpAnnualComparisonData = new google.visualization.DataTable(eval(chartData.d.medianPriceAnnualComp));
          const mpAnnualComparisonDashboard = new google.visualization.Dashboard(document.getElementById("mpAnnualComparison"));
          const mpAnnualComparisonControl = new google.visualization.ControlWrapper({
            controlType: "ChartRangeFilter",
            containerId: "mpAnnualComparisonControl",
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: "LineChart",
                chartOptions: {
                  enableInteractivity: true,
                  height: 40,
                  chartArea: {
                    width: "70%"
                  },
                  hAxis: {
                    minValue: new Date((/* @__PURE__ */ new Date()).getFullYear() - 5, 0, 1),
                    // 'auto',
                    maxValue: new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1),
                    // 'auto'
                    textPosition: "none"
                  },
                  snapToData: true
                },
                // Thus, this view has two columns: the date (axis) and the county value
                chartView: {
                  columns: [0, 1]
                },
                minRangeSize: 864e5
                // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
              }
            },
            state: rangestate
          });
          const mpAnnualComparisonChart = new google.visualization.ChartWrapper({
            chartType: "LineChart",
            containerId: "mpAnnualComparisonChart",
            options: {
              title: `Median Price Annual Comparison - ${chartData.d.locationName}`,
              height: 400,
              // Use the same chart area width as the control for axis alignment.
              chartArea: {
                width: "70%"
              },
              hAxis: {
                slantedText: false,
                format: "MMMM yyyy"
              },
              vAxis: {
                format: "$0,000"
              }
            },
            // Convert the first column from 'date' to 'string'.
            view: mpaView
          });
          mpAnnualComparisonDashboard.bind(mpAnnualComparisonControl, mpAnnualComparisonChart);
          mpAnnualComparisonDashboard.draw(mpAnnualComparisonData);
          const scAnnualComparisonData = new google.visualization.DataTable(eval(chartData.d.soldCountAnnualComp));
          const scAnnualComparisonDashboard = new google.visualization.Dashboard(document.getElementById("scAnnualComparison"));
          const scAnnualComparisonControl = new google.visualization.ControlWrapper({
            controlType: "ChartRangeFilter",
            containerId: "scAnnualComparisonControl",
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: "LineChart",
                chartOptions: {
                  enableInteractivity: true,
                  height: 40,
                  chartArea: {
                    width: "70%"
                  },
                  hAxis: {
                    minValue: new Date((/* @__PURE__ */ new Date()).getFullYear() - 5, 0, 1),
                    // 'auto',
                    maxValue: new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1),
                    // 'auto'
                    textPosition: "none"
                  },
                  snapToData: true
                },
                // Thus, this view has two columns: the date (axis) and the county value
                chartView: {
                  columns: [0, 1]
                },
                minRangeSize: 864e5
                // 1 day in milliseconds = 24 * 60 * 60 * 1000 = 86,400,000
              }
            },
            state: rangestate
          });
          const scAnnualComparisonChart = new google.visualization.ChartWrapper({
            chartType: "LineChart",
            containerId: "scAnnualComparisonChart",
            options: {
              title: `Number of Sales Comparison - ${chartData.d.locationName}`,
              height: 400,
              // Use the same chart area width as the control for axis alignment.
              chartArea: {
                width: "70%"
              },
              hAxis: {
                slantedText: false,
                format: "MMM yyyy"
              },
              vAxes: [{}]
            },
            // Convert the first column from 'date' to 'string'.
            view: mpaView
          });
          scAnnualComparisonDashboard.bind(scAnnualComparisonControl, scAnnualComparisonChart);
          scAnnualComparisonDashboard.draw(scAnnualComparisonData);
          const categoryPicker = new google.visualization.ControlWrapper({
            controlType: "CategoryFilter",
            containerId: "mpYearSlider",
            options: {
              useFormattedValue: true,
              filterColumnLabel: "Month",
              ui: {
                caption: "Months",
                sortValues: false,
                allowTyping: false,
                allowMultiple: true,
                selectedValuesLayout: "aside"
              }
            },
            state: {
              selectedValues: []
            }
          });
          const categoryPicker2 = new google.visualization.ControlWrapper({
            controlType: "CategoryFilter",
            containerId: "mpYearSlider2",
            options: {
              useFormattedValue: true,
              filterColumnLabel: "Month",
              ui: {
                caption: "Months",
                sortValues: false,
                allowTyping: false,
                allowMultiple: true,
                selectedValuesLayout: "aside"
              }
            },
            state: {
              selectedValues: []
            }
          });
          const chCols = [{
            calc: (dataTable, rowIndex) => dataTable.getFormattedValue(rowIndex, 0),
            type: "string"
          }];
          for (let i2 = 1; i2 < chartData.d.medianPrice.cols.length; i2++) {
            chCols.push(i2);
          }
          const mpChart = new google.visualization.ChartWrapper({
            chartType: "ColumnChart",
            containerId: "chart_div",
            options: {
              title: `Median Price - ${chartData.d.locationName}`,
              height: 400,
              hAxis: {
                title: "Month",
                slantedText: false,
                showTextEvery: 1,
                minValue: 1,
                maxValue: 12,
                format: "#"
              },
              fontName: "Verdana"
            },
            view: {
              columns: chCols
            }
          });
          const scChart = new google.visualization.ChartWrapper({
            chartType: "ColumnChart",
            containerId: "sold_count_chart",
            options: {
              title: `Number of Sales - ${chartData.d.locationName}`,
              height: 400,
              hAxis: {
                title: "Month",
                showTextEvery: 1,
                minValue: 1,
                maxValue: 12,
                format: "#"
              },
              fontName: "Verdana"
            },
            view: {
              columns: chCols
            }
          });
          const mpData = new google.visualization.DataTable(chartData.d.medianPrice, 0.5);
          const scData = new google.visualization.DataTable(chartData.d.soldCount, 0.5);
          new google.visualization.Dashboard(document.getElementById("dashboard")).bind([categoryPicker], [mpChart]).draw(mpData);
          new google.visualization.Dashboard(document.getElementById("dashboard2")).bind([categoryPicker2], [scChart]).draw(scData);
        });
      };
      var loadData = () => {
        if (regionSelect.value === "WI") {
          tableData = data.filter((x) => x.grandparentName === regionSelect.value);
        } else if (countySelect.value !== "") {
          tableData = data.filter((x) => x.locationName === countySelect.value);
        } else {
          tableData = data.filter((x) => x.parentName === regionSelect.value);
          counties = tableData[0].grandparentName === "WI" ? [...new Set(tableData.map((x) => x.locationName))] : [];
          countySelect.parentNode.parentNode.hidden = counties.length === 0;
          if (counties.length) {
            countySelect.innerHTML = '<option value="">Please Choose</option>';
            counties.forEach((county) => {
              countySelect.innerHTML += `<option value="${county}">${county}</option>`;
            });
          }
        }
        years = [...new Set(tableData.map((x) => x.yearNumber))];
        chartData.d.years = years;
        chartData.d.locationName = countySelect.value === "" ? regionSelect.value : `${countySelect.value} County`;
        chartData.d.medianPrice.cols = [{
          id: "month",
          label: "Month",
          type: "number"
        }];
        chartData.d.medianPrice.rows = [];
        chartData.d.soldCount.cols = [{
          id: "month",
          label: "Month",
          type: "string"
        }];
        chartData.d.soldCount.rows = [];
        chartData.d.medianPriceAnnualComp.cols = [
          {
            id: "datereported",
            label: "Date Reported",
            type: "date"
          }
        ];
        chartData.d.medianPriceAnnualComp.rows = [];
        chartData.d.soldCountAnnualComp.cols = [
          {
            id: "datereported",
            label: "Date Reported",
            type: "date"
          }
        ];
        chartData.d.soldCountAnnualComp.rows = [];
        years.forEach((year, yindex) => {
          chartData.d.medianPrice.cols.push({
            id: year.toString(),
            label: year.toString(),
            type: "number"
          });
          chartData.d.soldCount.cols.push({
            id: year.toString(),
            label: year.toString(),
            type: "number"
          });
          months.forEach((month, mindex) => {
            const mpRow = {
              c: []
            };
            const scRow = {
              c: []
            };
            years.forEach((year2, y2index) => {
              const mpValues = tableData.filter((x) => x.datePartName === month && x.yearNumber === year2).map((x) => x.medianSalePrice);
              const mpValue = getMedianValue(mpValues);
              const scValues = tableData.filter((x) => x.datePartName === month && x.yearNumber === year2).map((x) => x.soldCount);
              const scValue = scValues.reduce((a, b) => a + b, 0);
              if (y2index <= yindex) {
                mpRow.c.push({
                  v: mpValue ? Math.round(mpValue) : null,
                  f: mpValue ? Math.round(mpValue).toLocaleString("en", currencyOptions) : null
                });
                scRow.c.push({
                  v: scValue || null,
                  f: scValue ? scValue.toLocaleString() : null
                });
              }
            });
            mpRow.c.push({
              v: `Date(${year},${mindex},1)`,
              f: `${month.slice(0, 3)} ${year}`
            });
            scRow.c.push({
              v: `Date(${year},${mindex},1)`,
              f: `${month.slice(0, 3)} ${year}`
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
            label: index === 0 ? "Value" : index === 1 ? "Prior year" : `${index} years prior`,
            type: "number"
          });
          chartData.d.soldCountAnnualComp.cols.push({
            id: year.toString(),
            label: index === 0 ? "Value" : index === 1 ? "Prior year" : `${index} years prior`,
            type: "number"
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
          years.forEach((year) => {
            const mpValues = tableData.filter((x) => x.datePartName === month && x.yearNumber === year).map((x) => x.medianSalePrice);
            const mpValue = getMedianValue(mpValues);
            const scValues = tableData.filter((x) => x.datePartName === month && x.yearNumber === year).map((x) => x.soldCount);
            const scValue = scValues.reduce((a, b) => a + b, 0);
            mpRow.c.push({
              v: mpValue ? Math.round(mpValue) : null,
              f: mpValue ? Math.round(mpValue).toLocaleString("en", currencyOptions) : ""
            });
            scRow.c.push({
              v: scValue || null,
              f: scValue ? `${scValue.toLocaleString()} Sales` : ""
            });
          });
          chartData.d.medianPrice.rows.push(mpRow);
          chartData.d.soldCount.rows.push(scRow);
        });
        chartData.d.latestYear = years.at(-1);
        chartData.d.latestMonth = tableData.filter((x) => x.yearNumber === years.at(-1)).at(-1).datePartNumber;
        if (regionSelect.value === "WI") {
          chartData.d.dataSetType = 0;
        } else if (countySelect.value === "") {
          chartData.d.dataSetType = 1;
        } else {
          chartData.d.dataSetType = 2;
        }
        buildTables();
        buildCharts();
      };
      fetch("/housing-statistics-data").then((res) => res.json()).then((res) => {
        data = res;
        housingStats.hidden = false;
        loader.hidden = true;
        loadData();
      });
      regionSelect.addEventListener("change", () => {
        countySelect.value = "";
        countySelect.parentNode.parentNode.hidden = regionSelect.value === "WI";
        loadData();
      });
      countySelect.addEventListener("change", () => {
        loadData();
      });
      housingStatsToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
          toggle.classList.replace("btn-secondary", "btn-primary");
          toggle.style.pointerEvents = "none";
          housingStatsToggles.forEach((toggle2) => {
            if (toggle2 !== toggle) {
              toggle2.classList.replace("btn-primary", "btn-secondary");
              toggle2.style.pointerEvents = "";
            }
          });
          showQuarters = toggle.dataset.label === "Quarter";
          housingStatsHeading.querySelector("span").innerText = toggle.dataset.label;
          buildTables();
        });
      });
    }
  });
  require_housing_statistics();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbXBvbmVudHMvdGFibGUtaG92ZXIuanMiLCAiLi4vc3JjL2hvdXNpbmctc3RhdGlzdGljcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZnVuY3Rpb24gQSAodGFibGUpIHtcclxuICAgIHZhciByb3dzID0gdGFibGUucm93cztcclxuICAgIHZhciByb3dDb3VudCA9IHJvd3MubGVuZ3RoO1xyXG4gICAgdmFyIGNlbGxJbmRleE1hcCA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93Q291bnQ7IGkrKykge1xyXG4gICAgICAgIHZhciBjZWxscyA9IHJvd3NbaV0uY2VsbHM7XHJcbiAgICAgICAgdmFyIGNlbGxDb3VudCA9IGNlbGxzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxDb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gY2VsbHNbal07XHJcbiAgICAgICAgICAgIHZhciByb3dTcGFuID0gY2VsbC5yb3dTcGFuIHx8IDE7XHJcbiAgICAgICAgICAgIHZhciBjb2xTcGFuID0gY2VsbC5jb2xTcGFuIHx8IDE7XHJcbiAgICAgICAgICAgIHZhciBjb2xJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjZWxsSW5kZXhNYXBbaV0pIHtcclxuICAgICAgICAgICAgICAgIGNlbGxJbmRleE1hcFtpXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpbmRleFJvdyA9IGNlbGxJbmRleE1hcFtpXTtcclxuICAgICAgICAgICAgd2hpbGUgKGluZGV4Um93WysrY29sSW5kZXhdKSB7fVxyXG5cclxuICAgICAgICAgICAgY2VsbC5yZWFsSW5kZXggPSBjb2xJbmRleDtcclxuICAgICAgICAgICAgZm9yICh2YXIgcm93T2Zmc2V0ID0gaTsgcm93T2Zmc2V0IDwgaSArIHJvd1NwYW47IHJvd09mZnNldCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNlbGxJbmRleE1hcFtyb3dPZmZzZXRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4TWFwW3Jvd09mZnNldF0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciByb3cgPSBjZWxsSW5kZXhNYXBbcm93T2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGNvbE9mZnNldCA9IGNvbEluZGV4OyBjb2xPZmZzZXQgPCBjb2xJbmRleCArIGNvbFNwYW47IGNvbE9mZnNldCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93W2NvbE9mZnNldF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBCICh0YWJsZSkge1xyXG4gICAgdmFyIHJvd0luZGV4ID0gMDtcclxuICAgIHZhciByb3dzLCByb3dDb3VudCwgaTtcclxuXHJcbiAgICBpZiAodGFibGUudEhlYWQpIHtcclxuICAgICAgICByb3dzID0gdGFibGUudEhlYWQucm93cztcclxuICAgICAgICByb3dDb3VudCA9IHJvd3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByb3dDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJvd3NbaV0ucmVhbFJJbmRleCA9IHJvd0luZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIHRCb2R5SW5kZXggPSAwOyB0Qm9keUluZGV4IDwgdGFibGUudEJvZGllcy5sZW5ndGg7IHRCb2R5SW5kZXgrKykge1xyXG4gICAgICAgIHJvd3MgPSB0YWJsZS50Qm9kaWVzW3RCb2R5SW5kZXhdLnJvd3M7XHJcbiAgICAgICAgcm93Q291bnQgPSByb3dzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcm93Q291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICByb3dzW2ldLnJlYWxSSW5kZXggPSByb3dJbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGFibGUudEZvb3QpIHtcclxuICAgICAgICByb3dzID0gdGFibGUudEZvb3Qucm93cztcclxuICAgICAgICByb3dDb3VudCA9IHJvd3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByb3dDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJvd3NbaV0ucmVhbFJJbmRleCA9IHJvd0luZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5IVE1MVGFibGVFbGVtZW50LnByb3RvdHlwZS50YWJsZUhvdmVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIHZhciBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgIGFsbG93SGVhZDogdHJ1ZSxcclxuICAgICAgICBhbGxvd0JvZHk6IHRydWUsXHJcbiAgICAgICAgYWxsb3dGb290OiB0cnVlLFxyXG4gICAgICAgIGhlYWRSb3dzOiBmYWxzZSxcclxuICAgICAgICBib2R5Um93czogdHJ1ZSxcclxuICAgICAgICBmb290Um93czogZmFsc2UsXHJcbiAgICAgICAgc3BhblJvd3M6IHRydWUsXHJcbiAgICAgICAgaGVhZENvbHM6IGZhbHNlLFxyXG4gICAgICAgIGJvZHlDb2xzOiB0cnVlLFxyXG4gICAgICAgIGZvb3RDb2xzOiBmYWxzZSxcclxuICAgICAgICBzcGFuQ29sczogdHJ1ZSxcclxuICAgICAgICBpZ25vcmVDb2xzOiBbXSxcclxuICAgICAgICBoZWFkQ2VsbHM6IGZhbHNlLFxyXG4gICAgICAgIGJvZHlDZWxsczogdHJ1ZSxcclxuICAgICAgICBmb290Q2VsbHM6IGZhbHNlLFxyXG4gICAgICAgIHJvd0NsYXNzOiAnaG92ZXInLFxyXG4gICAgICAgIGNvbENsYXNzOiAnJyxcclxuICAgICAgICBjZWxsQ2xhc3M6ICcnLFxyXG4gICAgICAgIGNsaWNrQ2xhc3M6ICcnXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB2YXIgdGFibGUgPSB0aGlzO1xyXG4gICAgdmFyIGNvbENlbGxzID0gW10sIHJvd0NlbGxzID0gW10sIGhvdmVyQ2xhc3NJbmRleCA9IDAsIHByZXZpb3VzSG92ZXIgPSBbLTEsIC0xXTtcclxuXHJcbiAgICBpZiAoIXRhYmxlLnRCb2RpZXMgfHwgIXRhYmxlLnRCb2RpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcENlbGxzKHJvd3MsIHNlY3Rpb24pIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyssIGhvdmVyQ2xhc3NJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSByb3dzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJvdy5jZWxscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cuY2VsbHNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlY3Rpb24gPT09ICdUQk9EWScgJiYgc2V0dGluZ3MuYm9keVJvd3MpIHx8IFxyXG4gICAgICAgICAgICAgICAgICAgIChzZWN0aW9uID09PSAnVEZPT1QnICYmIHNldHRpbmdzLmZvb3RSb3dzKSB8fCBcclxuICAgICAgICAgICAgICAgICAgICAoc2VjdGlvbiA9PT0gJ1RIRUFEJyAmJiBzZXR0aW5ncy5oZWFkUm93cykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93U3BhbiA9IGNlbGwucm93U3BhbjtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoLS1yb3dTcGFuID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Q2VsbHNbaG92ZXJDbGFzc0luZGV4ICsgcm93U3Bhbl0ucHVzaChjZWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChzZWN0aW9uID09PSAnVEJPRFknICYmIHNldHRpbmdzLmJvZHlDb2xzKSB8fCBcclxuICAgICAgICAgICAgICAgICAgICAoc2VjdGlvbiA9PT0gJ1RIRUFEJyAmJiBzZXR0aW5ncy5oZWFkQ29scykgfHwgXHJcbiAgICAgICAgICAgICAgICAgICAgKHNlY3Rpb24gPT09ICdURk9PVCcgJiYgc2V0dGluZ3MuZm9vdENvbHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbFNwYW4gPSBjZWxsLmNvbFNwYW47XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKC0tY29sU3BhbiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xJbmRleCA9IGNlbGwucmVhbEluZGV4ICsgY29sU3BhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmlnbm9yZUNvbHMuaW5jbHVkZXMoY29sSW5kZXggKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjb2xDZWxsc1tjb2xJbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbENlbGxzW2NvbEluZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbENlbGxzW2NvbEluZGV4XS5wdXNoKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlY3Rpb24gPT09ICdUQk9EWScgJiYgc2V0dGluZ3MuYWxsb3dCb2R5KSB8fCBcclxuICAgICAgICAgICAgICAgICAgICAoc2VjdGlvbiA9PT0gJ1RIRUFEJyAmJiBzZXR0aW5ncy5hbGxvd0hlYWQpIHx8IFxyXG4gICAgICAgICAgICAgICAgICAgIChzZWN0aW9uID09PSAnVEZPT1QnICYmIHNldHRpbmdzLmFsbG93Rm9vdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjZWxsLnRob3ZlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaG92ZXJIYW5kbGVyKGV2ZW50LCBpc0hvdmVyKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB3aGlsZSAodGFyZ2V0ICE9PSB0YWJsZSAmJiAhdGFyZ2V0LnRob3Zlcikge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhcmdldC50aG92ZXIpIHtcclxuICAgICAgICAgICAgaGFuZGxlSG92ZXIodGFyZ2V0LCBpc0hvdmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICB3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gdGFibGUgJiYgIXRhcmdldC50aG92ZXIpIHtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQudGhvdmVyICYmIHNldHRpbmdzLmNsaWNrQ2xhc3MpIHtcclxuICAgICAgICAgICAgdmFyIGNvbEluZGV4ID0gdGFyZ2V0LnJlYWxJbmRleDtcclxuICAgICAgICAgICAgdmFyIHJvd0luZGV4ID0gdGFyZ2V0LnBhcmVudE5vZGUucmVhbFJJbmRleDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbGlja2VkQ2VsbHMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0ZC4nICsgc2V0dGluZ3MuY2xpY2tDbGFzcyArICcsIHRoLicgKyBzZXR0aW5ncy5jbGlja0NsYXNzKTtcclxuICAgICAgICAgICAgY2xpY2tlZENlbGxzLmZvckVhY2goZnVuY3Rpb24gKGNlbGwpIHtcclxuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGlja0NsYXNzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29sSW5kZXggIT09IHByZXZpb3VzSG92ZXJbMF0gfHwgcm93SW5kZXggIT09IHByZXZpb3VzSG92ZXJbMV0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzVG9BZGQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5yb3dDbGFzcykgY2xhc3Nlc1RvQWRkLnB1c2goJy4nICsgc2V0dGluZ3Mucm93Q2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNvbENsYXNzKSBjbGFzc2VzVG9BZGQucHVzaCgnLicgKyBzZXR0aW5ncy5jb2xDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuY2VsbENsYXNzKSBjbGFzc2VzVG9BZGQucHVzaCgnLicgKyBzZXR0aW5ncy5jZWxsQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzVG9BZGQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNlbGxzVG9Ib3ZlciA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkLCB0aCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxzVG9Ib3Zlci5mb3JFYWNoKGZ1bmN0aW9uIChjZWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGFzc2VzVG9BZGQuc29tZShjbHMgPT4gY2VsbC5tYXRjaGVzKGNscykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoc2V0dGluZ3MuY2xpY2tDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByZXZpb3VzSG92ZXIgPSBbY29sSW5kZXgsIHJvd0luZGV4XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByZXZpb3VzSG92ZXIgPSBbLTEsIC0xXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVIb3ZlcihjZWxsLCBpc0hvdmVyKSB7XHJcbiAgICAgICAgdmFyIGhvdmVyQWN0aW9uID0gaXNIb3ZlciA/ICdhZGQnIDogJ3JlbW92ZSc7XHJcbiAgICAgICAgdmFyIGNvbEluZGV4ID0gY2VsbC5yZWFsSW5kZXg7XHJcblxyXG4gICAgICAgIGlmIChzZXR0aW5ncy5jb2xDbGFzcykge1xyXG4gICAgICAgICAgICB2YXIgY29sQ2VsbFNwYW4gPSBjZWxsLmNvbFNwYW47XHJcbiAgICAgICAgICAgIHZhciBjb2xIb3ZlckNlbGxzID0gY29sQ2VsbHNbY29sSW5kZXhdIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgc2V0dGluZ3Muc3BhbkNvbHMgJiYgaSA8IGNvbENlbGxTcGFuICYmIGNvbENlbGxzW2NvbEluZGV4ICsgaV07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29sSG92ZXJDZWxscyA9IGNvbEhvdmVyQ2VsbHMuY29uY2F0KGNvbENlbGxzW2NvbEluZGV4ICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbEhvdmVyQ2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY29sQ2VsbCkge1xyXG4gICAgICAgICAgICAgICAgY29sQ2VsbC5jbGFzc0xpc3RbaG92ZXJBY3Rpb25dKHNldHRpbmdzLmNvbENsYXNzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2V0dGluZ3Mucm93Q2xhc3MpIHtcclxuICAgICAgICAgICAgdmFyIHJvd0luZGV4ID0gY2VsbC5wYXJlbnROb2RlLnJlYWxSSW5kZXg7XHJcbiAgICAgICAgICAgIHZhciByb3dIb3ZlckNlbGxzID0gcm93Q2VsbHNbcm93SW5kZXhdIHx8IFtdO1xyXG4gICAgICAgICAgICB2YXIgcm93U3BhbiA9IGNlbGwucm93U3BhbjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IHNldHRpbmdzLnNwYW5Sb3dzICYmIGkgPCByb3dTcGFuICYmIHJvd0NlbGxzW3Jvd0luZGV4ICsgaV07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcm93SG92ZXJDZWxscyA9IHJvd0hvdmVyQ2VsbHMuY29uY2F0KHJvd0NlbGxzW3Jvd0luZGV4ICsgaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvd0hvdmVyQ2VsbHMuZm9yRWFjaChmdW5jdGlvbiAocm93Q2VsbCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q2VsbC5jbGFzc0xpc3RbaG92ZXJBY3Rpb25dKHNldHRpbmdzLnJvd0NsYXNzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2V0dGluZ3MuY2VsbENsYXNzKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWN0aW9uTmFtZSA9IGNlbGwucGFyZW50Tm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmICgoc2VjdGlvbk5hbWUgPT09ICdUQk9EWScgJiYgc2V0dGluZ3MuYm9keUNlbGxzKSB8fCBcclxuICAgICAgICAgICAgICAgIChzZWN0aW9uTmFtZSA9PT0gJ1RIRUFEJyAmJiBzZXR0aW5ncy5oZWFkQ2VsbHMpIHx8IFxyXG4gICAgICAgICAgICAgICAgKHNlY3Rpb25OYW1lID09PSAnVEZPT1QnICYmIHNldHRpbmdzLmZvb3RDZWxscykpIHtcclxuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0W2hvdmVyQWN0aW9uXShzZXR0aW5ncy5jZWxsQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEEodGFibGUpO1xyXG4gICAgXHJcbiAgICBCKHRhYmxlKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlLnJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICByb3dDZWxsc1tpXSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YWJsZS50SGVhZCkge1xyXG4gICAgICAgIG1hcENlbGxzKHRhYmxlLnRIZWFkLnJvd3MsICdUSEVBRCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIHRCb2R5SW5kZXggPSAwOyB0Qm9keUluZGV4IDwgdGFibGUudEJvZGllcy5sZW5ndGg7IHRCb2R5SW5kZXgrKykge1xyXG4gICAgICAgIG1hcENlbGxzKHRhYmxlLnRCb2RpZXNbdEJvZHlJbmRleF0ucm93cywgJ1RCT0RZJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRhYmxlLnRGb290KSB7XHJcbiAgICAgICAgbWFwQ2VsbHModGFibGUudEZvb3Qucm93cywgJ1RGT09UJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaG92ZXJIYW5kbGVyKGV2ZW50LCB0cnVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaG92ZXJIYW5kbGVyKGV2ZW50LCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XHJcbn07IiwgImltcG9ydCAnLi9jb21wb25lbnRzL3RhYmxlLWhvdmVyLmpzJztcclxuXHJcbmNvbnN0IHJlZ2lvblNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZWdpb24tc2VsZWN0Jyk7XHJcbmNvbnN0IGNvdW50eVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3VudHktc2VsZWN0Jyk7XHJcbmNvbnN0IGhvdXNpbmdTdGF0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ob3VzaW5nLXN0YXRzJyk7XHJcbmNvbnN0IGhvdXNpbmdTdGF0c0hlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaG91c2luZy1zdGF0c19faGVhZGluZycpO1xyXG5jb25zdCBob3VzaW5nU3RhdHNUb2dnbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWhvdXNpbmctc3RhdHNfX3RvZ2dsZScpO1xyXG5jb25zdCBob21lU2FsZXNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ob21lLXNhbGVzLXRhYmxlJyk7XHJcbmNvbnN0IG1lZGlhblByaWNlVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbWVkaWFuLXByaWNlLXRhYmxlJyk7XHJcbmNvbnN0IGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXN1bHRzLWxvYWRlcicpO1xyXG5cclxuY29uc3QgbW9udGhzID0gWy4uLkFycmF5KDEyKS5rZXlzKCldLm1hcChrZXkgPT4gbmV3IERhdGUoMCwga2V5KS50b0xvY2FsZVN0cmluZygnZW4nLCB7IG1vbnRoOiAnbG9uZycgfSkpO1xyXG5jb25zdCBxdWFydGVycyA9IFsxLCAyLCAzLCA0XTtcclxubGV0IGNvdW50aWVzID0gW107XHJcbmxldCB5ZWFycyA9IFtdO1xyXG5sZXQgc2hvd1F1YXJ0ZXJzID0gZmFsc2U7XHJcblxyXG5sZXQgZGF0YSA9IFtdO1xyXG5sZXQgdGFibGVEYXRhID0gW107XHJcbmNvbnN0IGNoYXJ0RGF0YSA9IHtcclxuICAgIGQ6IHtcclxuICAgICAgICBsb2NhdGlvbk5hbWU6ICcnLFxyXG4gICAgICAgIHllYXJzOiBbXSxcclxuICAgICAgICBtZWRpYW5QcmljZToge1xyXG4gICAgICAgICAgICBjb2xzOiBbXSxcclxuICAgICAgICAgICAgcm93czogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvbGRDb3VudDoge1xyXG4gICAgICAgICAgICBjb2xzOiBbXSxcclxuICAgICAgICAgICAgcm93czogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lZGlhblByaWNlQW5udWFsQ29tcDoge1xyXG4gICAgICAgICAgICBjb2xzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdkYXRlcmVwb3J0ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBSZXBvcnRlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJvd3M6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzb2xkQ291bnRBbm51YWxDb21wOiB7XHJcbiAgICAgICAgICAgIGNvbHM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2RhdGVyZXBvcnRlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdEYXRlIFJlcG9ydGVkJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGF0ZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcm93czogW11cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBjdXJyZW5jeU9wdGlvbnMgPSB7XHJcbiAgICBzdHlsZTogJ2N1cnJlbmN5JyxcclxuICAgIGN1cnJlbmN5OiAnVVNEJyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMFxyXG59O1xyXG5cclxuY29uc3QgZ2V0TWVkaWFuVmFsdWUgPSBhcnIgPT4ge1xyXG4gICAgY29uc3QgcyA9IFsuLi5hcnJdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3Iocy5sZW5ndGggLyAyKTtcclxuICAgIHJldHVybiBzLmxlbmd0aCAlIDIgPyBzW21pZF0gOiAoKHNbbWlkIC0gMV0gKyBzW21pZF0pIC8gMik7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFRhYmxlID0gdGFibGUgPT4ge1xyXG4gICAgY29uc3QgdGhlYWQgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpO1xyXG4gICAgY29uc3QgdGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xyXG5cclxuICAgIHRoZWFkLmlubmVySFRNTCA9ICc8dHI+PHRoIGNsYXNzPVwicC0yXCI+PC90aD48L3RyPic7XHJcbiAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBpZiAoc2hvd1F1YXJ0ZXJzKSB7XHJcbiAgICAgICAgcXVhcnRlcnMuZm9yRWFjaChxdWFydGVyID0+IHRoZWFkLnF1ZXJ5U2VsZWN0b3IoJ3RyJykuaW5uZXJIVE1MICs9IGA8dGggY2xhc3M9XCJwLTJcIj5RJHtxdWFydGVyfTwvdGg+YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1vbnRocy5mb3JFYWNoKG1vbnRoID0+IHRoZWFkLnF1ZXJ5U2VsZWN0b3IoJ3RyJykuaW5uZXJIVE1MICs9IGA8dGggY2xhc3M9XCJwLTJcIj4ke21vbnRoLnNsaWNlKDAsMyl9PC90aD5gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGVhZC5xdWVyeVNlbGVjdG9yKCd0cicpLmlubmVySFRNTCArPSAnPHRoIGNsYXNzPVwicC0yXCI+WVREPC90aD4nO1xyXG5cclxuICAgIHllYXJzLmZvckVhY2goeWVhciA9PiB7XHJcbiAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG5cclxuICAgICAgICB0Ym9keS5hcHBlbmQodHIpO1xyXG4gICAgICAgIHRyLmlubmVySFRNTCA9IGA8dGQgY2xhc3M9XCJwLTJcIj4ke3llYXJ9PC90ZD5gO1xyXG5cclxuICAgICAgICBpZiAodGFibGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1ob21lLXNhbGVzLXRhYmxlJykpIHtcclxuICAgICAgICAgICAgY29uc3QgeXRkVmFsdWVzID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAoc2hvd1F1YXJ0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBxdWFydGVycy5mb3JFYWNoKChfLCBxaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtb250aHMuc2xpY2UocWluZGV4ICogMywgcWluZGV4ICogMyArIDMpLmZvckVhY2gobW9udGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSB0YWJsZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LmRhdGVQYXJ0TmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG1vbnRoLnRvTG93ZXJDYXNlKCkpICYmIHgueWVhck51bWJlciA9PT0geWVhcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoeCA9PiB4LnNvbGRDb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHZhbHVlcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeXRkVmFsdWVzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyLmlubmVySFRNTCArPSBgPHRkIGNsYXNzPVwicC0yXCI+JHt2YWx1ZSA/IHZhbHVlLnRvTG9jYWxlU3RyaW5nKCkgOiAnbi9hJ308L3RkPmA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vbnRocy5mb3JFYWNoKG1vbnRoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSB0YWJsZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHguZGF0ZVBhcnROYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobW9udGgudG9Mb3dlckNhc2UoKSkgJiYgeC55ZWFyTnVtYmVyID09PSB5ZWFyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKHggPT4geC5zb2xkQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB5dGRWYWx1ZXMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHIuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwLTJcIj4ke3ZhbHVlID8gdmFsdWUudG9Mb2NhbGVTdHJpbmcoKSA6ICduL2EnfTwvdGQ+YDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB5dGRWYWx1ZSA9IHl0ZFZhbHVlcy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKTtcclxuICAgICAgICAgICAgdHIuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwLTJcIj4ke3l0ZFZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC90ZD5gO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFibGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1tZWRpYW4tcHJpY2UtdGFibGUnKSkge1xyXG4gICAgICAgICAgICBpZiAoc2hvd1F1YXJ0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBxdWFydGVycy5mb3JFYWNoKChfLCBxaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRocy5zbGljZShxaW5kZXggKiAzLCBxaW5kZXggKiAzICsgMykuZm9yRWFjaChtb250aCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1YXJ0ZXJWYWx1ZXMgPSB0YWJsZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHguZGF0ZVBhcnROYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobW9udGgudG9Mb3dlckNhc2UoKSkgJiYgeC55ZWFyTnVtYmVyID09PSB5ZWFyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKHggPT4geC5tZWRpYW5TYWxlUHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHF1YXJ0ZXJWYWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlcy5sZW5ndGggPyBnZXRNZWRpYW5WYWx1ZSh2YWx1ZXMpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2xsYXJzID0gdmFsdWUgIT09IDAgPyB2YWx1ZS50b0xvY2FsZVN0cmluZygnZW4nLCBjdXJyZW5jeU9wdGlvbnMpIDogJ24vYSc7XHJcbiAgICAgICAgICAgICAgICAgICAgdHIuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwLTJcIj4ke2RvbGxhcnN9PC90ZD5gO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb250aHMuZm9yRWFjaChtb250aCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gdGFibGVEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4LmRhdGVQYXJ0TmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKG1vbnRoLnRvTG93ZXJDYXNlKCkpICYmIHgueWVhck51bWJlciA9PT0geWVhcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCh4ID0+IHgubWVkaWFuU2FsZVByaWNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlcy5sZW5ndGggPyBnZXRNZWRpYW5WYWx1ZSh2YWx1ZXMpIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb2xsYXJzID0gdmFsdWUgIT09IDAgPyB2YWx1ZS50b0xvY2FsZVN0cmluZygnZW4nLCBjdXJyZW5jeU9wdGlvbnMpIDogJ24vYSc7XHJcbiAgICAgICAgICAgICAgICAgICAgdHIuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwLTJcIj4ke2RvbGxhcnN9PC90ZD5gO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHl0ZFZhbHVlcyA9IHRhYmxlRGF0YS5maWx0ZXIoeCA9PiB4LnllYXJOdW1iZXIgPT09IHllYXIpLm1hcCh4ID0+IHgubWVkaWFuU2FsZVByaWNlKTtcclxuICAgICAgICAgICAgY29uc3QgeXRkVmFsdWUgPSBnZXRNZWRpYW5WYWx1ZSh5dGRWYWx1ZXMpO1xyXG4gICAgICAgICAgICBjb25zdCB5dGREb2xsYXJzID0geXRkVmFsdWUudG9Mb2NhbGVTdHJpbmcoJ2VuJywgY3VycmVuY3lPcHRpb25zKTtcclxuICAgICAgICAgICAgdHIuaW5uZXJIVE1MICs9IGA8dGQgY2xhc3M9XCJwLTJcIj4ke3l0ZERvbGxhcnN9PC90ZD5gO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRhYmxlLnRhYmxlSG92ZXIoe1xyXG4gICAgICAgIGhlYWRSb3dzOiBmYWxzZSxcclxuICAgICAgICBoZWFkQ29sczogZmFsc2UsXHJcbiAgICAgICAgaWdub3JlQ29sczogWzFdLFxyXG4gICAgICAgIGNvbENsYXNzOiAnaG92ZXInLFxyXG4gICAgICAgIGNlbGxDbGFzczogJ2hvdmVyLWNlbGwnLFxyXG4gICAgICAgIGNsaWNrQ2xhc3M6ICdjbGljay1ob3ZlcidcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRUYWJsZXMgPSAoKSA9PiB7XHJcbiAgICBbaG9tZVNhbGVzVGFibGUsIG1lZGlhblByaWNlVGFibGVdLmZvckVhY2godGFibGUgPT4ge1xyXG4gICAgICAgIGJ1aWxkVGFibGUodGFibGUpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENoYXJ0cyA9ICgpID0+IHtcclxuICAgIGdvb2dsZS5jaGFydHMubG9hZCgnY3VycmVudCcsIHsgcGFja2FnZXM6IFsnY29yZWNoYXJ0JywgJ2NvbnRyb2xzJywgJ3RhYmxlJ10gfSk7XHJcblxyXG4gICAgZ29vZ2xlLmNoYXJ0cy5zZXRPbkxvYWRDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGVtcFllYXJzID0gW107XHJcbiAgICAgICAgY29uc3QgeWVhcnNUb1Nob3cgPSA1O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0RGF0YS5kLnllYXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIoY2hhcnREYXRhLmQueWVhcnNbaV0pID4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0geWVhcnNUb1Nob3cpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBZZWFycy5wdXNoKGNoYXJ0RGF0YS5kLnllYXJzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhcnREYXRhLmQueWVhcnMgPSB0ZW1wWWVhcnM7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlbXBSb3dzID0gW107XHJcbiAgICAgICAgY29uc3QgdGVtcENvbHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAucm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobmV3IERhdGUoZXZhbChjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAucm93c1tpXS5jWzBdLnYpKS5nZXRGdWxsWWVhcigpID49IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIHllYXJzVG9TaG93KSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93cy5wdXNoKGNoYXJ0RGF0YS5kLm1lZGlhblByaWNlQW5udWFsQ29tcC5yb3dzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAuY29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sID0gY2hhcnREYXRhLmQubWVkaWFuUHJpY2VBbm51YWxDb21wLmNvbHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjb2wudHlwZSA9PSAnZGF0ZScgfHwgTnVtYmVyKGNvbC5pZCkgPiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSB5ZWFyc1RvU2hvdykge1xyXG4gICAgICAgICAgICAgICAgdGVtcENvbHMucHVzaChjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAuY29sc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXJ0RGF0YS5kLm1lZGlhblByaWNlQW5udWFsQ29tcC5yb3dzID0gdGVtcFJvd3M7XHJcbiAgICAgICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2VBbm51YWxDb21wLmNvbHMgPSB0ZW1wQ29scztcclxuXHJcbiAgICAgICAgY29uc3QgdGVtcFJvd3NUd28gPSBbXTtcclxuICAgICAgICBjb25zdCB0ZW1wQ29sc1R3byA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0RGF0YS5kLnNvbGRDb3VudEFubnVhbENvbXAucm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobmV3IERhdGUoZXZhbChjaGFydERhdGEuZC5zb2xkQ291bnRBbm51YWxDb21wLnJvd3NbaV0uY1swXS52KSkuZ2V0RnVsbFllYXIoKSA+PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSB5ZWFyc1RvU2hvdykge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd3NUd28ucHVzaChjaGFydERhdGEuZC5zb2xkQ291bnRBbm51YWxDb21wLnJvd3NbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0RGF0YS5kLnNvbGRDb3VudEFubnVhbENvbXAuY29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY29sID0gY2hhcnREYXRhLmQuc29sZENvdW50QW5udWFsQ29tcC5jb2xzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY29sLnR5cGUgPT0gJ2RhdGUnIHx8IE51bWJlcihjb2wuaWQpID4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0geWVhcnNUb1Nob3cpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBDb2xzVHdvLnB1c2goY2hhcnREYXRhLmQuc29sZENvdW50QW5udWFsQ29tcC5jb2xzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhcnREYXRhLmQuc29sZENvdW50QW5udWFsQ29tcC5yb3dzID0gdGVtcFJvd3NUd287XHJcbiAgICAgICAgY2hhcnREYXRhLmQuc29sZENvdW50QW5udWFsQ29tcC5jb2xzID0gdGVtcENvbHNUd287XHJcblxyXG4gICAgICAgIGNvbnN0IHRlbXBSb3dzVGhyZWUgPSBbXTtcclxuICAgICAgICBjb25zdCB0ZW1wQ29sc1RocmVlID0gY2hhcnREYXRhLmQubWVkaWFuUHJpY2UuY29scyA9IFsuLi5jaGFydERhdGEuZC5tZWRpYW5QcmljZS5jb2xzLnNsaWNlKDAsIDEpLCAuLi5jaGFydERhdGEuZC5tZWRpYW5QcmljZS5jb2xzLnNsaWNlKGNoYXJ0RGF0YS5kLm1lZGlhblByaWNlLmNvbHMubGVuZ3RoIC0geWVhcnNUb1Nob3cpXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFydERhdGEuZC5tZWRpYW5QcmljZS5yb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gY2hhcnREYXRhLmQubWVkaWFuUHJpY2Uucm93c1tpXS5jO1xyXG4gICAgICAgICAgICBsZXQgdHJ3ID0gWy4uLnJvd3Muc2xpY2UoMCwgMSksIC4uLnJvd3Muc2xpY2Uocm93cy5sZW5ndGggLSB5ZWFyc1RvU2hvdyldXHJcbiAgICAgICAgICAgIHRlbXBSb3dzVGhyZWUucHVzaCh7IGM6IHRyd30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2Uucm93cyA9IHRlbXBSb3dzVGhyZWU7XHJcbiAgICAgICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2UuY29scyA9IHRlbXBDb2xzVGhyZWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlbXBSb3dzRm91ciA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHRlbXBDb2xzRm91ciA9IGNoYXJ0RGF0YS5kLnNvbGRDb3VudC5jb2xzID0gWy4uLmNoYXJ0RGF0YS5kLnNvbGRDb3VudC5jb2xzLnNsaWNlKDAsIDEpLCAuLi5jaGFydERhdGEuZC5zb2xkQ291bnQuY29scy5zbGljZShjaGFydERhdGEuZC5zb2xkQ291bnQuY29scy5sZW5ndGggLSB5ZWFyc1RvU2hvdyldO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJ0RGF0YS5kLnNvbGRDb3VudC5yb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dzID0gY2hhcnREYXRhLmQuc29sZENvdW50LnJvd3NbaV0uYztcclxuICAgICAgICAgICAgbGV0IHRydyA9IFsuLi5yb3dzLnNsaWNlKDAsIDEpLCAuLi5yb3dzLnNsaWNlKHJvd3MubGVuZ3RoIC0geWVhcnNUb1Nob3cpXVxyXG4gICAgICAgICAgICB0ZW1wUm93c0ZvdXIucHVzaCh7IGM6IHRydyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudC5yb3dzID0gdGVtcFJvd3NGb3VyO1xyXG4gICAgICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudC5jb2xzID0gdGVtcENvbHNGb3VyO1xyXG5cclxuICAgICAgICAvLyBzZXQgaW5pdGlhbCByYW5nZSBmb3IgQ2hhcnRSYW5nZUZpbHRlclxyXG4gICAgICAgIGNvbnN0IHJhbmdlc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUoY2hhcnREYXRhLmQubGF0ZXN0WWVhciAtIDEsIGNoYXJ0RGF0YS5kLmxhdGVzdE1vbnRoIC0gMSwgMSksXHJcbiAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKGNoYXJ0RGF0YS5kLmxhdGVzdFllYXIsIGNoYXJ0RGF0YS5kLmxhdGVzdE1vbnRoIC0gMSwgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBtcGFWaWV3O1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGNoYXJ0RGF0YS5kLkRhdGFTZXRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIC8vIHN0YXRld2lkZSwgcGxvdCByZWdpb25zIGFuZCBzdGF0ZXdpZGUgZGF0YVxyXG4gICAgICAgICAgICAgICAgbXBhVmlldyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGM6IChkYXRhVGFibGUsIHJvd0luZGV4KSA9PiBkYXRhVGFibGUuZ2V0Rm9ybWF0dGVkVmFsdWUocm93SW5kZXgsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAuY29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1wYVZpZXcuY29sdW1ucy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gcmVnaW9uLCBwbG90IGNvdW50aWVzIGFuZCBzdGF0ZXdpZGUgYXMgd2VsbFxyXG4gICAgICAgICAgICAgICAgbXBhVmlldyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGM6IChkYXRhVGFibGUsIHJvd0luZGV4KSA9PiBkYXRhVGFibGUuZ2V0Rm9ybWF0dGVkVmFsdWUocm93SW5kZXgsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAuY29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1wYVZpZXcuY29sdW1ucy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgbXBhVmlldyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGM6IChkYXRhVGFibGUsIHJvd0luZGV4KSA9PiBkYXRhVGFibGUuZ2V0Rm9ybWF0dGVkVmFsdWUocm93SW5kZXgsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAuY29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1wYVZpZXcuY29sdW1ucy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbXBBbm51YWxDb21wYXJpc29uRGF0YSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoZXZhbChjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXApKTtcclxuICAgICAgICBjb25zdCBtcEFubnVhbENvbXBhcmlzb25EYXNoYm9hcmQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGFzaGJvYXJkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtcEFubnVhbENvbXBhcmlzb24nKSk7XHJcbiAgICAgICAgY29uc3QgbXBBbm51YWxDb21wYXJpc29uQ29udHJvbCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db250cm9sV3JhcHBlcih7XHJcbiAgICAgICAgICAgIGNvbnRyb2xUeXBlOiAnQ2hhcnRSYW5nZUZpbHRlcicsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcklkOiAnbXBBbm51YWxDb21wYXJpc29uQ29udHJvbCcsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckNvbHVtbkluZGV4OiAwLFxyXG4gICAgICAgICAgICAgICAgdWk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydFR5cGU6ICdMaW5lQ2hhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVJbnRlcmFjdGl2aXR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFydEFyZWE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNzAlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoQXhpczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtNSwgMCwgMSksIC8vICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIG5ldyBEYXRlKCkuZ2V0TW9udGgoKSwgMSksIC8vICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFBvc2l0aW9uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc25hcFRvRGF0YTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGh1cywgdGhpcyB2aWV3IGhhcyB0d28gY29sdW1uczogdGhlIGRhdGUgKGF4aXMpIGFuZCB0aGUgY291bnR5IHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcnRWaWV3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFswLCAxXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWluUmFuZ2VTaXplOiA4NjQwMDAwMCAvLyAxIGRheSBpbiBtaWxsaXNlY29uZHMgPSAyNCAqIDYwICogNjAgKiAxMDAwID0gODYsNDAwLDAwMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdGF0ZTogcmFuZ2VzdGF0ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBtcEFubnVhbENvbXBhcmlzb25DaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5DaGFydFdyYXBwZXIoe1xyXG4gICAgICAgICAgICBjaGFydFR5cGU6ICdMaW5lQ2hhcnQnLFxyXG4gICAgICAgICAgICBjb250YWluZXJJZDogJ21wQW5udWFsQ29tcGFyaXNvbkNoYXJ0JyxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICB0aXRsZTogYE1lZGlhbiBQcmljZSBBbm51YWwgQ29tcGFyaXNvbiAtICR7Y2hhcnREYXRhLmQubG9jYXRpb25OYW1lfWAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNDAwLFxyXG4gICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBzYW1lIGNoYXJ0IGFyZWEgd2lkdGggYXMgdGhlIGNvbnRyb2wgZm9yIGF4aXMgYWxpZ25tZW50LlxyXG4gICAgICAgICAgICAgICAgY2hhcnRBcmVhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICc3MCUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaEF4aXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGFudGVkVGV4dDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnTU1NTSB5eXl5J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZBeGlzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnJDAsMDAwJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBmaXJzdCBjb2x1bW4gZnJvbSAnZGF0ZScgdG8gJ3N0cmluZycuXHJcbiAgICAgICAgICAgIHZpZXc6IG1wYVZpZXdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbXBBbm51YWxDb21wYXJpc29uRGFzaGJvYXJkLmJpbmQobXBBbm51YWxDb21wYXJpc29uQ29udHJvbCwgbXBBbm51YWxDb21wYXJpc29uQ2hhcnQpO1xyXG4gICAgICAgIG1wQW5udWFsQ29tcGFyaXNvbkRhc2hib2FyZC5kcmF3KG1wQW5udWFsQ29tcGFyaXNvbkRhdGEpO1xyXG5cclxuICAgICAgICBjb25zdCBzY0FubnVhbENvbXBhcmlzb25EYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZShldmFsKGNoYXJ0RGF0YS5kLnNvbGRDb3VudEFubnVhbENvbXApKTtcclxuICAgICAgICBjb25zdCBzY0FubnVhbENvbXBhcmlzb25EYXNoYm9hcmQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGFzaGJvYXJkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY0FubnVhbENvbXBhcmlzb24nKSk7XHJcbiAgICAgICAgY29uc3Qgc2NBbm51YWxDb21wYXJpc29uQ29udHJvbCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db250cm9sV3JhcHBlcih7XHJcbiAgICAgICAgICAgIGNvbnRyb2xUeXBlOiAnQ2hhcnRSYW5nZUZpbHRlcicsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcklkOiAnc2NBbm51YWxDb21wYXJpc29uQ29udHJvbCcsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckNvbHVtbkluZGV4OiAwLFxyXG4gICAgICAgICAgICAgICAgdWk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFydFR5cGU6ICdMaW5lQ2hhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0T3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVJbnRlcmFjdGl2aXR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFydEFyZWE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNzAlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoQXhpczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIDUsIDAsIDEpLCAvLyAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIDEpLCAvLyAnYXV0bydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRQb3NpdGlvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNuYXBUb0RhdGE6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRodXMsIHRoaXMgdmlldyBoYXMgdHdvIGNvbHVtbnM6IHRoZSBkYXRlIChheGlzKSBhbmQgdGhlIGNvdW50eSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJ0Vmlldzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbMCwgMV1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1pblJhbmdlU2l6ZTogODY0MDAwMDAgLy8gMSBkYXkgaW4gbWlsbGlzZWNvbmRzID0gMjQgKiA2MCAqIDYwICogMTAwMCA9IDg2LDQwMCwwMDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdGU6IHJhbmdlc3RhdGVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NBbm51YWxDb21wYXJpc29uQ2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ2hhcnRXcmFwcGVyKHtcclxuICAgICAgICAgICAgY2hhcnRUeXBlOiAnTGluZUNoYXJ0JyxcclxuICAgICAgICAgICAgY29udGFpbmVySWQ6ICdzY0FubnVhbENvbXBhcmlzb25DaGFydCcsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBgTnVtYmVyIG9mIFNhbGVzIENvbXBhcmlzb24gLSAke2NoYXJ0RGF0YS5kLmxvY2F0aW9uTmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIHNhbWUgY2hhcnQgYXJlYSB3aWR0aCBhcyB0aGUgY29udHJvbCBmb3IgYXhpcyBhbGlnbm1lbnQuXHJcbiAgICAgICAgICAgICAgICBjaGFydEFyZWE6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzcwJSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBoQXhpczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsYW50ZWRUZXh0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6ICdNTU0geXl5eSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2QXhlczogW3t9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBmaXJzdCBjb2x1bW4gZnJvbSAnZGF0ZScgdG8gJ3N0cmluZycuXHJcbiAgICAgICAgICAgIHZpZXc6IG1wYVZpZXdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2NBbm51YWxDb21wYXJpc29uRGFzaGJvYXJkLmJpbmQoc2NBbm51YWxDb21wYXJpc29uQ29udHJvbCwgc2NBbm51YWxDb21wYXJpc29uQ2hhcnQpO1xyXG4gICAgICAgIHNjQW5udWFsQ29tcGFyaXNvbkRhc2hib2FyZC5kcmF3KHNjQW5udWFsQ29tcGFyaXNvbkRhdGEpO1xyXG5cclxuICAgICAgICBjb25zdCBjYXRlZ29yeVBpY2tlciA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db250cm9sV3JhcHBlcih7XHJcbiAgICAgICAgICAgIGNvbnRyb2xUeXBlOiAnQ2F0ZWdvcnlGaWx0ZXInLFxyXG4gICAgICAgICAgICBjb250YWluZXJJZDogJ21wWWVhclNsaWRlcicsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHVzZUZvcm1hdHRlZFZhbHVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyQ29sdW1uTGFiZWw6ICdNb250aCcsXHJcbiAgICAgICAgICAgICAgICB1aToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246ICdNb250aHMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRWYWx1ZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93VHlwaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd011bHRpcGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzTGF5b3V0OiAnYXNpZGUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YXRlOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlczogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjYXRlZ29yeVBpY2tlcjIgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29udHJvbFdyYXBwZXIoe1xyXG4gICAgICAgICAgICBjb250cm9sVHlwZTogJ0NhdGVnb3J5RmlsdGVyJyxcclxuICAgICAgICAgICAgY29udGFpbmVySWQ6ICdtcFllYXJTbGlkZXIyJyxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgdXNlRm9ybWF0dGVkVmFsdWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJDb2x1bW5MYWJlbDogJ01vbnRoJyxcclxuICAgICAgICAgICAgICAgIHVpOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogJ01vbnRocycsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydFZhbHVlczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dUeXBpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93TXVsdGlwbGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZXNMYXlvdXQ6ICdhc2lkZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoQ29scyA9IFt7XHJcbiAgICAgICAgICAgIGNhbGM6IChkYXRhVGFibGUsIHJvd0luZGV4KSA9PiBkYXRhVGFibGUuZ2V0Rm9ybWF0dGVkVmFsdWUocm93SW5kZXgsIDApLFxyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgIH1dO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcnREYXRhLmQubWVkaWFuUHJpY2UuY29scy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjaENvbHMucHVzaChpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1wQ2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ2hhcnRXcmFwcGVyKHtcclxuICAgICAgICAgICAgY2hhcnRUeXBlOiAnQ29sdW1uQ2hhcnQnLFxyXG4gICAgICAgICAgICBjb250YWluZXJJZDogJ2NoYXJ0X2RpdicsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBgTWVkaWFuIFByaWNlIC0gJHtjaGFydERhdGEuZC5sb2NhdGlvbk5hbWV9YCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNDAwLFxyXG4gICAgICAgICAgICAgICAgaEF4aXM6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ01vbnRoJyxcclxuICAgICAgICAgICAgICAgICAgICBzbGFudGVkVGV4dDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RleHRFdmVyeTogMSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiAnIydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmb250TmFtZTogJ1ZlcmRhbmEnXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aWV3OiB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBjaENvbHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzY0NoYXJ0ID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkNoYXJ0V3JhcHBlcih7XHJcbiAgICAgICAgICAgIGNoYXJ0VHlwZTogJ0NvbHVtbkNoYXJ0JyxcclxuICAgICAgICAgICAgY29udGFpbmVySWQ6ICdzb2xkX2NvdW50X2NoYXJ0JyxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGBOdW1iZXIgb2YgU2FsZXMgLSAke2NoYXJ0RGF0YS5kLmxvY2F0aW9uTmFtZX1gLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgICAgICBoQXhpczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTW9udGgnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUZXh0RXZlcnk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJyMnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZm9udE5hbWU6ICdWZXJkYW5hJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aWV3OiB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBjaENvbHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBtcERhdGEgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGF0YVRhYmxlKGNoYXJ0RGF0YS5kLm1lZGlhblByaWNlLCAwLjUpO1xyXG4gICAgICAgIGNvbnN0IHNjRGF0YSA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5EYXRhVGFibGUoY2hhcnREYXRhLmQuc29sZENvdW50LCAwLjUpO1xyXG5cclxuICAgICAgICBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGFzaGJvYXJkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXNoYm9hcmQnKSlcclxuICAgICAgICAgICAgLmJpbmQoW2NhdGVnb3J5UGlja2VyXSwgW21wQ2hhcnRdKVxyXG4gICAgICAgICAgICAuZHJhdyhtcERhdGEpO1xyXG5cclxuICAgICAgICBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uRGFzaGJvYXJkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXNoYm9hcmQyJykpXHJcbiAgICAgICAgICAgIC5iaW5kKFtjYXRlZ29yeVBpY2tlcjJdLCBbc2NDaGFydF0pXHJcbiAgICAgICAgICAgIC5kcmF3KHNjRGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGxvYWREYXRhID0gKCkgPT4ge1xyXG4gICAgaWYgKHJlZ2lvblNlbGVjdC52YWx1ZSA9PT0gJ1dJJykge1xyXG4gICAgICAgIHRhYmxlRGF0YSA9IGRhdGEuZmlsdGVyKHggPT4geC5ncmFuZHBhcmVudE5hbWUgPT09IHJlZ2lvblNlbGVjdC52YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKGNvdW50eVNlbGVjdC52YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICB0YWJsZURhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHgubG9jYXRpb25OYW1lID09PSBjb3VudHlTZWxlY3QudmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0YWJsZURhdGEgPSBkYXRhLmZpbHRlcih4ID0+IHgucGFyZW50TmFtZSA9PT0gcmVnaW9uU2VsZWN0LnZhbHVlKTtcclxuICAgICAgICBjb3VudGllcyA9IHRhYmxlRGF0YVswXS5ncmFuZHBhcmVudE5hbWUgPT09ICdXSScgPyBbLi4ubmV3IFNldCh0YWJsZURhdGEubWFwKHggPT4geC5sb2NhdGlvbk5hbWUpKV0gOiBbXTtcclxuXHJcbiAgICAgICAgY291bnR5U2VsZWN0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5oaWRkZW4gPSBjb3VudGllcy5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgaWYgKGNvdW50aWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb3VudHlTZWxlY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJcIj5QbGVhc2UgQ2hvb3NlPC9vcHRpb24+JztcclxuICAgICAgICAgICAgY291bnRpZXMuZm9yRWFjaChjb3VudHkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY291bnR5U2VsZWN0LmlubmVySFRNTCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7Y291bnR5fVwiPiR7Y291bnR5fTwvb3B0aW9uPmA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB5ZWFycyA9IFsuLi5uZXcgU2V0KHRhYmxlRGF0YS5tYXAoeCA9PiB4LnllYXJOdW1iZXIpKV07XHJcbiAgICBjaGFydERhdGEuZC55ZWFycyA9IHllYXJzO1xyXG4gICAgY2hhcnREYXRhLmQubG9jYXRpb25OYW1lID0gY291bnR5U2VsZWN0LnZhbHVlID09PSAnJyA/IHJlZ2lvblNlbGVjdC52YWx1ZSA6IGAke2NvdW50eVNlbGVjdC52YWx1ZX0gQ291bnR5YDtcclxuXHJcbiAgICBjaGFydERhdGEuZC5tZWRpYW5QcmljZS5jb2xzID0gW3tcclxuICAgICAgICBpZDogJ21vbnRoJyxcclxuICAgICAgICBsYWJlbDogJ01vbnRoJyxcclxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgfV07XHJcbiAgICBjaGFydERhdGEuZC5tZWRpYW5QcmljZS5yb3dzID0gW107XHJcblxyXG4gICAgY2hhcnREYXRhLmQuc29sZENvdW50LmNvbHMgPSBbe1xyXG4gICAgICAgIGlkOiAnbW9udGgnLFxyXG4gICAgICAgIGxhYmVsOiAnTW9udGgnLFxyXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICB9XTtcclxuICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudC5yb3dzID0gW107XHJcblxyXG4gICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2VBbm51YWxDb21wLmNvbHMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogJ2RhdGVyZXBvcnRlZCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnRGF0ZSBSZXBvcnRlZCcsXHJcbiAgICAgICAgICAgIHR5cGU6ICdkYXRlJ1xyXG4gICAgICAgIH1cclxuICAgIF07XHJcbiAgICBjaGFydERhdGEuZC5tZWRpYW5QcmljZUFubnVhbENvbXAucm93cyA9IFtdO1xyXG5cclxuICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudEFubnVhbENvbXAuY29scyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAnZGF0ZXJlcG9ydGVkJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdEYXRlIFJlcG9ydGVkJyxcclxuICAgICAgICAgICAgdHlwZTogJ2RhdGUnXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudEFubnVhbENvbXAucm93cyA9IFtdO1xyXG5cclxuICAgIHllYXJzLmZvckVhY2goKHllYXIsIHlpbmRleCkgPT4ge1xyXG4gICAgICAgIGNoYXJ0RGF0YS5kLm1lZGlhblByaWNlLmNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiB5ZWFyLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGxhYmVsOiB5ZWFyLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudC5jb2xzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogeWVhci50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBsYWJlbDogeWVhci50b1N0cmluZygpLFxyXG4gICAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtb250aHMuZm9yRWFjaCgobW9udGgsIG1pbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtcFJvdyA9IHtcclxuICAgICAgICAgICAgICAgIGM6IFtdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzY1JvdyA9IHtcclxuICAgICAgICAgICAgICAgIGM6IFtdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB5ZWFycy5mb3JFYWNoKCh5ZWFyLCB5MmluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtcFZhbHVlcyA9IHRhYmxlRGF0YS5maWx0ZXIoeCA9PiB4LmRhdGVQYXJ0TmFtZSA9PT0gbW9udGggJiYgeC55ZWFyTnVtYmVyID09PSB5ZWFyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKHggPT4geC5tZWRpYW5TYWxlUHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXBWYWx1ZSA9IGdldE1lZGlhblZhbHVlKG1wVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjVmFsdWVzID0gdGFibGVEYXRhLmZpbHRlcih4ID0+IHguZGF0ZVBhcnROYW1lID09PSBtb250aCAmJiB4LnllYXJOdW1iZXIgPT09IHllYXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoeCA9PiB4LnNvbGRDb3VudCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY1ZhbHVlID0gc2NWYWx1ZXMucmVkdWNlKChhLCBiKSA9PiBhICsgYiwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHkyaW5kZXggPD0geWluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXBSb3cuYy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdjogbXBWYWx1ZSA/IE1hdGgucm91bmQobXBWYWx1ZSkgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmOiBtcFZhbHVlID8gTWF0aC5yb3VuZChtcFZhbHVlKS50b0xvY2FsZVN0cmluZygnZW4nLCBjdXJyZW5jeU9wdGlvbnMpIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY1Jvdy5jLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBzY1ZhbHVlIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGY6IHNjVmFsdWUgPyBzY1ZhbHVlLnRvTG9jYWxlU3RyaW5nKCkgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXBSb3cuYy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHY6IGBEYXRlKCR7eWVhcn0sJHttaW5kZXh9LDEpYCxcclxuICAgICAgICAgICAgICAgIGY6IGAke21vbnRoLnNsaWNlKDAsMyl9ICR7eWVhcn1gXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NSb3cuYy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHY6IGBEYXRlKCR7eWVhcn0sJHttaW5kZXh9LDEpYCxcclxuICAgICAgICAgICAgICAgIGY6IGAke21vbnRoLnNsaWNlKDAsMyl9ICR7eWVhcn1gXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXBSb3cuYy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIHNjUm93LmMucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICAgICAgeWVhcnMuZm9yRWFjaCgoXywgeTJpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHkyaW5kZXggPiB5aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtcFJvdy5jLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2VBbm51YWxDb21wLnJvd3MucHVzaChtcFJvdyk7XHJcbiAgICAgICAgICAgIGNoYXJ0RGF0YS5kLnNvbGRDb3VudEFubnVhbENvbXAucm93cy5wdXNoKHNjUm93KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIFsuLi55ZWFyc10ucmV2ZXJzZSgpLmZvckVhY2goKHllYXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2VBbm51YWxDb21wLmNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiB5ZWFyLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGxhYmVsOiBpbmRleCA9PT0gMCA/ICdWYWx1ZScgOiAoaW5kZXggPT09IDEgPyAnUHJpb3IgeWVhcicgOiBgJHtpbmRleH0geWVhcnMgcHJpb3JgKSxcclxuICAgICAgICAgICAgdHlwZTogJ251bWJlcidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hhcnREYXRhLmQuc29sZENvdW50QW5udWFsQ29tcC5jb2xzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogeWVhci50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBsYWJlbDogaW5kZXggPT09IDAgPyAnVmFsdWUnIDogKGluZGV4ID09PSAxID8gJ1ByaW9yIHllYXInIDogYCR7aW5kZXh9IHllYXJzIHByaW9yYCksXHJcbiAgICAgICAgICAgIHR5cGU6ICdudW1iZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBtb250aHMuZm9yRWFjaCgobW9udGgsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbXBSb3cgPSB7XHJcbiAgICAgICAgICAgIGM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2OiBpbmRleCArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgZjogbW9udGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNjUm93ID0ge1xyXG4gICAgICAgICAgICBjOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdjogaW5kZXggKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGY6IG1vbnRoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB5ZWFycy5mb3JFYWNoKHllYXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtcFZhbHVlcyA9IHRhYmxlRGF0YS5maWx0ZXIoeCA9PiB4LmRhdGVQYXJ0TmFtZSA9PT0gbW9udGggJiYgeC55ZWFyTnVtYmVyID09PSB5ZWFyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoeCA9PiB4Lm1lZGlhblNhbGVQcmljZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1wVmFsdWUgPSBnZXRNZWRpYW5WYWx1ZShtcFZhbHVlcyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjVmFsdWVzID0gdGFibGVEYXRhLmZpbHRlcih4ID0+IHguZGF0ZVBhcnROYW1lID09PSBtb250aCAmJiB4LnllYXJOdW1iZXIgPT09IHllYXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCh4ID0+IHguc29sZENvdW50KTtcclxuICAgICAgICAgICAgY29uc3Qgc2NWYWx1ZSA9IHNjVmFsdWVzLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xyXG5cclxuICAgICAgICAgICAgbXBSb3cuYy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHY6IG1wVmFsdWUgPyBNYXRoLnJvdW5kKG1wVmFsdWUpIDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGY6IG1wVmFsdWUgPyBNYXRoLnJvdW5kKG1wVmFsdWUpLnRvTG9jYWxlU3RyaW5nKCdlbicsIGN1cnJlbmN5T3B0aW9ucykgOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjUm93LmMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB2OiBzY1ZhbHVlIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICBmOiBzY1ZhbHVlID8gYCR7c2NWYWx1ZS50b0xvY2FsZVN0cmluZygpfSBTYWxlc2AgOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hhcnREYXRhLmQubWVkaWFuUHJpY2Uucm93cy5wdXNoKG1wUm93KTtcclxuICAgICAgICBjaGFydERhdGEuZC5zb2xkQ291bnQucm93cy5wdXNoKHNjUm93KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNoYXJ0RGF0YS5kLmxhdGVzdFllYXIgPSB5ZWFycy5hdCgtMSk7XHJcbiAgICBjaGFydERhdGEuZC5sYXRlc3RNb250aCA9IHRhYmxlRGF0YS5maWx0ZXIoeCA9PiB4LnllYXJOdW1iZXIgPT09IHllYXJzLmF0KC0xKSkuYXQoLTEpLmRhdGVQYXJ0TnVtYmVyO1xyXG5cclxuICAgIGlmIChyZWdpb25TZWxlY3QudmFsdWUgPT09ICdXSScpIHtcclxuICAgICAgICBjaGFydERhdGEuZC5kYXRhU2V0VHlwZSA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKGNvdW50eVNlbGVjdC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBjaGFydERhdGEuZC5kYXRhU2V0VHlwZSA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXJ0RGF0YS5kLmRhdGFTZXRUeXBlID0gMjtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZFRhYmxlcygpO1xyXG4gICAgYnVpbGRDaGFydHMoKTtcclxufTtcclxuXHJcbmZldGNoKCcvaG91c2luZy1zdGF0aXN0aWNzLWRhdGEnKVxyXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAudGhlbihyZXMgPT4ge1xyXG4gICAgICAgIGRhdGEgPSByZXM7XHJcbiAgICAgICAgaG91c2luZ1N0YXRzLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIGxvYWRlci5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIGxvYWREYXRhKCk7XHJcbiAgICB9KTtcclxuXHJcbnJlZ2lvblNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICBjb3VudHlTZWxlY3QudmFsdWUgPSAnJztcclxuICAgIGNvdW50eVNlbGVjdC5wYXJlbnROb2RlLnBhcmVudE5vZGUuaGlkZGVuID0gcmVnaW9uU2VsZWN0LnZhbHVlID09PSAnV0knO1xyXG4gICAgbG9hZERhdGEoKTtcclxufSk7XHJcblxyXG5jb3VudHlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgbG9hZERhdGEoKTtcclxufSk7XHJcblxyXG5ob3VzaW5nU3RhdHNUb2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LnJlcGxhY2UoJ2J0bi1zZWNvbmRhcnknLCAnYnRuLXByaW1hcnknKTtcclxuICAgICAgICB0b2dnbGUuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuXHJcbiAgICAgICAgaG91c2luZ1N0YXRzVG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZTIgPT4ge1xyXG4gICAgICAgICAgICBpZiAodG9nZ2xlMiAhPT0gdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUyLmNsYXNzTGlzdC5yZXBsYWNlKCdidG4tcHJpbWFyeScsICdidG4tc2Vjb25kYXJ5Jyk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzaG93UXVhcnRlcnMgPSB0b2dnbGUuZGF0YXNldC5sYWJlbCA9PT0gJ1F1YXJ0ZXInO1xyXG4gICAgICAgIGhvdXNpbmdTdGF0c0hlYWRpbmcucXVlcnlTZWxlY3Rvcignc3BhbicpLmlubmVyVGV4dCA9IHRvZ2dsZS5kYXRhc2V0LmxhYmVsO1xyXG5cclxuICAgICAgICBidWlsZFRhYmxlcygpO1xyXG4gICAgfSk7XHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxXQUFTLEVBQUcsT0FBTztBQUNmLFFBQUksT0FBTyxNQUFNO0FBQ2pCLFFBQUksV0FBVyxLQUFLO0FBQ3BCLFFBQUksZUFBZSxDQUFDO0FBRXBCLGFBQVNBLEtBQUksR0FBR0EsS0FBSSxVQUFVQSxNQUFLO0FBQy9CLFVBQUksUUFBUSxLQUFLQSxFQUFDLEVBQUU7QUFDcEIsVUFBSSxZQUFZLE1BQU07QUFDdEIsZUFBUyxJQUFJLEdBQUcsSUFBSSxXQUFXLEtBQUs7QUFDaEMsWUFBSSxPQUFPLE1BQU0sQ0FBQztBQUNsQixZQUFJLFVBQVUsS0FBSyxXQUFXO0FBQzlCLFlBQUksVUFBVSxLQUFLLFdBQVc7QUFDOUIs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
