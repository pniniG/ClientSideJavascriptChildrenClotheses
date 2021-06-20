const dom = {
    div_content: document.querySelector('#div_content'),
};

const data = {
    categories: [],

};

const fetch_categories = () => {
    $.ajax({
        url: './data.json',
        success: (myData) => {
            data.categories = myData.categories;
            print_categories();
        }
    });
};


const print_categories = () => {
    const div_content = document.createElement('div');
    dom.div_content.appendChild(div_content);
    data.categories.splice(data.categories.findIndex(cat => cat.category_name === 'New-born'), 1);

    const allcategories = document.createElement('div');
    allcategories.classList.add('row', 'col-10', 'text-center', 'margin_center');
    allcategories.style.marginTop = '7%';
    const divs = data.categories.map(cat => {
        const div = document.createElement('div');
        div.classList.add('col-sm-12', 'col-md-6', 'col-lg-3','px-2');

        const category_name = document.createElement('div');
        category_name.classList.add('w-100', 'bg-white', 'text_above', 'justify-content-center', 'd-none');

        const category_image = document.createElement('img');
        category_image.classList.add('w-100', 'img_under');
        category_image.src = cat.small_image;
        const span_name = document.createElement('span');
        span_name.classList.add( 'big_font');
        span_name.innerHTML = cat.category_name;
        category_name.appendChild(span_name);
        const a = document.createElement('a');
        a.appendChild(category_image);
        a.appendChild(category_name);
        const url = new URL('./category.html', location.href);
        url.searchParams.set('category_name', cat.category_name);
        a.href = url.href;

        div.onmouseenter = () => {
            category_name.classList.remove('anim_hide_text', 'd-none');
        }
        div.onmouseleave = () => {
            category_name.classList.add('anim_hide_text');
            setTimeout(function () { category_name.classList.add('d-none'); }, 498);
        }

        div.appendChild(a);
        return div;

    });
    allcategories.append(...divs);
    div_content.appendChild(allcategories);
};

fetch_categories();





