const dom = {
    div_header: document.querySelector('#div_header'),
    clothesContainer: document.querySelector('.items div'),
    sort: document.querySelector('#sort'),
};
const data = {
    current_category_name: "",
    current_sub_category_name: "",
    clothes: [],
    clothes_filter: [],
    category_size: [],
};



const print_sort = () => {
    const btn_top_sort = document.createElement('button');
    const h5_sub_name = document.createElement('h5');
    h5_sub_name.innerHTML = data.current_sub_category_name;
    h5_sub_name.classList.add('col-2');
    const h6_category_name = document.createElement('h6');
    h6_category_name.innerHTML = data.current_category_name + ' ' + data.current_sub_category_name;
    h6_category_name.classList.add('col-8');
    dom.div_header.appendChild(h5_sub_name);
    dom.div_header.appendChild(h6_category_name);


    const div_sort = document.createElement('div');
    const div_top_sort = document.createElement('div');
    const plus_icon = document.createElement('i');
    plus_icon.setAttribute("aria-hidden", "true");
    plus_icon.classList.add('fa', 'fa-plus', 'float-left', 'ml-3','mt-1');
    const span_sort = document.createElement('span');
    span_sort.innerHTML = 'מיין לפי';
    span_sort.classList.add('float-right', 'mr-3');
    btn_top_sort.append(span_sort, plus_icon);
    div_top_sort.classList.add('d-none', 'bg-grey', 'justify-content-center');
    div_sort.classList.add('bg-grey');
    btn_top_sort.classList.add('bg-grey', 'w-100', 'border-0', 'design_clear_btn');
    div_sort.append(btn_top_sort, div_top_sort)
    dom.sort.append(div_sort);
    btn_top_sort.onclick = () => {
        if (plus_icon.classList.contains('fa-plus')) {
            plus_icon.classList.remove('fa-plus');
            plus_icon.classList.add('fa-minus');
            div_top_sort.classList.remove('d-none');
        }
        else {
            plus_icon.classList.remove('fa-minus');
            plus_icon.classList.add('fa-plus');
            div_top_sort.classList.add('d-none');
        }
    }
    const div_first_option = document.createElement('div');
    const div_second_option = document.createElement('div');
    const div_third_option = document.createElement('div');
    div_first_option.classList.add('form-check', 'row', 'border-bottom', 'mr-4', 'w-75', 'py-2');
    div_second_option.classList.add('form-check', 'row', 'border-bottom', 'mr-4', 'w-75', 'py-2');
    div_third_option.classList.add('form-check', 'row', 'mr-4', 'w-75', 'py-2', 'pb-3');
    const label_first_option = document.createElement('label');
    const label_second_option = document.createElement('label');
    const label_third_option = document.createElement('label');
    label_first_option.classList.add('form-check-label');
    label_second_option.classList.add('form-check-label');
    label_third_option.classList.add('form-check-label');
    const radio_first_option = document.createElement('input');
    const radio_second_option = document.createElement('input');
    const radio_third_option = document.createElement('input');
    radio_first_option.setAttribute("type", "radio");
    radio_second_option.setAttribute("type", "radio");
    radio_third_option.setAttribute("type", "radio");
    radio_first_option.setAttribute("name", "radio_sort");
    radio_second_option.setAttribute("name", "radio_sort");
    radio_third_option.setAttribute("name", "radio_sort");
    label_first_option.innerText = 'מחיר מהנמוך לגבוה';
    label_second_option.innerText = 'מחיר מהגבוה לנמוך';
    label_third_option.innerText = 'לפי האלף בית';
    label_first_option.classList.add('mr-1');
    label_second_option.classList.add('mr-1');
    label_third_option.classList.add('mr-1');
    div_first_option.append(radio_first_option, label_first_option);
    div_second_option.append(radio_second_option, label_second_option);
    div_third_option.append(radio_third_option, label_third_option);
    div_top_sort.append(div_first_option, div_second_option, div_third_option);


    radio_first_option.defaultChecked = true; // בטעינת העמוד הראשונה - יהיה מיון ברירת מחדל מהנמוך לגבוה
    data.clothes_filter = data.clothes;
    data.clothes_filter.sort(function (a, b) {
        return a.price - b.price;
    });
    printClothes();

    radio_first_option.onclick = () => { // מיון מהמחיר הנמוך לגבוה
        dom.clothesContainer.innerHTML = "";
        if (data.clothes_filter.length === 0)
            data.clothes_filter = data.clothes;
        data.clothes_filter.sort(function (a, b) {
            return a.price - b.price;
        });
        printClothes();
    }

    radio_second_option.onclick = () => {
        dom.clothesContainer.innerHTML = "";
        if (data.clothes_filter.length === 0)
            data.clothes_filter = data.clothes;
        data.clothes_filter.sort(function (a, b) {
            return b.price - a.price;
        });
        printClothes();
    }

    radio_third_option.onclick = () => {
        dom.clothesContainer.innerHTML = "";
        if (data.clothes_filter.length === 0)
            data.clothes_filter = data.clothes;
        data.clothes_filter.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        printClothes();
    }



}

