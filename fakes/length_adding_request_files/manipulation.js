'using strict';

document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready
  addEventListeners();
});

function calculate() {
  const txt_untWidth = document.getElementById('untWidth');
  const txt_subuntWidth = document.getElementById('subuntWidth');
  const txt_untLength = document.getElementById('untLength');
  const txt_subuntLength = document.getElementById('untLength');

  if (txt_subuntLength.value === "200" &&
    txt_subuntWidth.value === "200" &&
    txt_untWidth.value === "200" &&
    txt_untLength.value === "200") {

    document.location.href = "../length_adding_response_files/Length Adding Calculator.html";
  } else {
    document.location.href = "../length_adding_response_files/Length Adding Calculator failed.html";

  }

}

function addEventListeners() {
  const btn_submit = document.querySelector('#buttons > input.mlfield_submit');
  btn_submit.addEventListener("click", function (event) {
    event.preventDefault();
    calculate();
  });
}