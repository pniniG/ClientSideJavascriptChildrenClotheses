const dom = {
    main_div: document.querySelector('#main_div'),
};

const data = {
    categories: [],
    current_category_data: {},

};

const fetch_main_category = () => {
    $.ajax({
        url: './data.json',
        success: (myData) => {
            data.categories = myData.categories; 
            const url = new URL(location.href);
            const current_category_name = url.searchParams.get('category_name');
            data.current_category_data = data.categories.find(category => category.category_name === current_category_name);
            print_main_category();
        }
    });
};

const print_main_category = () => {
    const top_div = document.createElement('div');
    const top_image = document.createElement('img');
    top_image.src = data.current_category_data.image;
    top_image.classList.add('col-12','px-0');
    top_div.classList.add('justify-content-center','row');
    top_div.appendChild(top_image);
    dom.main_div.appendChild(top_div);

    const shop_by_category = document.createElement('img');
    shop_by_category.src = 'pics/text1.png';
    shop_by_category.classList.add('w-25');

    const div_sub_categories = document.createElement('div');
    div_sub_categories.classList.add('row', 'justify-content-around', 'px-2');
    const all_sub_categories = [];
    data.current_category_data.sub_categories.forEach(sub_category => {
  
        let image_sub_category = document.createElement('img');
        image_sub_category.src = sub_category.image;
        image_sub_category.classList.add('img_under_sub', 'my_sub_image');
        const a = document.createElement('a');
        const sub_category_name = document.createElement('div');
        sub_category_name.classList.add('bg-white', 'text_above_sub', 'd-none');
        const span_name = document.createElement('span');
        span_name.classList.add('big_font', 'move_text');
        span_name.innerHTML = sub_category.name;
        sub_category_name.appendChild(span_name);

        a.appendChild(image_sub_category);
        a.appendChild(sub_category_name);
        const url = new URL('./sub_category.html', location.href);
        url.searchParams.set('category_name', data.current_category_data.category_name);
        url.searchParams.set('sub_category_name', sub_category.name);
        a.href = url.href;
        all_sub_categories.push(a);
        
        a.onmouseenter = () => {
            sub_category_name.classList.remove('anim_hide_text', 'd-none');
        }
        a.onmouseleave = () => {
            sub_category_name.classList.add('anim_hide_text');
            setTimeout(function () { sub_category_name.classList.add('d-none'); }, 498);
        }

    });
    for (let i = 0; i < 5; i++) {
        let div_sub_category = document.createElement('div');
        div_sub_category.appendChild(all_sub_categories[i]);
        div_sub_category.classList.add('col-md','col-sm-6');
        div_sub_categories.appendChild(div_sub_category);
    }
    const a_prev = document.createElement('a'), a_next = document.createElement('a');

    const i_prev = document.createElement('i'), i_next = document.createElement('i');
    const div_prev = document.createElement('div'), div_next = document.createElement('div');
    i_prev.classList.add('fas', 'fa-angle-left');
    i_next.classList.add('fas', 'fa-angle-right');

    a_prev.appendChild(i_prev); a_next.appendChild(i_next);
    div_prev.appendChild(a_prev); div_next.appendChild(a_next);

    i_next.classList.add('design_rl');
    i_prev.classList.add('design_rl');

    a_next.classList.add( 'rounded-circle','float-right','arrow');
    a_prev.classList.add( 'rounded-circle','float-left','arrow');

    let current_index = 0;
    a_prev.onclick = () => {
        let i;
        if (current_index === all_sub_categories.length - 1) {
            i = 0; current_index = 0;
        }
        else {
            i = ++current_index;
        }
        div_sub_categories.childNodes.forEach(div => {

            a = div.firstChild;
            div.innerHTML = '';
            div.appendChild(all_sub_categories[i]);
            if (i === all_sub_categories.length - 1) {
                i = 0;
            }
            else {
                i++;
            }
        });
    }
    a_next.onclick = () => {
        let i;
        if (current_index === 0) {
            i = all_sub_categories.length - 1; current_index = all_sub_categories.length - 1;
        }
        else {
            i = --current_index;
        }
        div_sub_categories.childNodes.forEach(div => {
            a = div.firstChild;
            div.innerHTML = '';
            div.appendChild(all_sub_categories[i]);

            if (i === all_sub_categories.length - 1) {
                i = 0;
            }
            else {
                i++;
            }
        });
    }

    dom.main_div.appendChild(shop_by_category);
    dom.main_div.appendChild(div_sub_categories);

    dom.main_div.append(a_next,a_prev);
}

fetch_main_category();