const print_filters = () => {
    const div_filters = document.createElement('div');
    dom.sort.append(div_filters);
    div_filters.classList.add('mt-2', 'bg-grey', 'justify-content-center');


    const a_clear_all = document.createElement('a');
    a_clear_all.classList.add('d-none','small_text','mr-2','text-decoration','cursor_pointer');
    a_clear_all.innerHTML = 'נקה הכל';
    dom.sort.appendChild(a_clear_all)
    a_clear_all.onclick = () => {

        const all_select_size = document.querySelectorAll('.select_size'); // כל המידות שצריך לסנן לפיהם
        const all_select_color = document.querySelectorAll('.select_color'); //כל הצבעים שצריך לסנן
        all_select_size.forEach(select_size => {
            select_size.classList.remove('select_size');
        });
        all_select_color.forEach(select_color => {
            select_color.classList.remove('select_color');
        });
        const input_from = document.querySelector('#input_from');
        const input_till = document.querySelector('#input_till');
        input_from.value = 0;
        input_till.value = 1000;
        a_clear_all.classList.add('d-none');
        filter_all();
    }

    print_filter_size(div_filters, a_clear_all);
    print_filter_color(div_filters, a_clear_all);
    print_filter_price(div_filters, a_clear_all);
}

const check_empty_filter = (a_clear_all) => {
    const all_select_size = document.querySelectorAll('.select_size'); // כל המידות שצריך לסנן לפיהם
    const all_select_color = document.querySelectorAll('.select_color'); //כל הצבעים שצריך לסנן
    const input_from = document.querySelector('#input_from');
    const input_till = document.querySelector('#input_till');

    if (all_select_size.length === 0 && all_select_color.length === 0 && input_from.value === '0' && input_till.value === '1000') {
        a_clear_all.classList.add('d-none');
    }
}

const print_filter_size = (div_filters, a_clear_all) => {
    const btn_size = document.createElement('button');
    const div_size = document.createElement('div');
    const size_plus_icon = document.createElement('i');
    size_plus_icon.setAttribute("aria-hidden", "true");
    size_plus_icon.classList.add('fa', 'fa-plus', 'float-left', 'ml-3','mt-1');
    const span_size = document.createElement('span');
    span_size.innerHTML = 'מידה';
    span_size.classList.add('float-right', 'mr-3');
    btn_size.append(span_size, size_plus_icon);
    div_size.classList.add('d-none', 'bg-grey', 'text-center', 'ltr_direction');
    btn_size.classList.add('bg-grey', 'w-100', 'border-0', 'design_clear_btn');
    div_filters.append(btn_size, div_size);
    btn_size.onclick = () => {
        if (size_plus_icon.classList.contains('fa-plus')) {
            size_plus_icon.classList.remove('fa-plus');
            size_plus_icon.classList.add('fa-minus');
            div_size.classList.remove('d-none');
        }
        else {
            size_plus_icon.classList.remove('fa-minus');
            size_plus_icon.classList.add('fa-plus');
            div_size.classList.add('d-none');
        }
    }
    data.category_size.forEach(size => {
        const btn_show_size = document.createElement('button');
        btn_show_size.innerHTML = size;
        btn_show_size.classList.add('design_filter_btn');
        div_size.appendChild(btn_show_size);

        btn_show_size.onclick = () => {
            if (btn_show_size.classList.contains('select_size')) {
                btn_show_size.classList.remove('select_size');
                check_empty_filter(a_clear_all);
            }
            else {
                btn_show_size.classList.add('select_size');
                a_clear_all.classList.remove('d-none');
            }
            filter_all();
        }
    });
}

