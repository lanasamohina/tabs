window.addEventListener('DOMContentLoaded', init);

function init () {
    const tabsBtn = document.querySelector('.js-tabs');
    tabs(tabsBtn, 'fade');

    const tabsBtn2 = document.querySelector('.js-tabs-slider');
    tabs(tabsBtn2,'slide');
}

function tabs (tabsBtn, effect = 'fade' ) {

    let effectList = ['fade', 'slide'];
    if (effectList.indexOf(effect) === -1){
        effect = 'fade';
    }

    const activeTab = 'tabs__content-item--active';
    const activeBtn = 'tabs__item--active';
    let bar = document.createElement('div');
    bar.classList.add('tabs_bar');
    tabsBtn.appendChild(bar);
    let startTab = tabsBtn.querySelector(`.${activeBtn}`);
    //moving bar to the initial position
    moveBar(bar,startTab);

    if (effect == 'slide') {
        calcRowWidth();
    }

    tabsBtn.addEventListener('click', ev => {
        if (ev.target.tagName === 'A') {
            const anchor = ev.target.getAttribute('href');
            //moving bar
            moveBar(bar,ev.target);
            let tabconteiner = ev.target.closest('.tabs');
            switchTab(anchor, effect, tabconteiner);
            switchActiveBtn(ev.target);
            ev.preventDefault();
        }
    });

    function switchTab (selector, effect, tabconteiner) {
        let tab = tabconteiner.querySelector(selector);
        let parent = tab.closest('.tabs__content');
        switch(effect) {
            case 'fade':
                fadeFunction(parent, tab);
                break;
            case 'slide':
                slideFunction(parent, tab);
                break;
        }
    }

    function fadeFunction(parent, tab){
        //fade effect
        parent.querySelector(`.${activeTab}`).style.opacity = 0;
        tab.style.opacity = 0;
        setTimeout(function(){
            parent.querySelector(`.${activeTab}`)
                .classList.remove(activeTab);
            tab.classList.add(activeTab);
            setTimeout(function () {
                tab.style.opacity = 1;
            },100);
        },400);
    }

    function slideFunction(parent, tab) {
        parent.style.transform ='translateX(-'+ tab.offsetLeft+'px)';

    }

    function switchActiveBtn (selector) {
        let li = selector.parentElement;
        let parent = li.closest('.tabs__list');
        parent.querySelector(`.${activeBtn}`)
            .classList.remove(activeBtn);
        li.classList.add(activeBtn);
    }

    function moveBar(bar, actTab){
        let height = actTab.getBoundingClientRect().height;
        let width = actTab.getBoundingClientRect().width;
        let left = actTab.offsetLeft;
        bar.style.display = 'block';
        bar.style.left = left+'px';
        bar.style.width = width+'px';
        let barheigth = bar.offsetHeight;
        bar.style.top = (height-barheigth)+'px';
    }

    function calcRowWidth() {
        let n = document.querySelectorAll('.tabs-slider .tabs__item').length;
        let itemWidth = document.querySelector('.tabs-slider .tabs__content-item').offsetWidth;
        document.querySelector('.tabs-slider .tabs__content').style.width = itemWidth*n +'px';
    }
}
