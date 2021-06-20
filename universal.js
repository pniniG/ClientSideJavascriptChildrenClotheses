const dom_universal = {
    modal: document.querySelector('#my_modal'),
    nav_links: document.querySelectorAll('.category'),
    nav_sub_links: document.querySelectorAll('.sub_category'),
    btn_create_account: document.querySelector('#btn_create_account'),
    customer_name: document.querySelector('#customer_name'),
    not_exist_email: document.querySelector('#not_exist_email'),
    not_exist_password: document.querySelector('#not_exist_password'),
    account_modal: document.querySelector('#account_modal'),
    account_pop: document.querySelector('#account_pop'),
    cart_pop: document.querySelector('#cart_pop'),
    sign_out: document.querySelector('#sign_out'),
    btn_sign_out: document.querySelector('#btn_sign_out'),
    data_list: document.querySelector('#search_item'),
    input_search: document.querySelector('#input_search'),
    num_of_item_in_cart: document.querySelector('#numCart'),
};

const print_cart = () => {
    let shopping_cart;
    if (sessionStorage["current_customer"] === undefined) {// if guest
        shopping_cart = localStorage['shopping_cart'];
        if (shopping_cart != undefined) {
            shopping_cart = JSON.parse(shopping_cart);
        }
    }
    else { // if it's connected customer
        shopping_cart = JSON.parse(localStorage[JSON.parse(sessionStorage["current_customer"]).email]).shopping_cart;
    }
    if (shopping_cart === undefined || shopping_cart.items_in_cart.length === 0) {
        const span = document.createElement('span');
        span.innerHTML = 'סל הקניות שלך ריק.';
        return span;
    }
    else {
        const div = document.createElement('div');
        const div_row1 = document.createElement('div');
        const div_row2 = document.createElement('div');
        const div_row3 = document.createElement('div');
        const span_sum_text = document.createElement('span');
        span_sum_text.innerHTML = 'סה"כ:';
        span_sum_text.classList.add('text-right', 'item_text');
        const span_sum = document.createElement('span');
        span_sum.classList.add('float-left', 'item_text');
        span_sum.innerHTML = shopping_cart.total_sum + ' ₪';
        const span_shipping_text = document.createElement('span');
        span_shipping_text.innerHTML = 'משלוח:';
        span_shipping_text.classList.add('text-right', 'item_text');
        const span_shipping = document.createElement('span');
        span_shipping.classList.add('float-left', 'item_text');
        span_shipping.innerHTML = '24 ₪';
        const total_sum_text = document.createElement('span');
        total_sum_text.innerHTML = 'סכום לתשלום:';
        total_sum_text.classList.add('text-right', 'item_text');
        const total_sum = document.createElement('span');
        total_sum.classList.add('float-left', 'item_text');
        total_sum.innerHTML = shopping_cart.total_sum + 24 + ' ₪';
        div_row3.classList.add('mb-2');
        div_row1.append(span_sum_text, span_sum);
        div_row2.append(span_shipping_text, span_shipping);
        div_row3.append(total_sum_text, total_sum);
        div.append(div_row1, div_row2, div_row3);
        div.classList.add('border-bottom', 'text_right');
        const div_show_items = document.createElement('div');
        div_show_items.id = 'pop_body';
        shopping_cart.items_in_cart.forEach(item => {
            const item_row = document.createElement('div');
            item_row.classList.add('row', 'border-bottom', 'mx-0');
            const image = document.createElement('img');
            image.src = item.image;
            image.classList.add('col-4', 'border-info', 'my-2', 'pr-0');
            const details = document.createElement('div');
            details.classList.add('col-5', 'mt-2', 'details_text');
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
            price.classList.add('col-3', 'mt-2', 'text-left');
            price.style.paddingLeft = '2.5%';
            item_row.append(image, details, price);
            div_show_items.appendChild(item_row);
        });

        const div_all_content = document.createElement('div');
        const cart_footer = document.createElement('div');
        const btn_edit = document.createElement('a');
        const btn_go_to_payment = document.createElement('a');
        cart_footer.classList.add('row', 'mt-2', 'justify-content-center', 'align-self-center');
        btn_edit.classList.add('bg-grey', 'small_text');
        btn_go_to_payment.classList.add('small_text', 'mr-2');
        btn_edit.style.width = '43%';
        btn_go_to_payment.style.width = '43%';
        btn_edit.classList.add('btn')//כדי שיהיה בצבע אפור 
        btn_edit.innerHTML = 'עריכה/צפיה בסל';
        btn_go_to_payment.classList.add('btn', 'carters_color');
        btn_go_to_payment.innerHTML = 'לתשלום';
        btn_go_to_payment.href = 'payment.html';
        btn_edit.href = 'shopping_cart.html';

        cart_footer.append(btn_edit, btn_go_to_payment);
        div_all_content.append(div, div_show_items, cart_footer);
        div_show_items.classList.add('popover-content');

        return div_all_content;
    }

}


