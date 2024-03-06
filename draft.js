change.addEventListener("click", function () {
  let form = document.createElement("form");
  form.classList.add("form");
  let input = document.createElement("input");
  input.classList.add("city");
  // input.setAttribute("type")
  let btnFind = document.createElement("button");
  btnFind.classList.add("find");
  btnFind.innerHTML = "Find";
  form.appendChild(btnFind);
  document.body.appendChild(form);
});
