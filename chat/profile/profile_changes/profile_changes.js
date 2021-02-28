document.querySelector(".button_type_submit").addEventListener("click", profile_change);
function profile_change() {
    var form = document.querySelector('form');
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) { data[key] = value; });
    var json = JSON.stringify(data);
    console.log(json);
}
//# sourceMappingURL=profile_changes.js.map