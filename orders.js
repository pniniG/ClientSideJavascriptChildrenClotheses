
const dom = {
    orders: document.querySelector('#orders'),
    header: document.querySelector('#header'),
}
const data = {
    my_orders: [],
}

print_orders = () => {
    data.my_orders = JSON.parse(localStorage[JSON.parse(data_universal.is_connected).email]).orders;
    if (data.my_orders === undefined) {
        const div = document.createElement('div');
        div.classList.add('col-5');
        const span = document.createElement('span');
        span.innerHTML = "לא קימות הזמנות קודמות.";
        span.classList.add('mt-3', 'mr-5', 'row');
        header.classList.add('d-none');
        const btn = document.createElement('button');
        btn.innerHTML = "לעמוד הבית";
        btn.onclick = () => {
            location.href = "home.html";
        }
        div.append(span, btn)
        btn.classList.add('btn_size', 'carters_color', 'mt-5', 'mr-5', 'font-weight-bold', 'row');
        dom.orders.appendChild(div);
    }
    else {
        data.my_orders.forEach(order => {
            const div_all = document.createElement('div');
            div_all.classList.add('col-3', 'border', 'mr-5', 'row');
            const span_date = document.createElement('span');
            span_date.innerHTML = `${order.date}`;
            const h6_date = document.createElement('h6');
            h6_date.innerHTML = "תאריך ההזמנה: ";
            const div_date = document.createElement('div');
            div_date.classList.add('row');
            div_date.append(h6_date, span_date);
            div_all.appendChild(div_date);
            const span_sum = document.createElement('span');
            span_sum.innerHTML = `${order.order_details.total_sum}`;
            const h6_sum = document.createElement('h6');
            h6_sum.innerHTML = " סכום ההזמנה: ";
            const div_sum = document.createElement('div');
            div_sum.classList.add('row','w-100');
            div_sum.append(h6_sum, span_sum);
            const span_amount = document.createElement('span');
            span_amount.innerHTML = order.order_details.total_amount;
            const h6_amount = document.createElement('h6');
            h6_amount.innerHTML = "כמות הפריטים :";
            const div_amount = document.createElement('div');
            div_amount.classList.add('row','w-100');
            div_amount.append(h6_amount, span_amount);
            const div_items = document.createElement('div');
            div_items.classList.add('d-none');
            const a_plus = document.createElement('a');
            a_plus.innerHTML = "לפרטי ההזמנה לחץ כאן";
            a_plus.classList.add('small', 'cursor_pointer');
            a_plus.onclick = () => {
                if (div_items.classList.contains('d-none')) {
                    div_items.classList.remove('d-none');
                    a_plus.innerHTML = "הסתר פרטים";
                }
                else {
                    div_items.classList.add('d-none');
                    a_plus.innerHTML = "לפרטי ההזמנה לחץ כאן";
                }

            }
            div_all.append(div_sum, div_amount, a_plus, div_items);
            order.order_details.items_in_cart.forEach(item => {
                const item_row = document.createElement('div');
                item_row.classList.add('row', 'border-bottom');
                const image = document.createElement('img');
                image.src = item.image;
                image.classList.add('col-3', 'border-info', 'my-2');
                const details = document.createElement('div');
                details.classList.add('col-5', 'mt-3', 'details_text');
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
                price.classList.add('col-3', 'mt-3', 'text-left');
                price.style.paddingLeft = '2.5%';
                item_row.append(image, details, price);
                div_items.appendChild(item_row);
            })
            div_all.appendChild(div_items);
            dom.orders.appendChild(div_all);
        })
    }
}
print_orders();
