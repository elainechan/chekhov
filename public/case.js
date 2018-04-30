'use strict';
/*
drop-down menu containing id nums
*/
/*
table containing all cases
*/
/*
var CASES = [{ "name" : "Valen v. Conner", "dateOpened" : "2018-01-20T16:00:00Z", "dateClosed" : "" },
{ "name" : "Jones v. Williams", "dateOpened" : "2017-11-17T10:00:00Z", "dateClosed" : "" },
{ "name" : "Lehman v. Kahn", "dateOpened" : "2017-05-24T09:00:00Z", "dateClosed" : "" }];
*/

/* List approach
// create a `li` for each case
cases.forEach((item, i) => {
	var caseListing = document.createElement('li');
	caseListing.setAttribute('class', 'case-listing');
	caseListing.innerHTML = item.name;
	document.getElementById('case-listings').appendChild(caseListing);
});
*/
/* Table approach
*/
function getCaseData(callback) {
	$.getJSON(`http://localhost:8080/cases/all`, callback);
}

function createCaseTable(CASES) {
	// creates table
	var table = document.createElement('table');
	table.setAttribute('id', 'case-table');
	table.setAttribute('style', 'width: 50%');
	document.getElementById('table-area').appendChild(table);
	// creates row
	var headerRow = document.createElement('tr');
	headerRow.setAttribute('class', 'header-row');
	// creates header
	for (const prop in CASES[0]) { // populates header with values
		let header = document.createElement('th');
		header.setAttribute('scope', 'col')
		header.textContent = prop;
		headerRow.appendChild(header);
	}
	table.appendChild(headerRow);
	// creates row for each case
	CASES.forEach((item, i) => {
		let caseRow = document.createElement('tr');
		caseRow.setAttribute('class', 'case-row')
		Object.entries(item).forEach((entry, i) => { // populates each cell with data
			let cell = document.createElement('td');
			cell.textContent = entry[1];
			caseRow.appendChild(cell); // appends each cell to row
		});
		document.getElementById('case-table').appendChild(caseRow); // appends each row to table
	});
}
window.onload = getCaseData(createCaseTable); // calling REST returns an object/JSON
// get status code
// curl -I -s -L http://localhost:8080/cases | grep "HTTP/1.1"