const dom = {
    content: document.querySelector('#content'),
    div_shopping_summary: document.querySelector('#shopping_summary'),
    show_total_sum: document.querySelector('#show_total_sum'),
    div_credit_card: document.querySelector('#credit_card'),
    label_permission: document.querySelector('#label_permission'),
    private_details: document.querySelector('#private_details'),
    h5_address: document.querySelector('#h5_address'),
    month: document.querySelector('#month'),
    year: document.querySelector('#year'),
    label_invalid_date: document.querySelector('#label_invalid_date'),
};

const print_customer_details = () => {
    if (data_universal.is_connected != undefined) {
        const current_shopper = JSON.parse(data_universal.is_connected);
        const form_deatails = document.form_deatails;
        form_deatails.email.value = current_shopper.email;
        form_deatails.first_name.value = current_shopper.first_name;
        form_deatails.last_name.value = current_shopper.last_name;
        form_deatails.phone.value = current_shopper.phone;
    }
}

document.form_deatails.onsubmit = (event) => {
    event.preventDefault();
    if (document.form_deatails.permission.checked) {
        dom.div_credit_card.classList.remove('d-none');
        dom.private_details.classList.add('d-none');
        dom.h5_address.innerHTML = "תשלום באמצעות כרטיס אשראי";
        print_date();
    }
    else {
        dom.label_permission.classList.remove('d-none');
    }
}

document.form_deatails.permission.onclick = () => {
    dom.label_permission.classList.add('d-none');
}

const print_date = () => {

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        if (i < 10) {
            option.value = '0' + i;
        }
        else {
            option.value = i;
        }
        dom.month.appendChild(option);
    }
    for (let i = 15; i <= 25; i++) {
        const option = document.createElement('option');
        option.value = i;
        dom.year.appendChild(option);
    }
}


const print_shopping_summary = () => {
    let shopping_cart;
    if (sessionStorage['current_customer'] === undefined) { // if guest
        if (localStorage['shopping_cart'] === undefined) {
            location.href = 'shopping_cart.html';
        }//else
        shopping_cart = JSON.parse(localStorage['shopping_cart']);
    }
    else {
        shopping_cart = JSON.parse(localStorage[JSON.parse(sessionStorage["current_customer"]).email]).shopping_cart;
        if (shopping_cart === undefined) {
            location.href = 'shopping_cart.html';
        }
    }
    const div = document.createElement('div');
    const div_row1 = document.createElement('div');
    const div_row2 = document.createElement('div');
    const div_row3 = document.createElement('div');
    const span_sum_text = document.createElement('span');
    span_sum_text.innerHTML = 'סה"כ:';
    span_sum_text.classList.add('text-right', 'item_text');
    const span_sum = document.createElement('span');
    span_sum.classList.add('float-left', 'my_margin2', 'item_text');
    span_sum.innerHTML = shopping_cart.total_sum + ' ₪';
    const span_shipping_text = document.createElement('span');
    span_shipping_text.innerHTML = 'משלוח:';
    span_shipping_text.classList.add('text-right', 'item_text');
    const span_shipping = document.createElement('span');
    span_shipping.classList.add('float-left', 'my_margin2', 'item_text');
    span_shipping.innerHTML = '24 ₪';
    const total_sum_text = document.createElement('span');
    total_sum_text.innerHTML = 'סכום לתשלום:';
    total_sum_text.classList.add('text-right', 'item_text');
    const total_sum = document.createElement('span');
    total_sum.classList.add('float-left', 'my_margin2', 'item_text');
    total_sum.innerHTML = shopping_cart.total_sum + 24 + ' ₪';
    div_row3.classList.add('mb-2');
    div_row1.append(span_sum_text, span_sum);
    div_row2.append(span_shipping_text, span_shipping);
    div_row3.append(total_sum_text, total_sum);
    div.append(div_row1, div_row2, div_row3);
    div.classList.add('border-bottom', 'text_right');
    dom.div_shopping_summary.append(div);
    const div_show_items = document.createElement('div');
    div_show_items.classList.add('shopping_summary_content');
    shopping_cart.items_in_cart.forEach(item => {
        const item_row = document.createElement('div');
        item_row.classList.add('row', 'border-bottom');
        const image = document.createElement('img');
        image.src = item.image;
        image.classList.add('col-3', 'border-info', 'my-2', 'align-self-center');
        const details = document.createElement('div');
        details.classList.add('col-5', 'mt-3', 'details_text', 'pl-0');
        const span_name = document.createElement('span');
        span_name.innerHTML = item.item_name;
        span_name.classList.add('row', 'mb-1');
        const amount_and_size = document.createElement('div');
        amount_and_size.classList.add('row');
        const span_amount = document.createElement('span');
        span_amount.innerHTML = 'כמות: ' + item.amount;
        span_amount.classList.add('ml-2');
        const span_size = document.createElement('span');
        span_size.innerHTML = 'מידה: ' + item.size;
        amount_and_size.append(span_amount, span_size);
        details.append(span_name, amount_and_size);
        const price = document.createElement('span');
        price.innerHTML = `${item.price} ₪`;
        price.classList.add('col-3', 'mt-3', 'text-left', 'px-0');
        item_row.append(image, details, price);
        div_show_items.appendChild(item_row);
    });
    dom.div_shopping_summary.append(div_show_items);

    dom.show_total_sum.value = "₪" + (shopping_cart.total_sum + 24);
}

