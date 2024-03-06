let content = document.querySelector(".content");
let change = document.querySelector(".change");



change.addEventListener("click", function () {
    content.innerHTML = `<form action="" method="post" class="form">
        <input type="text" name="" class="city" placeholder="Type your city here"/><br />
        <button class="btn">Find</button>
      </form>`;
})

content.addEventListener("click", function (event) {
    if (event.target.classList == "btn") {
    content.innerHTML = `<p class="error">Ooops. Something went wrong.</p>
    <p class="info">Error info</p>
    <button class="btn btn_again">Try again</button>`;
}
})

content.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn_again")) {
        content.innerHTML = `<p class="temp">8°С</p>
        <p class="condition">Windy in Moscow</p>
        <button class="change">Change city</button>`;
    }
})