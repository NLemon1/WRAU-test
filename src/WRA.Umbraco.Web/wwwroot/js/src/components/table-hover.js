function A (table) {
    var rows = table.rows;
    var rowCount = rows.length;
    var cellIndexMap = [];

    for (var i = 0; i < rowCount; i++) {
        var cells = rows[i].cells;
        var cellCount = cells.length;
        for (var j = 0; j < cellCount; j++) {
            var cell = cells[j];
            var rowSpan = cell.rowSpan || 1;
            var colSpan = cell.colSpan || 1;
            var colIndex = -1;

            if (!cellIndexMap[i]) {
                cellIndexMap[i] = [];
            }
            var indexRow = cellIndexMap[i];
            while (indexRow[++colIndex]) {}

            cell.realIndex = colIndex;
            for (var rowOffset = i; rowOffset < i + rowSpan; rowOffset++) {
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

function B (table) {
    var rowIndex = 0;
    var rows, rowCount, i;

    if (table.tHead) {
        rows = table.tHead.rows;
        rowCount = rows.length;
        for (i = 0; i < rowCount; i++) {
            rows[i].realRIndex = rowIndex++;
        }
    }

    for (var tBodyIndex = 0; tBodyIndex < table.tBodies.length; tBodyIndex++) {
        rows = table.tBodies[tBodyIndex].rows;
        rowCount = rows.length;
        for (i = 0; i < rowCount; i++) {
            rows[i].realRIndex = rowIndex++;
        }
    }

    if (table.tFoot) {
        rows = table.tFoot.rows;
        rowCount = rows.length;
        for (i = 0; i < rowCount; i++) {
            rows[i].realRIndex = rowIndex++;
        }
    }
}

HTMLTableElement.prototype.tableHover = function (options) {
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
        rowClass: 'hover',
        colClass: '',
        cellClass: '',
        clickClass: ''
    }, options);

    var table = this;
    var colCells = [], rowCells = [], hoverClassIndex = 0, previousHover = [-1, -1];

    if (!table.tBodies || !table.tBodies.length) {
        return;
    }

    function mapCells(rows, section) {
        for (var i = 0; i < rows.length; i++, hoverClassIndex++) {
            var row = rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                var cell = row.cells[j];
                if ((section === 'TBODY' && settings.bodyRows) || 
                    (section === 'TFOOT' && settings.footRows) || 
                    (section === 'THEAD' && settings.headRows)) {
                    var rowSpan = cell.rowSpan;
                    while (--rowSpan >= 0) {
                        rowCells[hoverClassIndex + rowSpan].push(cell);
                    }
                }

                if ((section === 'TBODY' && settings.bodyCols) || 
                    (section === 'THEAD' && settings.headCols) || 
                    (section === 'TFOOT' && settings.footCols)) {
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

                if ((section === 'TBODY' && settings.allowBody) || 
                    (section === 'THEAD' && settings.allowHead) || 
                    (section === 'TFOOT' && settings.allowFoot)) {
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

            var clickedCells = table.querySelectorAll('td.' + settings.clickClass + ', th.' + settings.clickClass);
            clickedCells.forEach(function (cell) {
                cell.classList.remove(settings.clickClass);
            });

            if (colIndex !== previousHover[0] || rowIndex !== previousHover[1]) {
                var classesToAdd = [];
                if (settings.rowClass) classesToAdd.push('.' + settings.rowClass);
                if (settings.colClass) classesToAdd.push('.' + settings.colClass);
                if (settings.cellClass) classesToAdd.push('.' + settings.cellClass);

                if (classesToAdd.length) {
                    var cellsToHover = table.querySelectorAll('td, th');
                    cellsToHover.forEach(function (cell) {
                        if (classesToAdd.some(cls => cell.matches(cls))) {
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
        var hoverAction = isHover ? 'add' : 'remove';
        var colIndex = cell.realIndex;

        if (settings.colClass) {
            var colCellSpan = cell.colSpan;
            var colHoverCells = colCells[colIndex] || [];
            for (var i = 1; settings.spanCols && i < colCellSpan && colCells[colIndex + i]; i++) {
                colHoverCells = colHoverCells.concat(colCells[colIndex + i]);
            }
            colHoverCells.forEach(function (colCell) {
                colCell.classList[hoverAction](settings.colClass);
            });
        }

        if (settings.rowClass) {
            var rowIndex = cell.parentNode.realRIndex;
            var rowHoverCells = rowCells[rowIndex] || [];
            var rowSpan = cell.rowSpan;
            for (var i = 1; settings.spanRows && i < rowSpan && rowCells[rowIndex + i]; i++) {
                rowHoverCells = rowHoverCells.concat(rowCells[rowIndex + i]);
            }
            rowHoverCells.forEach(function (rowCell) {
                rowCell.classList[hoverAction](settings.rowClass);
            });
        }

        if (settings.cellClass) {
            var sectionName = cell.parentNode.parentNode.nodeName.toUpperCase();
            if ((sectionName === 'TBODY' && settings.bodyCells) || 
                (sectionName === 'THEAD' && settings.headCells) || 
                (sectionName === 'TFOOT' && settings.footCells)) {
                cell.classList[hoverAction](settings.cellClass);
            }
        }
    }

    A(table);
    
    B(table);

    for (var i = 0; i < table.rows.length; i++) {
        rowCells[i] = [];
    }

    if (table.tHead) {
        mapCells(table.tHead.rows, 'THEAD');
    }

    for (var tBodyIndex = 0; tBodyIndex < table.tBodies.length; tBodyIndex++) {
        mapCells(table.tBodies[tBodyIndex].rows, 'TBODY');
    }

    if (table.tFoot) {
        mapCells(table.tFoot.rows, 'TFOOT');
    }

    table.addEventListener('mouseover', function (event) {
        hoverHandler(event, true);
    });

    table.addEventListener('mouseout', function (event) {
        hoverHandler(event, false);
    });

    table.addEventListener('click', clickHandler);
};