print_customer_details();
print_shopping_summary();

const credit_details = document.credit_details;

credit_details.onsubmit = (event) => {
    event.preventDefault();
    if (!(parseInt(credit_details.credit_date_year.value) >= 15 && parseInt(credit_details.credit_date_year.value) <= 25) ||
        !(parseInt(credit_details.credit_date_month.value) >= 1 && parseInt(credit_details.credit_date_month.value) <= 12)) {
        dom.label_invalid_date.classList.remove('d-none');

        credit_details.credit_date_year.onchange = () => {
            dom.label_invalid_date.classList.add('d-none');
        }
        credit_details.credit_date_month.onchange = () => {
            dom.label_invalid_date.classList.add('d-none');
        }
    }
    else {
        if (data_universal.is_connected === undefined) {
            localStorage.removeItem('shopping_cart');
        }
        else {
            const shopper = JSON.parse(localStorage[JSON.parse(data_universal.is_connected).email])
            if (shopper.orders === undefined) {
                shopper.orders = [];
            }
            order = {
                date: 'יום ' + getDayName(new Date().getDay()) + ' ה' + new Date().getDate() + "/" + (new Date().getMonth() + 1) + '. ',
                order_details: shopper.shopping_cart,
            }
            shopper.orders.push(order)
            shopper.shopping_cart = undefined;
            localStorage[JSON.parse(data_universal.is_connected).email] = JSON.stringify(shopper);
        }
        after_order();
    }

}

const after_order = () => {
    dom.content.innerHTML = '';
    dom.h5_address.innerHTML = '';
    const span = document.createElement('span');
    let d1 = new Date();
    let diff = 3 * 24 * 60 * 60 * 1000;
    let d2 = new Date(d1.getTime() + diff);
    dom.content.append(span);
    let myDate = 'יום ' + getDayName(d2.getDay()) + ' ה' + d2.getDate() + "/" + (d2.getMonth() + 1) + '. ';
    span.innerHTML = 'התשלום עבר בהצלחה! הזמנתך תגיע אליך עד ל' + myDate + 'תודה שקנית אצלינו!';
}


$(function () {
    $("input[name=first_name]")[0].oninvalid = function () {
        this.setCustomValidity("השם שהוקש אינו תקין, אנא נסה שנית");
    };
    $("input[name=last_name]")[0].oninvalid = function () {
        this.setCustomValidity("השם שהוקש אינו תקין, אנא נסה שנית");
    };
    $("input[name=phone]")[0].oninvalid = function () {
        this.setCustomValidity("מספר הטלפון אינו תקין");
    };
    $("input[name=street_and_house]")[0].oninvalid = function () {
        this.setCustomValidity("כתובת אינה תקינה, אנא נסה שנית");
    };
    $("input[name=city]")[0].oninvalid = function () {
        this.setCustomValidity("שם יישוב יכול להכיל אותיות בלבד");
    };
    $("input[name=credit_num]")[0].oninvalid = function () {
        this.setCustomValidity("פורמט מספר אשראי אינו תקין");
    };
    $("input[name=credit_code]")[0].oninvalid = function () {
        this.setCustomValidity("קוד אימות כרטיס אינו תקין");
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
    $("input[name=street_and_house]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=city]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=credit_num]")[0].oninput = function () {
        this.setCustomValidity("");
    };
    $("input[name=credit_code]")[0].oninput = function () {
        this.setCustomValidity("");
    };
});

function getMonthName(monthIndex) {
    let monthsNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
    return monthsNames[monthIndex];
}
function getDayName(dayIndex) {
    let daysNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    return daysNames[dayIndex];
}