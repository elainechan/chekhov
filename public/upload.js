var cases = [];
var myForm = document.getElementById('form');

myForm.onsubmit = function (e) {
  e.preventDefault();
  var myObj = {
    caseId: document.getElementById('case-id').value,
    startTime: document.getElementById('start-time').value
  }
  cases.push(myObj);
  console.log(cases);
}