'using strict';

document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready
  addEventListeners();
});

function calculate() {
  const a = document.querySelector("#A").value;
  const r = document.querySelector("#R").value;
  const p = document.querySelector("#P").value;
  const t = document.querySelector("#T").value;
  const y = document.querySelector("#Y").value;
  const x = document.querySelector("#X").value;


  if (a === "200" &&
    r === "1" &&
    p === "1" &&
    t === "12" &&
    y === "12" &&
    x === "1") {

    document.location.href = "../loan_calculater_response_files/General Loan Calculator response.html";
  } else {
    document.location.href = "../loan_calculater_response_files/General Loan Calculator response failed.html";

  }

}

function addEventListeners() {
  const btn_submit = document.querySelector('#buttons > input.mlfield_submit');
  btn_submit.addEventListener("click", function (event) {
    event.preventDefault();
    calculate();
  });
}