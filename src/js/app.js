import data from '../data/data.json';

class Table {
	constructor(data) {
    this.element = document.querySelector('table');
    this.data = data;
  }

  addRow() {
  	const row = document.createElement('tr');
    row.classList.add('table_item')
  	this.element.appendChild(row);
  	return row
  }

  addCell(item, tag) {
  	const cell = document.createElement(tag);
  	cell.innerText = item;
    cell.classList.add('table_item')
  	return cell
  }

  sortData(key) {
    this.data = this.data.sort((element1, element2) => element1[key] > element2[key] ? 1 : -1);
  	this.removeTable();
  	this.loadData();
  }

  removeTable() {
  	const rows = document.querySelectorAll('.table_item');
  	for (const row of rows) {
  		row.remove();
  	}
  }

 loadData() {
    for (const element of this.data) {
      const row = this.addRow()
      const cellId = this.addCell(element.id, 'td');
      row.appendChild(cellId);
      const cellTitle  = this.addCell(element.title, 'td');
      row.appendChild(cellTitle);
      const cellYearText = '(' + element.year + ')'
      const cellYear  = this.addCell(cellYearText, 'td');
      row.appendChild(cellYear);
      const cellImdbtext = 'imdb: ' + Number(element.imdb).toFixed(2)
      const cellImdb = this.addCell(cellImdbtext, 'td');
      row.appendChild(cellImdb);
    }
  }

}

const table = new Table(data);
table.loadData();
const mainCell = document.querySelectorAll('th');

for (const element of mainCell) {
  element.addEventListener('click', function() {
    table.sortData(element.innerText);
  })
}
