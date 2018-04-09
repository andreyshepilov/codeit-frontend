'use strict';

import { log } from "util";

var Promise = require("bluebird");

module.exports = {

    baseUrl: 'http://codeit.pro/codeitCandidates/serverFrontendTest/',

    get: function(path) {
        return new Promise((resolve, reject) => {
            jQuery.ajax({
                async: false,
                type: 'GET',
                url: this.baseUrl + path,
                success: function(data) {
                    resolve(data);
                }
           });
        });
    },

    post: function(path, data) {
        return new Promise((resolve, reject) => {
            jQuery.ajax({
                url: this.baseUrl + path,
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(data) {
                    resolve(data);
                }
            });
        });
    }
}
