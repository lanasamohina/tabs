window.addEventListener('DOMContentLoaded', init);

function init () {
    const tabsBtn = document.querySelector('.js-tabs');
    tabs(tabsBtn);

    ///const tabsBtn2 = document.querySelector('.tabs-2 .js-tabs');
    //tabs(tabsBtn2);
}

function tabs (tabsBtn) {
    const activeTab = 'tabs__content-item--active';
    const activeBtn = 'tabs__item--active';
    let bar = document.createElement('div');
    bar.classList.add('tabs_bar');
    tabsBtn.appendChild(bar);
    let startTab = tabsBtn.querySelector(`.${activeBtn}`);

    //moving bar to the initial position
    moveBar(bar,startTab);

    tabsBtn.addEventListener('click', ev => {
        if (ev.target.tagName === 'A') {
        const anchor = ev.target.getAttribute('href');

        //moving bar
        moveBar(bar,ev.target);
        switchTab(anchor);
        switchActiveBtn(ev.target);
    }
});

    function switchTab (selector) {
        let tab = document.querySelector(selector);
        let parent = tab.closest('.tabs__content');

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
}