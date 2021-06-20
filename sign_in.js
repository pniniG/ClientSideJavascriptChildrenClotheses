const dom = {
    nav_links: document.querySelectorAll('li a'),
    hide_labeles: document.querySelectorAll('.hide_label'),
    inputs: document.querySelectorAll('input'),
};

const data = {
    categories: [],
};

const details = document.details;

const print_customer_details = () => {
    if (data_universal.is_connected != undefined) {
        const current_shopper = JSON.parse(data_universal.is_connected);
        details.email.value = current_shopper.email;
        details.first_name.value = current_shopper.first_name;
        details.last_name.value = current_shopper.last_name;
        details.phone.value = current_shopper.phone;
        details.id_number.value = current_shopper.id_number;
        details.pswd.value = current_shopper.pswd;
        details.pswd2.value = current_shopper.pswd2;
        details.btn_sign.innerHTML = 'עדכן';
    }
}

print_customer_details();


details.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const entries = Array.from(formData.entries())
    const formDataObj = Object.fromEntries(entries);
    const customer = JSON.stringify(formDataObj);

    localStorage[formDataObj.email] = customer;
    sessionStorage["current_customer"] = customer;
    dom_universal.customer_name.innerHTML = formDataObj.first_name;
    after_sign_in(formDataObj.email);
    location.href = '/home.html';
}

$(function () { //  אין צורך באמת בפונ החיצונית
    $("input[name=first_name]")[0].oninvalid = function () {
        this.setCustomValidity("השם שהוקש אינו תקין, אנא נסה שנית");
    };
    $("input[name=last_name]")[0].oninvalid = function () {
        this.setCustomValidity("השם שהוקש אינו תקין, אנא נסה שנית");
    };
    $("input[name=phone]")[0].oninvalid = function () {
        this.setCustomValidity("מספר הטלפון אינו תקין");
    };
    $("input[name=id_number]")[0].oninvalid = function () {
        this.setCustomValidity("תעודת זהות לא תקינה");
    };
    $("input[name=pswd]")[0].oninvalid = function () {
        this.setCustomValidity("הסיסמה צריכה להכיל 8 תווים בלבד של אותיות או מספרים");
    };
    $("input[name=pswd2]")[0].onblur = function () {
        this.setCustomValidity(details.pswd2.value != details.pswd.value ? "סיסמה לא תואמת" : "");
    };

    $("input[name=first_name]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=last_name]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=phone]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=id_number]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=pswd]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=pswd2]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});


