function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });;

"use strict"
/*
// Определение устройства просмотра страницы (Мобильное или ПК)

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    },
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}
// --------------------------------------------------------------------------------

// Бургер меню


const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    }) 
}

// --------------------------------------------------------------------------------


// Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
            });
            e.preventDefault();
        }
    }
}

// --------------------------------------------------------------------------------
*/


// Pageslider-swiper (full screen) ----------------------------------------------------

let wrapper = document.querySelector('.wrapper');
let header = document.querySelector('.header');
let headerLogo = document.querySelector('.header__logo');

let pageSlider = new Swiper('.page', {
    wrapperClass: 'page__wrapper',
    slideClass: 'page__screen',

    // Вертикальный слайдер
    direction: 'vertical',

    // Количество слайдов для показа
    slidesPerView: 'auto',

    // Включение параллакс
    parallax: true,

    // Управление клавиатурой
    keyboard: {
        // Включить \ выключить
        enabled: true,

        // Включить \ выключить
        // только когда слайдер
        // в пределах вьюпорта
        onlyInViewPort: true,

        // включить \ выключить
        // управление клавишами
        // pageUp, pageDown
        pageUpDown: true,

    },

    // Управление колесом мыши
    mousewheel: {
        // чувствительность колеса мыши
        sensetivity: 1,
        // Класс объект на котором
        // будет срабатывать прокрутка мышью
        // eventsTarget: ".image-slider"
    },

    // Отключение функционала
    // если слайдов меньше чем нужно
    watchOverflow: true,

    // Скорость
    speed: 800,

    // Обновить свайпер
    // при изменении элементов слайдера
    observeParents: true, 

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    jbserveSlideChildren: true, 


    // Навигация
    // Буллеты, текущее положение, прогрессбар
    pagination: {
        el: '.page__pagination',
        type: 'bullets', 
        clickable: true, 
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },

    // Скролл
    scrollbar: {
        el: '.page__scroll',
        dragClass: 'page__drag-scroll',
        // Возможность перетаскивать скролл
        draggable: true
    },

    // Отключаем автоинициализацию для работы ON ниже
    init: false,

    // События
    on: {
        //Событие инициилизации
        init: function() {
            menuSlider();
            setScrollType();
            wrapper.classList.add('_loaded');
            header.classList.add('_showed');
            
        },

        // Событие смены слайда
        slideChange: function() {
            menuSLiderRemove();
            menuLinks[pageSlider.realIndex].classList.add('_active');
            if (pageSlider.realIndex % 2 === 0) {
                header.classList.remove('_dark');
                header.classList.add('_bright');
            } else {
                header.classList.remove('_bright');
                header.classList.add('_dark');
            }
            if (pageSlider.realIndex === 0) {
                setTimeout(function(e) {
                    headerLogo.style.width = "15rem";
                    headerLogo.style.height = "15rem";
                }, 800);
            } else {
                headerLogo.style.width = "6rem";
                headerLogo.style.height = "6rem";
            }
        },

        resize: function () {
            setScrollType();
        },
    }
});

// навигация сайта

let menuLinks = document.querySelectorAll('.menu__link');
let headerBtn = document.querySelector('.intro__arrow');

function menuSlider() {
    if (menuLinks.length > 0) {
        menuLinks[pageSlider.realIndex].classList.add('_active');
        for (let index = 0; index < menuLinks.length; index++) {
            const menuLink = menuLinks[index];
            headerBtn.addEventListener('click', function(e) {
                pageSlider.slideTo(1, 800);
                e.preventDefault();
            })
            menuLink.addEventListener('click', function(e) {
                menuSLiderRemove();
                pageSlider.slideTo(index, 800);
                menuLink.classList.add('_active');
                e.preventDefault();
            })


        }
    }
}

function menuSLiderRemove(params) {
    let menuLinkActive= document.querySelector('.menu__link._active');
    if (menuLinkActive) {
        menuLinkActive.classList.remove('_active');
    }
}

function setScrollType() {

    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode = false;
    }

    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        if (pageSlideContent) {
            const pageContentHeight = pageSlideContent.offsetHeight;
            if (pageContentHeight > window.innerHeight) {
                wrapper.classList.add('_free');
                pageSlider.params.freeMode = true;
                break;
            }
        }
    }
}

pageSlider.init();

// --------------------------------------------------------------------------------

// specialties slider -------------------------------------------------------------

let specsSlider = new Swiper('.swiper-specialties', {
    wrapperClass: 'swiper-specialties__wrapper',
    slideClass: 'slide-specialties',

    direction: 'horizontal',
    // Включение параллакс
    parallax: true,
    
    slidesPerView: 1,

    // Скорость
    speed: 800,

    // Обновить свайпер
    // при изменении элементов слайдера
    observeParents: true, 

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    jbserveSlideChildren: true, 


    // Навигация
    // Буллеты, текущее положение, прогрессбар
    pagination: {
        el: '.swiper-specialties__pagination',
        type: 'bullets', 
        clickable: true, 
        bulletClass: "swiper-specialties__bullet",
        bulletActiveClass: "swiper-specialties__bullet_active",
    },
})

// --------------------------------------------------------------------------------

// Фильтр меню---------------------------------------------------

let filterButtons = document.querySelectorAll('.filter-menu__link');
filterButtons[0].classList.add('_active');
let filterContents = document.querySelectorAll('.prices-menu');
filterContents[0].classList.add('_active');

for (index = 0; index < filterButtons.length; index++) {
    let filterBtn = filterButtons[index];
    let contentFilter = filterContents[index];
    filterBtn.onclick = function (e) {
        let activeFilter = document.querySelector('.filter-menu__link._active');
        let activeFilterContent = document.querySelector('.prices-menu._active');

        activeFilter.classList.remove('_active');
        activeFilterContent.classList.remove('_active');
        filterBtn.classList.add('_active');
        contentFilter.classList.add('_active');
    };
}

// --------------------------------------------------------------------------------