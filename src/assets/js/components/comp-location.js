'use strict';

var libModule = require("./lib");

function processLocations(rawData) {
    let companiesTotal = rawData.length;
    let allLocations = [];
    rawData.forEach(function (item) {
        allLocations.push(item.location);
    });

    let allCodes = [];
    allLocations.forEach(function (item) {
        allCodes.push(item.code);
    });
        
    let uniqueCodes = allCodes.filter(function(item, pos) {
        return allCodes.indexOf(item) == pos;
    });

    let processedLocations = {};
    uniqueCodes.forEach(function (currentCode) {
        let countryCode = currentCode;
        processedLocations[countryCode] = {}
        processedLocations[countryCode].code = countryCode;
        processedLocations[countryCode].name = allLocations.find(function(element) {
            return element.code == processedLocations[countryCode].code;
        }).name;
        
        let count = 0;
        for (var i = 0; i < allCodes.length; i++) {
            if (allCodes[i] === countryCode) {
                count++;
            }
        }
        
        processedLocations[countryCode].percent = companiesTotal / 100 * count;
        processedLocations[countryCode].companies = [];
        rawData.forEach(function (item) {
            if(item.location.code == countryCode) {
                processedLocations[countryCode].companies.push(item.name);
            }
        });
    });

    return processedLocations;
}

function createLegend(sliceClass, color, countryName, percents) {
    jQuery(".comp-location__legend-holder")
        .append(jQuery('<li></li>', { class: 'comp-location__legend-item ' + sliceClass }));
        
    let item = jQuery('.' + sliceClass);
    item.append(jQuery('<div></div>', { class: 'comp-location__legend-color' }));
    item.append(
        jQuery(
            `<div class="comp-location__legend-description">
                <span class="comp-location__legend-name">
                    ` + countryName + `
                </span>
                <span class="comp-location__legend-value">
                    : ` + percents * 100 + `%
                </span>
            </div>`
        )
    );
    
    item.find( ".comp-location__legend-color" ).css("background-color", color);
}

function createLocationsList(countryCode, processedLocations) {
    jQuery(".comp-location__list").empty();
    if (processedLocations.hasOwnProperty(countryCode) && processedLocations[countryCode].companies) {
        processedLocations[countryCode].companies.forEach(function (item) {
            jQuery(".comp-location__list")
                .append(jQuery('<div></div>', { class: 'comp-location__item', text: item }))
        });
    }
}

function setChartHandlers(processedLocations) {
    let legendItems = jQuery("[class*='slice-']");
    let sliceItems = jQuery("[id*='slice-']");
    let slicesColors = {};

    sliceItems.each(function( index ) {
        let sliceId = jQuery(this).attr('id');
        slicesColors[sliceId] = jQuery(this).attr('fill');
    });
    
    legendItems.each(function() {
        let sliceClass = jQuery(this).attr('class');
        let sliceCode = jQuery(this).attr('class').slice(sliceClass.lastIndexOf("slice-") + 6);
        
        jQuery(this).on('mouseenter', function() {
            jQuery('#slice-' + sliceCode)
            .css("fill", '#66a5ad');
        });
        
        jQuery(this).on('mouseleave', function() {
            jQuery('#slice-' + sliceCode)
                .css("fill", slicesColors['slice-' + sliceCode]);
        });

        jQuery(this).on('click', function() {
            createLocationsList(sliceCode.toUpperCase(), processedLocations);
            jQuery('.comp-location__chart-holder')
                .css("left", 'calc(100% + 50px)');
            jQuery('.comp-location__list')
                .css("left", '0');
            jQuery('.comp-location .card__control .button-back')
                .css("opacity", '1')
                .css("pointer-events", 'all');
        });
    });

    sliceItems.each(function() {
        let sliceId = jQuery(this).attr('id');
        let sliceCode = jQuery(this).attr('id').slice(sliceId.lastIndexOf("slice-") + 6);

        jQuery(this).on('mouseenter', function() {
            jQuery(this)
                .css("fill", '#66a5ad');
            jQuery('.slice-' + sliceCode)
                .addClass('comp-location__legend-item--active')
                .css("color", '#000');
        });

        jQuery(this).on('mouseleave', function() {
            jQuery('#slice-' + sliceCode)
                .css("fill", slicesColors['slice-' + sliceCode]);
            jQuery('.slice-' + sliceCode)
                .removeClass('comp-location__legend-item--active')
                .css("color", 'inherit');
        });

        jQuery(this).on('click', function() {
            createLocationsList(sliceCode.toUpperCase(), processedLocations);
            jQuery('.comp-location__chart-holder')
                .css("left", 'calc(100% + 50px)');
            jQuery('.comp-location__list')
                .css("left", '0');
            jQuery('.comp-location .card__control .button-back')
                .css("opacity", '1')
                .css("pointer-events", 'all');
        });
    });

    jQuery('.comp-location .card__control .button-back').on('click', function() {
        jQuery('.comp-location__chart-holder')
            .css("left", '0');
        jQuery('.comp-location__list')
            .css("left", 'calc(100% + 50px)');
        jQuery(this)
            .css("opacity", '0')
            .css("pointer-events", 'none');
    });
}

function createChartModel(processedLocations) {
    let slices = [];

    for (let key in processedLocations) {
        if (!processedLocations.hasOwnProperty(key)) continue;
    
        let countryObj = processedLocations[key];
        slices.push({
            country: countryObj.name,
            code: countryObj.code, 
            percent: countryObj.percent / 100, 
            color: libModule.getRandomColor()
        });
    }

    return slices;
}

function drawChart(selector, slices) {
    const svgEl = document.querySelector(selector);

    let cumulativePercent = 0;
    let cumulativeRotateValue = 0;

    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }

    slices.forEach(function (slice, i) {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        
        cumulativePercent += slice.percent;
        
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

        const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
        ].join(' ');

        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        
        pathEl.setAttribute('d', pathData);
        pathEl.setAttribute('fill', slice.color);
        pathEl.setAttribute('id', 'slice-' + slice.code.toLowerCase());
        textEl.setAttribute('x', 0.3);
        textEl.setAttribute('y', 0.03);
        textEl.setAttribute('font-family', "Verdana");
        textEl.setAttribute('font-size', "0.10");
        textEl.innerHTML += slice.code + ' ' + slice.percent * 100 + '%';

        svgEl.appendChild(group);

        group.appendChild(pathEl);
        group.appendChild(textEl);

        let textRotateValue = 180 * slice.percent + cumulativeRotateValue;
        textEl.style.transform = 'rotate('+ textRotateValue + 'deg) translateX(0.3px)';
        cumulativeRotateValue += 360 * slice.percent;

        createLegend('slice-' + slice.code.toLowerCase(), slice.color, slice.country, slice.percent);
    });
}

module.exports = {
    processLocations: processLocations,
    createChartModel: createChartModel,
    drawChart: drawChart,
    createLocationsList: createLocationsList,
    setChartHandlers: setChartHandlers
};