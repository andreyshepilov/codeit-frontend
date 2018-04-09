'use strict';

function showCompaniesTotal(companiesTotal) {
    let steps = 100;
    let increment = Math.ceil(companiesTotal / steps);
    let number = 0;
    var interval = setInterval(function() {
        jQuery('.comp-total__value').text(number);
        if (number >= companiesTotal) clearInterval(interval);
        number += increment;
    }, 10);
    jQuery('.comp-total__value').text(companiesTotal);
}

module.exports = {
    showCompaniesTotal: showCompaniesTotal
};