const print_filter_color = (div_filters, a_clear_all) => {
    const btn_color = document.createElement('button');
    const div_colors = document.createElement('div');
    const color_plus_icon = document.createElement('i');
    color_plus_icon.setAttribute("aria-hidden", "true");
    color_plus_icon.classList.add('fa', 'fa-plus', 'float-left', 'ml-3','mt-1');
    const span_color = document.createElement('span');
    span_color.innerHTML = 'צבע';
    span_color.classList.add('float-right', 'mr-3');
    btn_color.append(span_color, color_plus_icon);
    div_colors.classList.add('d-none', 'bg-grey', 'text-center');
    btn_color.classList.add('bg-grey', 'w-100', 'border-0', 'design_clear_btn');//'row',
    div_filters.append(btn_color, div_colors);
    btn_color.onclick = () => {
        if (color_plus_icon.classList.contains('fa-plus')) {
            color_plus_icon.classList.remove('fa-plus');
            color_plus_icon.classList.add('fa-minus');
            div_colors.classList.remove('d-none');
        }
        else {
            color_plus_icon.classList.remove('fa-minus');
            color_plus_icon.classList.add('fa-plus');
            div_colors.classList.add('d-none');
        }
    }

    data.sub_category_colors.forEach(color => {
        const show_color = document.createElement('button');
        div_colors.appendChild(show_color);
        show_color.innerHTML = color;
        show_color.classList.add('design_filter_btn');
        show_color.onclick = () => {
            if (show_color.classList.contains('select_color')) {
                show_color.classList.remove('select_color');
                check_empty_filter(a_clear_all);
            }
            else {
                show_color.classList.add('select_color');
                a_clear_all.classList.remove('d-none');
            }
            filter_all();
        }
    })
}

const print_filter_price = (div_filters, a_clear_all) => {
    const btn_price = document.createElement('button');
    const div_prices = document.createElement('div');
    const price_plus_icon = document.createElement('i');
    price_plus_icon.setAttribute("aria-hidden", "true");
    price_plus_icon.classList.add('fa', 'fa-plus', 'float-left', 'ml-3','mt-1');
    const span_price = document.createElement('span');
    span_price.innerHTML = 'מחיר';
    span_price.classList.add('float-right', 'mr-3');
    btn_price.append(span_price, price_plus_icon);
    div_prices.classList.add('d-none', 'bg-grey');
    btn_price.classList.add('bg-grey', 'w-100', 'border-0', 'design_clear_btn');
    div_filters.append(btn_price, div_prices);
    btn_price.onclick = () => {
        if (price_plus_icon.classList.contains('fa-plus')) {
            price_plus_icon.classList.remove('fa-plus');
            price_plus_icon.classList.add('fa-minus');
            div_prices.classList.remove('d-none');
        }
        else {
            price_plus_icon.classList.remove('fa-minus');
            price_plus_icon.classList.add('fa-plus');
            div_prices.classList.add('d-none');
        }
    }

    const span_price_range = document.createElement('span');
    const div_price_range = document.createElement('div');
    span_price_range.innerHTML = 'טווח מחירים:';
    span_price_range.style.marginRight = '1.4rem';
    span_price_range.style.display = 'block';
    const input_from = document.createElement('input');
    input_from.classList.add('w-25', 'mx-2', 'price-form-control');
    input_from.style.display = 'inline-block';
    input_from.value = 0;
    input_from.id = 'input_from';
    const input_till = document.createElement('input');
    input_till.classList.add('w-25', 'mx-2', 'price-form-control');
    input_till.value = 1000;
    input_till.id = 'input_till';
    input_till.style.display = 'inline-block';
    const label_line = document.createElement('label');
    label_line.innerHTML = '-';
    div_price_range.classList.add('py-2', 'h-25');
    div_price_range.style.marginRight = '0.9rem';
    div_price_range.append(input_till, label_line, input_from);
    div_prices.append(span_price_range, div_price_range);
    input_from.onkeypress = (event) => {
        const code = event.keyCode;
        if (code < '0'.charCodeAt(0) || code > '9'.charCodeAt(0)) {
            event.preventDefault();
        }
    }
    input_till.onkeypress = (event) => {
        const code = event.keyCode;
        if (code < '0'.charCodeAt(0) || code > '9'.charCodeAt(0)) {
            event.preventDefault();
        }
    }
    input_from.onblur = () => {
        if (input_from.value === "")
            input_from.value = '0';
        if (input_from.value === '0') {
            check_empty_filter(a_clear_all);
        }
        else {
            a_clear_all.classList.remove('d-none');
        }
        filter_all();
    }
    input_till.onblur = () => {
        if (input_till.value === "")
            input_till.value = '1000';
        if (input_from.value === '1000') {
            check_empty_filter(a_clear_all);
        }
        else {
            a_clear_all.classList.remove('d-none');
        }
        filter_all();
    }
}


