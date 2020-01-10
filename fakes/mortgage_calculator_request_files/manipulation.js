'using strict';

document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready
  addEventListeners();
});

function calculate() {

  // document.querySelector("#prin").value = 50000;
  // document.querySelector("#intr").value = 8.25;
  // document.querySelector("#term").value = 30;
  // document.querySelector("#strt").value = "12/02/2019";
  // document.querySelector("#buttons > input.mlfield_submit").click();

  const p = document.querySelector("#prin").value;
  const i = document.querySelector("#intr").value;
  const t = document.querySelector("#term").value;
  const s = document.querySelector("#strt").value;



  if (p === "50000" &&
    i === "8.25" &&
    t === "30" &&
    s === "12/02/2019") {

    document.location.href = "../mortgage_calculator_response_files/Mortgage Payment Calculator response.html";
  } else {
    document.location.href = "../mortgage_calculator_response_files/Mortgage Payment Calculator response failed.html";

  }

}

function addEventListeners() {
  const btn_submit = document.querySelector('#buttons > input.mlfield_submit');
  btn_submit.addEventListener("click", function (event) {
    event.preventDefault();
    calculate();
  });
}