$(function () {
    $('.popover').popover({
        container: 'body'
    })
})

$(document).ready(function () {
    $('#account_pop').popover({
        html: true,
        placement: 'bottom',
        title: 'החשבון שלי',
        content: `<a href="/sign_in.html" class="border-bottom item_text pb-2" >פרטי חשבון</a> <br><a href="/orders.html" class="item_text pb-2" >ההזמנות שלי</a>`,
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div><div class="popover-footer"><a href="#" id="btn_pop" class="btn btn-sm carters_color mb-2">התנתק</a></div></div>'
    });

    // Custom jQuery to hide popover on click of the close button
    $(document).on("click", ".popover-footer .btn", function () {
        $(this).parents(".popover").popover('hide');
        sign_out();
    });
});


$(document).ready(function () {
    $('body').on('click', '#cart_pop, #btn_add_item', function () {

        $('#cart_pop').popover({

            html: true,
            title: 'עגלת הקניות',
            duration: 2,
            trigger: 'focus',
            placement: 'bottom',//auto
            content: function () {
                return print_cart();
            }
        }).popover('toggle'); // or 'show'.


    });


    $('body').on('click', function (e) {
        $('#cart_pop').each(function () {
            // hide any open popovers when the anywhere else in the body is clicked
            if ((!$('#cart_pop').is(e.target) && $('#cart_pop').has(e.target).length === 0 && $('.popover').has(e.target).length === 0) &&
                (!$('#btn_add_item').is(e.target) && $('#btn_add_item').has(e.target).length === 0 && $('.popover').has(e.target).length === 0)) {
                $('#cart_pop').popover('hide');
            }
        });
    });
});


sign_out = () => {
    sessionStorage.removeItem('current_customer');
    dom_universal.account_modal.classList.remove('d-none');
    dom_universal.account_pop.classList.add('d-none');
    dom_universal.customer_name.innerHTML = 'התחברות';
    dom_universal.num_of_item_in_cart.innerHTML = '';
    dom_universal.btn_sign_out.classList.add('d-none');
}



const data_universal = {
    categories: [],
    customer: "guest",
    allitems: [],
    is_connected: sessionStorage["current_customer"],
};

const fetch_data = () => {
    $.ajax({
        url: './data.json',
        success: (myData) => {
            data_universal.allitems = myData.allitems;
        }
    });
};
fetch_data();

if (data_universal.is_connected != null) {//* כלומר אם יש לקוח מחובר
    dom_universal.customer_name.innerHTML = JSON.parse(data_universal.is_connected).first_name;
    if (JSON.parse(localStorage[JSON.parse(data_universal.is_connected).email]).shopping_cart !== undefined) {
        dom_universal.num_of_item_in_cart.innerText = JSON.parse(localStorage[JSON.parse(data_universal.is_connected).email]).shopping_cart.total_amount;
        if (dom_universal.num_of_item_in_cart.innerText === '0') {
            dom_universal.num_of_item_in_cart.innerText = '';
        }
    }

    dom_universal.account_modal.classList.add('d-none');
    dom_universal.account_pop.classList.remove('d-none');
}
else {
    if (localStorage['shopping_cart'] !== undefined) {
        dom_universal.num_of_item_in_cart.innerText = JSON.parse(localStorage['shopping_cart']).total_amount;
        if (dom_universal.num_of_item_in_cart.innerText === '0') {
            dom_universal.num_of_item_in_cart.innerText = '';
        }
    }

}



dom_universal.nav_links.forEach(link => {

    const url = new URL('./category.html', location.href);
    url.searchParams.set('category_name', link.innerText);// link.id
    link.href = url.href;
});

dom_universal.nav_sub_links.forEach(sub_link => {
    const url = new URL('./sub_category.html', location.href);
    url.searchParams.set('category_name', sub_link.name);
    url.searchParams.set('sub_category_name', sub_link.innerHTML);
    sub_link.href = url.href;
})