const filter_all = () => {
    dom.clothesContainer.innerHTML = "";
    data.clothes_filter = [];
    let ezer_size = [];
    let ezer_color = [];
    var have_items = true;
    const all_select_size = document.querySelectorAll('.select_size'); // כל המידות שצריך לסנן לפיהם
    if (all_select_size.length === 0) {
        ezer_size = data.clothes;// אם לא נדרש אף סינון-תביא לבינתיים את כל הפריטים
    }
    else {//אם נדרש סינון - תביא את כל הפריטים שתואמים לו
        all_select_size.forEach(select_size => {
            ezer_size.push(...data.clothes.filter(cloth => cloth.size.includes(select_size.innerHTML) && !ezer_size.includes(cloth)));
        });
        if (ezer_size.length === 0) { // אם  לאחר הסינון לא נשארו פריטים
            have_items = false;
        }
    }
    if (have_items) {
        const all_select_color = document.querySelectorAll('.select_color'); //כל הצבעים שצריך לסנן
        if (all_select_color.length === 0) { //    אם אין צבעים לסינון - תשלח לסינון המחיר  
            // אם אין מה לסנן בצבעים אבל יש מה לסנן מהמידות
            ezer_color = ezer_size;
        }
        else {//אם יש צבעים לסינון - תכניס רק מה שעונה על הסינון של הצבעים והמידות יחד
            all_select_color.forEach(select_color => {
                ezer_color.push(...ezer_size.filter(cloth => cloth.colors_images.find(ci => ci.color === select_color.innerHTML) !== undefined && !ezer_color.includes(cloth)));
            });
        }
        if (ezer_color.length === 0) {// אם ריק  -זא שאין אף פריט שמתאים לשתי הסינונים ביחד
            have_items = false;
        }
        else {// אם יש פריטים שמתאימים ל2 הסינונים - תעבור לסינון המחיר
            const input_from = document.querySelector('#input_from');
            const input_till = document.querySelector('#input_till');
            data.clothes_filter.push(...ezer_color.filter(cloth => (cloth.price >= input_from.value && cloth.price <= input_till.value) && !data.clothes_filter.includes(cloth)));
            if (data.clothes_filter.length === 0) {// אם אין פריטים שעונים על 3 הסינונים
                have_items = false;
            }
            else { // אם יש - תדפיס
                printClothes();
            }
        }
    }
    if (!have_items) {
        const span = document.createElement('span');
        span.innerHTML = "לא נמצאו פריטים תואמים לחיפוש.";
        dom.clothesContainer.appendChild(span);
    }
}

const printClothes = () => {
    if (data.clothes_filter.length === 0) {
        data.clothes_filter = data.clothes;
    }
    const divs = data.clothes_filter.map(cloth => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        image.src = cloth.first_image;
        image.onmouseenter = () => {
            image.src = cloth.second_image;
        }
        image.onmouseleave = () => {
            image.src = cloth.first_image;
        }

        const h6_name = document.createElement('h6');
        h6_name.innerHTML = cloth.name;
        h6_name.classList.add('text-truncate', 'mt-2', 'black_text','sub_item_name' ,'mb-1');
        div.title = cloth.name;
        const span = document.createElement('span');
        span.innerHTML = `מחיר: ${cloth.price} ₪`;
        span.classList.add('black_text');
        span.style.fontSize = '0.95rem';
        span.style.fontSize = '0.85rem';
        div.classList.add('mb-5');
        div.append(image,h6_name,span);
        const a = document.createElement('a');
        a.appendChild(div);


        a.classList.add('show_pr_div', 'text-right', 'col-sm-6', 'col-lg-3', 'item_img', 'text-decoration-none');
        image.classList.add('w-100');

        const url = new URL('./item.html', location.href);
        url.searchParams.set('item', cloth.id);
        a.href = url.href;
        return a;
    });
    dom.clothesContainer.append(...divs);
    dom.clothesContainer.classList.add('mt-3');
};




const fetchClothes = () => {
    $.ajax({
        url: './data.json',
        success: (myData) => {
            const url = new URL(location.href);
            data.current_category_name = url.searchParams.get('category_name');
            data.current_sub_category_name = url.searchParams.get('sub_category_name');
            data.clothes = myData.allitems.filter(cloth => cloth.category === data.current_category_name && cloth.sub_category === data.current_sub_category_name)
            data.category_size = (myData.categories.find(c => c.category_name === data.current_category_name)).category_size;
            data.sub_category_colors = ((myData.categories.find(c => c.category_name === data.current_category_name)).sub_categories).find(sb => sb.name === data.current_sub_category_name).useful_colors;

            print_sort();
            print_filters();
        }
    });
};

fetchClothes();
