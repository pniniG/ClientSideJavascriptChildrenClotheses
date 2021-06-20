const dom = {
    div_show_cart: document.querySelector('#show_cart'),

};

print_shopping_cart = () => {
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
        empty_shopping_cart();
    }
    else {
        const div_payment = document.createElement('div');
        const h6 = document.createElement('h6');
        const h6_sum = document.createElement('h6');
        const btn_payment = document.createElement('a');
        btn_payment.innerHTML = 'לתשלום';
        btn_payment.href = 'payment.html';
        btn_payment.classList.add('btn', 'carters_color', 'my-3');
        btn_payment.classList.remove('d-none');

        shopping_cart.items_in_cart.forEach(item => {
            const div_row = document.createElement('div');
            div_row.classList.add('row', 'border-bottom', 'py-2');
            const div_name_pic = document.createElement('div');
            div_name_pic.classList.add('col-4', 'offset-1', 'row');
            const image = document.createElement('img');
            image.src = item.image;
            image.classList.add('col-5');
            const item_name = document.createElement('span');
            item_name.innerHTML = item.item_name;
            item_name.classList.add('col-7', 'item_text');
            div_name_pic.appendChild(image);
            div_name_pic.appendChild(item_name);
            const size = document.createElement('span');
            size.innerHTML = item.size;
            size.classList.add('col-1', 'offset-1');
            const amount = document.createElement('span');
            amount.innerHTML = item.amount;
            amount.classList.add('col-1', 'offset-1');
            const cost = document.createElement('span');
            cost.innerHTML = `${item.price} ₪`;
            cost.classList.add('col-2', 'item_text');

            const button = document.createElement('button');
            button.classList.add('pl-0', 'h-25', 'clear', 'col-1');
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-times');
            button.appendChild(icon);
            button.onclick = () => {
                shopping_cart.items_in_cart.splice(shopping_cart.items_in_cart.findIndex(i => i.id === item.id), 1);
                shopping_cart.total_sum -= item.price;
                shopping_cart.total_sum = Math.round(shopping_cart.total_sum * 10) / 10;
                shopping_cart.total_amount -= item.amount;
                dom_universal.num_of_item_in_cart.innerHTML = shopping_cart.total_amount;
                if (dom_universal.num_of_item_in_cart.innerText === '0') {
                    dom_universal.num_of_item_in_cart.innerText = '';
                }
                shopping_cart.total_sum = Math.round(shopping_cart.total_sum * 10) / 10;
                h6.innerHTML = `סכום הזמנה: ${shopping_cart.total_sum} ₪ `;
                h6_sum.innerHTML = `סכום לתשלום: ${24 + shopping_cart.total_sum} ₪`;

                if (sessionStorage["current_customer"] === undefined) {// if guest
                    localStorage['shopping_cart'] = JSON.stringify(shopping_cart);

                }
                else { // if it's connected customer
                    let shopper = JSON.parse(localStorage[JSON.parse(sessionStorage["current_customer"]).email]);
                    shopper.shopping_cart = shopping_cart;
                    localStorage[JSON.parse(sessionStorage["current_customer"]).email] = JSON.stringify(shopper);
                }
                dom.div_show_cart.removeChild(dom.div_show_cart.childNodes[[...div_row.parentNode.childNodes].indexOf(div_row)]);
                if (shopping_cart.items_in_cart.length === 0) {
                    empty_shopping_cart();
                    div_payment.classList.add('d-none');
                }
            }

            div_row.append(div_name_pic, size, amount, cost, button);
            dom.div_show_cart.appendChild(div_row);
        });
        div_payment.classList.add('bg-grey', 'row', 'justify-content-end', 'text-left', 'px-3', 'mb-4');
        const div_row_payment = document.createElement('div');
        div_row_payment.classList.add('row', 'border-bottom', 'w-100', 'ml-5', 'mt-2');
        const div_offset = document.createElement('div');
        div_offset.classList.add('w-100');

        h6.innerHTML = `סכום הזמנה: ${shopping_cart.total_sum} ₪ `;
        h6.classList.add('w-100', 'mb-1');
        const div_for_btn = document.createElement('div');
        div_for_btn.classList.add('row');
        div_for_btn.appendChild(btn_payment);
        const span_ship = document.createElement('span');
        span_ship.innerHTML = `משלוח: 24 ₪`;
        h6_sum.innerHTML = `סכום לתשלום: ${24 + shopping_cart.total_sum} ₪`;
        span_ship.classList.add('w-100', 'mb-1');
        h6_sum.classList.add('w-100');
        div_row_payment.append(h6, span_ship, h6_sum);

        div_payment.append(div_row_payment, div_offset, div_for_btn);
        dom.div_show_cart.appendChild(div_payment);
        btn_payment.classList.add('my_margin');
    }
}

empty_shopping_cart = () => {
    const span = document.createElement('span');
    span.innerHTML = 'סל הקניות שלך ריק.';
    dom.div_show_cart.appendChild(span);
    span.classList.add('mb-3','small_text');
}

print_shopping_cart();
