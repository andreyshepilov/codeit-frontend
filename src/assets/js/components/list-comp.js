'use strict';

var partnersModule = require("./partners");

function showCompaniesList(responseData) {
    jQuery(".list-comp__list").empty();
    responseData.forEach(function (item) {
        jQuery(".list-comp__list")
            .append(
                jQuery('<li></li>')
                    .append(jQuery('<button></button>')
                            .addClass('list-comp__item')
                            .html(item.name)
                            .on('click', function() {
                                if(jQuery(this).hasClass('list-comp__item--selected')) {
                                    jQuery('.partners .card')
                                        .addClass('card--collapsed');
                                    jQuery(this).removeClass('list-comp__item--selected');
                                } else {
                                    jQuery('.list-comp__item').removeClass('list-comp__item--selected');
                                    jQuery(this).addClass('list-comp__item--selected');
                                    jQuery('.partners .card')
                                        .removeClass('card--collapsed');
                                    partnersModule.showSortedPartners(item.partners);
                                    partnersModule.setParnersControlsHandlers(item.partners);
                                }
                            }))
            );
    });
}

module.exports = {
    showCompaniesList: showCompaniesList
};