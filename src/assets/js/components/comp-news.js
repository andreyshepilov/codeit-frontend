'use strict';

function createNewsSlides(newsList) {
    newsList.forEach(function (item) {
        let date = new Date(item.date * 1000);
        let day = String(date.getUTCDate()).length < 2 
                    ? '0' + String(date.getUTCDate())
                    : date.getUTCDate();
        let month = String(date.getUTCMonth() + 1).length < 2
                    ? '0' + String(date.getUTCMonth() + 1)
                    : date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();
        var formattedTime = day + '.' + month + '.' + year;
        
        jQuery('.comp-news__slider')
            .append(jQuery(
                `<div class="comp-news__slide">
                    <div class="comp-news__summary">
                        <img class="comp-news__reserve-image"
                            src="` + item.img + `"
                            alt="author" width="130" height="100">
                        <div class="comp-news__image"
                            style="background-image:url('` + item.img + `');">
                        </div>
                        <div class="comp-news__info">
                            <div class="comp-news__info-row">
                                <b class="comp-news__info-title">Author: </b>
                                <span>` + item.author + `</span>
                            </div>
                            <div class="comp-news__info-row">
                                <b class="comp-news__info-title">Public: </b>
                                <span>` + formattedTime + `</span>
                            </div>
                        </div>
                    </div>
                    <div class="comp-news__content">
                        <h6 class="comp-news__title">
                            <a href="https://` + item.link + `">
                                Title
                            </a>
                        </h6>
                        <div class="comp-news__text">` + item.description.trunc(200) + `</div>
                    </div>
                </div>`));
    });
}

function initSlider(selector) {
    jQuery(selector).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        swipe: true
    });
}

module.exports = {
    createNewsSlides: createNewsSlides,
    initSlider: initSlider
};