const exist_details = document.exist_details; // התחברות לקוח קיים
exist_details.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const entries = Array.from(formData.entries())
    const formDataObj = Object.fromEntries(entries);
    const is_email_exist = formDataObj.email;
    if (localStorage.getItem(is_email_exist) != null) { // בדיקה אם קיים כזה לקוח
        data_universal.customer = JSON.parse(localStorage[is_email_exist]);
        if (data_universal.customer.pswd === formDataObj.password) { // בדיקת הסיסמה
            dom_universal.customer_name.innerHTML = data_universal.customer.first_name;
            after_sign_in(is_email_exist);
            $(document).ready(function () {
                $("#sign_in_modal").modal("hide");
            });
        }
        else {
            dom_universal.not_exist_password.classList.remove('d-none');
        }
    }
    else {
        dom_universal.not_exist_email.classList.remove('d-none');
    }

    exist_details.email.onchange = () => {
        dom_universal.not_exist_email.classList.add('d-none');
        dom_universal.not_exist_password.classList.add('d-none');
    }
    exist_details.password.onchange = () => {
        dom_universal.not_exist_email.classList.add('d-none');
        dom_universal.not_exist_password.classList.add('d-none');
    }
}

after_sign_in = (is_email_exist) => {

    sessionStorage.setItem('current_customer', localStorage[is_email_exist]); // הכנסת הפרטים האישיים של הלקוח לסשן - להראות שזה לקוח רשום
    // עדכון עגלת הקניות שלו
    if (localStorage['shopping_cart'] !== undefined) /// אם היא לא ריקה  - יש מה להוסיפה לעגלה הרשומה על הלקוח
    {
        const current_shopping_cart = JSON.parse(localStorage['shopping_cart']);   // עגלת הקניות לפני ההתחברות
        const prev_details = JSON.parse(localStorage[JSON.parse(sessionStorage['current_customer']).email]); // נתוני הלקוח הרשום 
        if (prev_details.shopping_cart === undefined) { // אם עגלת הלקוח הרשומה על שמו היתה ריקה עד עכשיו
            prev_details.shopping_cart = current_shopping_cart;// נוסיף לה את העגלת קניות החדשה
            alert('now it adds the item1')
        }
        else {
            current_shopping_cart.items_in_cart.forEach(item => {
                let is_exist = prev_details.shopping_cart.items_in_cart.findIndex(i => i.id === item.id && item.size === i.size);
                if (is_exist !== -1) {
                    prev_details.shopping_cart.items_in_cart[is_exist].amount += item.amount;
                    prev_details.shopping_cart.items_in_cart[is_exist].price += item.price;
                    prev_details.shopping_cart.items_in_cart[is_exist].price = Math.round(prev_details.shopping_cart.items_in_cart[is_exist].price * 10) / 10;

                }
                else {
                    prev_details.shopping_cart.items_in_cart.push(item);
                }

            })
            prev_details.shopping_cart.total_sum += current_shopping_cart.total_sum;
            prev_details.shopping_cart.total_sum = Math.round(prev_details.shopping_cart.total_sum * 10) / 10;
            prev_details.shopping_cart.total_amount += current_shopping_cart.total_amount;
            dom_universal.num_of_item_in_cart.innerText = prev_details.shopping_cart.total_amount;
        }
        localStorage[JSON.parse(sessionStorage['current_customer']).email] = JSON.stringify(prev_details); // הוספת הנתונים למה שהיה כבר רשום על הלקוח
        localStorage.removeItem('shopping_cart');
    }
    location.reload();
}

dom_universal.btn_create_account.onclick = () => {
    location.href = '/sign_in.html';
}

const search = () => {
    dom_universal.data_list.innerHTML = '';
    const search_data = data_universal.allitems.map(item => {
        if (item.name.toLowerCase().includes(dom_universal.input_search.value.toLowerCase())) {

            const option = document.createElement('option');
            option.innerHTML = item.name;
            return option;
        }
    });
    dom_universal.data_list.append(...search_data);
}

dom_universal.input_search.onkeypress = () => {
    search();
}

dom_universal.input_search.oninput = () => {

    const selected_item = data_universal.allitems.find(item =>
        item.name === dom_universal.input_search.value);
    if (selected_item != undefined) {
        const url = new URL('./item.html', location.href);
        url.searchParams.set('item', selected_item.id);
        location.href = url.href;
        dom_universal.input_search.value = "";
    }


}






