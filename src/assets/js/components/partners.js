'use strict';

import { log } from "util";

function showPartners(partnersList) {
    jQuery(".partners__list").empty();
    partnersList.forEach(function (item) {
        jQuery(".partners__list")
            .append(jQuery(
                `<li class="partners__item">
                    <span class="partners__item-title">` + item.name + `</span>
                    <span class="partners__item-value">` + item.value + `%</span>
                </li>`));
    });
}

function showSortedPartners(partnersList) {
    jQuery(".partners__list").empty();
    partnersList.sort(function(a, b){
        if(a.value > b.value) return -1;
        if(a.value < b.value) return 1;
        return 0;
    });
    partnersList.forEach(function (item) {
        jQuery(".partners__list")
            .append(jQuery(
                `<li class="partners__item">
                    <span class="partners__item-title">` + item.name + `</span>
                    <span class="partners__item-value">` + item.value + `%</span>
                </li>`));
    });
}

function setParnersControlsHandlers (partnersList) {
    jQuery('.partners__sort-name').on('click', function() {
        if (jQuery(this).hasClass('sort-up')) {
            partnersList.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                if(textA < textB) return -1;
                if(textA > textB) return 1;
                return 0;
            });
            jQuery(this)
                .removeClass('sort-up')
                .addClass('sort-down');
        } else if (jQuery(this).hasClass('sort-down')) {
            partnersList.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                if(textA > textB) return -1;
                if(textA < textB) return 1;
                return 0;
            });
            jQuery(this)
                .removeClass('sort-down')
                .addClass('sort-up');
        }

        showPartners(partnersList);
    });

    jQuery('.partners__sort-percents').on('click', function() {
        if (jQuery(this).hasClass('sort-up')) {
            partnersList.sort(function(a, b){
                if(a.value < b.value) return -1;
                if(a.value > b.value) return 1;
                return 0;
            });
            jQuery(this)
                .removeClass('sort-up')
                .addClass('sort-down');
        } else if (jQuery(this).hasClass('sort-down')) {
            partnersList.sort(function(a, b){
                if(a.value > b.value) return -1;
                if(a.value < b.value) return 1;
                return 0;
            });
            jQuery(this)
                .removeClass('sort-down')
                .addClass('sort-up');
        }
        
        showPartners(partnersList);
    });
    jQuery('.partners__close').on('click', function() {
        jQuery('.partners .card').addClass('card--collapsed');
        jQuery('.list-comp__item').removeClass('list-comp__item--selected');
    });
}

module.exports = {
    showSortedPartners: showSortedPartners,
    setParnersControlsHandlers: setParnersControlsHandlers
};