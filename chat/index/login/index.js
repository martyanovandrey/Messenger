document.querySelector(".button_type_submit").addEventListener("click", login);
function login() {
    var form = document.querySelector('form');
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) { data[key] = value; });
    var json = JSON.stringify(data);
    console.log(json);
}
//# sourceMappingURL=index.js.map