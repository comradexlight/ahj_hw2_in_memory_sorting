import dataJson from '../data/data.json';

class Table {
  constructor(data) {
    this.table = document.querySelector('table');
    this.data = data;
  }

  addRow() {
    const row = document.createElement('tr');
    row.classList.add('table_item');
    this.table.appendChild(row);
    return row;
  }

  static addCell(element, tag) {
    const cell = document.createElement(tag);
    cell.innerText = element;
    cell.classList.add('table_item');
    return cell;
  }

  sortData(cell) {
    if (cell.classList.contains('sorted-down')) {
      this.data = this.data.sort((e1, e2) => (e1[cell.innerText] > e2[cell.innerText] ? -1 : 1));
      cell.classList.remove('sorted-down');
      cell.classList.add('sorted-up');
    } else {
      this.data = this.data.sort((e1, e2) => (e1[cell.innerText] > e2[cell.innerText] ? 1 : -1));
      cell.classList.add('sorted-down');
      cell.classList.remove('sorted-up');
    }
    this.removeTable();
    this.loadData();
  }

  removeTable() {
    const rows = this.table.querySelectorAll('.table_item');
    for (const row of rows) {
      row.remove();
    }
  }

  loadData() {
    for (const element of this.data) {
      const row = this.addRow();
      const cellId = Table.addCell(element.id, 'td');
      row.appendChild(cellId);
      const cellTitle = Table.addCell(element.title, 'td');
      row.appendChild(cellTitle);
      const cellYearText = `(${element.year})`;
      const cellYear = Table.addCell(cellYearText, 'td');
      row.appendChild(cellYear);
      const cellImdbtext = `imdb: ${Number(element.imdb).toFixed(2)}`;
      const cellImdb = Table.addCell(cellImdbtext, 'td');
      row.appendChild(cellImdb);
    }
  }

  listenToClick() {
    const mainRow = document.querySelectorAll('th');
    for (const cell of mainRow) {
      cell.addEventListener('click', () => {
        this.sortData(cell);
      });
    }
  }
}

const table = new Table(dataJson);
table.loadData();
table.listenToClick();
