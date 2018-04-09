'use strict';

var libModule = require("./components/lib");
var httpModule = require("./components/http");
var signUpModule = require("./components/sign-up");
var companiesLocationModule = require("./components/comp-location");
var companiesTotalModule = require("./components/comp-total");
var companiesListModule = require("./components/list-comp");
var companiesNewsModule = require("./components/comp-news");

import 'slick-carousel/slick/slick.min';

jQuery(function(){

    jQuery('.sign-up .custom-form__submit').on( 'click', function() {
        signUpModule.signUpSubmit();
        return false; // prevent refresh
    });

    if((jQuery('.comp-total').length > 0) || 
        (jQuery('.list-comp').length > 0) || 
        (jQuery('.partners').length > 0) || 
        (jQuery('.comp-location').length > 0)) {

        httpModule.get('company/getList').then(function(value){
            let cards = jQuery(
                `.comp-total .card, 
                .list-comp .card, 
                .partners .card, 
                .comp-location .card`);
            if (value.status == 'OK') {
                cards.removeClass('loading');

                let responseData = value.list;

                let companiesTotal = responseData.length;
                companiesTotalModule.showCompaniesTotal(companiesTotal);
                companiesListModule.showCompaniesList(responseData);

                let processedLocations = companiesLocationModule.processLocations(responseData);
                let chartSlices = companiesLocationModule.createChartModel(processedLocations);

                companiesLocationModule.drawChart('.comp-location__chart', chartSlices);
                companiesLocationModule.setChartHandlers(processedLocations);
            } else {
                cards
                    .removeClass("loading")
                    .addClass('error')
                    .find('.card__error-message')
                    .text('Data loading error!');
            }
        });
    }

    if(jQuery('.comp-news').length > 0) {
        httpModule.get('news/getList').then(function(value){
            if (value.status == 'OK') {
                jQuery('.comp-news .card')
                    .removeClass("loading");

                    companiesNewsModule.createNewsSlides(value.list);
                    companiesNewsModule.initSlider('.comp-news__slider');
                    
            } else {
                jQuery('.comp-news .card')
                    .removeClass("loading")
                    .addClass('error')
                    .find('.card__error-message')
                    .text('Data loading error!');
            }
        });
    }
});

