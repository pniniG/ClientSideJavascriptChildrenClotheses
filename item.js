const dom = {
    div_item: document.querySelector('#show_item'),
};
const data = {
    item: {},
    select_item: {},
};

const fetch_item = () => {
    $.ajax({
        url: './data.json',
        success: (myData) => {
            const url = new URL(location.href);
            const current_item = url.searchParams.get('item');
            data.item = myData.allitems.find(item => item.id === current_item)
            print_item();
        }
    });
};

const print_item = () => {
    const image = document.createElement('img');
    image.src = data.item.first_image;
    const div_pics = document.createElement('div');
    const div_colors = document.createElement('div');
    div_colors.classList.add('row', 'mt-5', 'mb-4');
    div_pics.classList.add('col-1', 'pl-0');

    data.item.colors_images[0].pics.forEach(pic => { //* עבור הצבע הראשון והראשי
        const small_pic = document.createElement('img');
        small_pic.src = pic;
        small_pic.classList.add('w-100', 'row', 'mb-2', 'small_pic');
        div_pics.appendChild(small_pic);
        small_pic.onclick = () => {
            const last_select = document.querySelector('.small_pic_selected');
            if (last_select !== null) {
                last_select.classList.remove('small_pic_selected');
            }
            image.src = small_pic.src;
            small_pic.classList.add('small_pic_selected');
        }
    });

    div_pics.firstChild.classList.add('small_pic_selected');
    if (data.item.colors_images.length !== 1) { //* in case there are another colors
        data.item.colors_images.forEach(ci => {
            const div_color = document.createElement('div');
            div_colors.appendChild(div_color);
            div_color.style.backgroundColor = ci.color;

            div_color.classList.add('border', 'div_color', 'border-dark', 'ml-1', 'rounded-circle', 'img-thumbnail');
            div_color.onclick = () => {
                div_pics.innerHTML = '';
                image.src = ci.pics[0]; //* תמונה ראשית של צבע נוכחי
                ci.pics.forEach(pic => {
                    const small_pic = document.createElement('img');
                    small_pic.src = pic;
                    small_pic.classList.add('w-100', 'row', 'mb-2', 'small_pic');
                    div_pics.appendChild(small_pic);
                    small_pic.onclick = () => {
                        const last_select = document.querySelector('.small_pic_selected');
                        if (last_select !== null) {
                            last_select.classList.remove('small_pic_selected');
                        }
                        image.src = small_pic.src;
                        small_pic.classList.add('small_pic_selected');
                    }
                });
            }
        });
    }

    dom.div_item.appendChild(div_pics);
    image.id = "myImage";
    const div_image = document.createElement('div');
    div_image.appendChild(image);
    div_image.classList.add("p-relative", 'col-6');
    image.classList.add('w-100', 'h-100');



    dom.div_item.appendChild(div_image);

    const item_details = document.createElement('div');
    item_details.classList.add('col-4', 'text-right', 'pr-5');

    const item_name = document.createElement('span');
    item_name.innerHTML = data.item.name;
    item_details.appendChild(item_name);
    item_name.classList.add('row', 'my-3', 'item_name');
    data.select_item.id = data.item.id;
    data.select_item.item_name = data.item.name;

    const price = document.createElement('span');
    price.innerHTML = '₪' + data.item.price;
    price.classList.add('row', 'pb-5', 'border-bottom-darker');
    item_details.appendChild(price);
    item_details.appendChild(div_colors);
    const label_un_select = document.createElement('label');
    label_un_select.innerHTML = 'יש לבחור מידה.';
    label_un_select.classList.add('d-none', 'small', 'text-danger', 'row', 'mb-4');

    const sizes_div = document.createElement('div');
    sizes_div.classList.add('row', 'mt-3', 'mb-4');
    data.item.size.forEach(size => {
        const button = document.createElement('button');
        button.innerHTML = size;
        button.classList.add('design_size_btn');
        button.onclick = () => {
            const last_button = document.querySelector('.select');
            if (last_button != null) {
                last_button.classList.remove('select');
            }
            data.select_item.size = button.innerHTML;
            button.classList.add('select');
            label_un_select.classList.add('d-none');
            sizes_div.classList.add('mb-4');
            sizes_div.classList.remove('mb-1');
        };
        sizes_div.appendChild(button);
    });
    const p_details = document.createElement('p');
    p_details.classList.add('row', 'bg-light', 'd-none', 'small');
    p_details.innerHTML = data.item.description;
    const btn_details = document.createElement('btn');
    const span_details = document.createElement('span');
    btn_details.classList.add('btn_size', 'cursor_pointer', 'pr-0', 'w-100', 'my-5');
    span_details.innerHTML = 'פרטים נוספים';

    const details_plus_icon = document.createElement('i');
    details_plus_icon.setAttribute("aria-hidden", "true");
    details_plus_icon.classList.add('fa', 'fa-plus', 'float-left');
    details_plus_icon.id = 'details_plus_icon';
    span_details.id = 'span_details';
    span_details.classList.add('item_text', 'float-right');
    btn_details.append(span_details, details_plus_icon);
    btn_details.onclick = () => {
        if (details_plus_icon.classList.contains('fa-plus')) {
            details_plus_icon.classList.remove('fa-plus');
            details_plus_icon.classList.add('fa-minus');
            p_details.classList.remove('d-none');
        }
        else {
            details_plus_icon.classList.remove('fa-minus');
            details_plus_icon.classList.add('fa-plus');
            p_details.classList.add('d-none');
        }

    }
    data.select_item.image = data.item.first_image;
    item_details.appendChild(sizes_div);
    item_details.appendChild(label_un_select);
    item_details.appendChild(btn_details);
    item_details.appendChild(p_details);
    dom.div_item.appendChild(item_details);

    const div_size_label = document.createElement('div');
    const select = document.createElement('select');
    select.id = 'select_numbers';
    select.classList.add('form-control', 'w-50');
    for (let i = 1; i <= 5; i++) {
        const option_qty = document.createElement('option');
        option_qty.innerText = i;
        select.appendChild(option_qty);
    }

    const label = document.createElement('label');
    label.classList.add('placeholder', 'w-50', 'pt-1');
    label.style.for = 'select_numbers';
    label.innerHTML = 'כמות';
    item_details.appendChild(label);
    item_details.appendChild(select);
    const btn_add = document.createElement('button');
    btn_add.innerHTML = 'הוספה לסל';
    btn_add.id = 'btn_add_item';
    btn_add.classList.add('btn_size', 'carters_color', 'mt-3', 'font-weight-bold', 'hi');

    div_size_label.append(label, select);

    div_size_label.classList.add('row', 'my-3');
    item_details.append(div_size_label, btn_add);
    btn_add.onclick = () => {
        if (data.select_item.size === undefined) {
            label_un_select.classList.remove('d-none');
            sizes_div.classList.remove('mb-4');
            sizes_div.classList.add('mb-1');

            if (data.select_item.size === undefined) {

                $('#btn_add_item').click(function () {
                    $('#btn_add_item').popover('hide');
                });
            }

        }
        else {

            data.select_item.amount = select.selectedIndex + 1;
            data.select_item.price = data.item.price * data.select_item.amount;
            data.select_item.price = Math.round(data.select_item.price * 10) / 10;
            if (sessionStorage.getItem("current_customer") === null) {
                let shopping_cart = localStorage.getItem('shopping_cart');
                if (shopping_cart === null) {
                    shopping_cart = { items_in_cart: [], total_sum: 0, total_amount: 0 };
                }
                else {
                    shopping_cart = JSON.parse(shopping_cart);
                }
                let item_is_found = shopping_cart.items_in_cart.findIndex(item => item.id === data.select_item.id && item.size === data.select_item.size);
                if (item_is_found != -1) {
                    shopping_cart.items_in_cart[item_is_found].amount += data.select_item.amount;
                    shopping_cart.items_in_cart[item_is_found].price += data.select_item.price;
                    shopping_cart.items_in_cart[item_is_found].price = Math.round(shopping_cart.items_in_cart[item_is_found].price * 10) / 10;
                }
                else {
                    shopping_cart.items_in_cart.push(data.select_item);
                }
                shopping_cart.total_sum += data.select_item.price;
                shopping_cart.total_amount += data.select_item.amount;
                dom_universal.num_of_item_in_cart.innerHTML = shopping_cart.total_amount;
                shopping_cart.total_sum = Math.round(shopping_cart.total_sum * 10) / 10;
                localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
                // אם מחובר - אני רוצה לעדכן את עגלת הקניות של המשתמש
                // אם לא - לא עושה כלום
                // כל זה עד לשלב התשלום - בו יחויב להרשם כאורח אם לא רשום כמשתמש כבר
            }
            else {
                let shopper = JSON.parse(localStorage[JSON.parse(sessionStorage["current_customer"]).email]); // שליפת עגלת הקניות של הקונה 
                if (shopper.shopping_cart === undefined) { // אם לא קיימת לקונה עגלת קניות
                    shopper.shopping_cart = { items_in_cart: [], total_sum: 0, total_amount: 0 };

                }
                let item_is_found = shopper.shopping_cart.items_in_cart.findIndex(item => item.id === data.select_item.id && item.size === data.select_item.size);
                if (item_is_found != -1) {
                    shopper.shopping_cart.items_in_cart[item_is_found].amount += data.select_item.amount;
                    shopper.shopping_cart.items_in_cart[item_is_found].price += data.select_item.price;
                    shopper.shopping_cart.items_in_cart[item_is_found].price = Math.round(shopper.shopping_cart.items_in_cart[item_is_found].price * 10) / 10;
                }
                else {
                    shopper.shopping_cart.items_in_cart.push(data.select_item);
                }
                shopper.shopping_cart.total_sum += data.select_item.price;
                shopper.shopping_cart.total_amount += data.select_item.amount;
                dom_universal.num_of_item_in_cart.innerHTML = shopper.shopping_cart.total_amount;

                shopper.shopping_cart.total_sum = Math.round(shopper.shopping_cart.total_sum * 10) / 10;
                localStorage[JSON.parse(sessionStorage["current_customer"]).email] = JSON.stringify(shopper);
            }
            const last_button = document.querySelector('.select');
            last_button.classList.remove('select');
            data.select_item.size = undefined;
            btn_add.innerHTML = "נוסף";
            setTimeout(function () { btn_add.innerHTML = 'הוספה לסל'; }, 800);
        }

    }


};

fetch_item();


