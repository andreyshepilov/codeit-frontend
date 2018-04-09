'use strict';

var http = require("./http");

let signUpFormFields = [
    {
        domName: 'name',
        messageName: 'Name',
        criterias: ['isExists', 'fromTo', 'onlyLetters'],
        requirements: {from: '3', to: '60'}
    },
    {
        domName: 'secondname',
        messageName: 'Secondname',
        criterias: ['isExists', 'fromTo', 'onlyLetters'],
        requirements: {from: '3', to: '60'}
    },
    {
        domName: 'email',
        messageName: 'Email',
        criterias: ['emailFormat'],
    },
    {
        domName: 'gender',
        messageName: 'Gender',
        criterias: ['isExists'],
        requirements: {}
    },
    {
        domName: 'pass',
        messageName: 'Password',
        criterias: ['isExists', 'fromTo'],
        requirements: {from: '5', to: '20'}
    },
    {
        domName: 'agreement',
        messageName: 'Conditions of Agreement',
        criterias: ['isExists'],
        requirements: {}
    }
]

let validationCriterias = {
    isExists: function(dataObject, fieldName) {
        let result = {};

        if (dataObject.hasOwnProperty(fieldName)) {
            result.status = true;
            result.message = '';
            return result;
        } else {
            result.status = false;
            result.message = 'Field ' + fieldName + ' is mandatiry';
            return result;
        }
    },

    fromTo: function(dataObject, fieldName, requirements) {
        let result = {};
        if (dataObject[fieldName]) {
            if ((dataObject[fieldName].length >= requirements.from) && (dataObject[fieldName].length <= requirements.to)) {
                result.status = true;
                result.message = '';
                return result;
            } else {
                result.status = false;
                result.message = 'Field ' + fieldName + ' should contain from ' + requirements.from + ' to ' + requirements.to + ' letters';
                return result;
            }
        } else {
            result.status = false;
            result.message = 'Field ' + fieldName + ' should contain from ' + requirements.from + ' to ' + requirements.to + ' letters';
            return result;
        }
    },

    onlyLetters: function(dataObject, fieldName) {
        let result = {};

        if (dataObject[fieldName]) {
            if (/^[a-zA-Z]+$/.test(dataObject[fieldName])) {
                result.status = true;
                result.message = '';
                return result;
            } else {
                result.status = false;
                result.message = 'Field ' + fieldName + ' should contain only letters';
                return result;
            }
        } else {
            result.status = false;
            result.message = 'Field ' + fieldName + ' should contain only letters';
            return result;
        }
    },

    emailFormat: function(dataObject, fieldName) {
        let result = {};
        
        if (dataObject[fieldName]) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test( String(dataObject[fieldName]).toLowerCase() )) {
                result.status = true;
                result.message = '';
                return result;
            } else {
                result.status = false;
                result.message = 'Email is not valid';
                return result;
            }
        } else {
            result.status = false;
            result.message = 'Email is not valid';
            return result;
        }
    }
}

function setFieldError(fieldName, errorText) {
    let formField = jQuery('.sign-up form [name=' + fieldName + ']');
                
    formField
        .closest('.custom-form__row')
        .addClass('custom-form__row--error')
        .append(jQuery('<div></div>', { class: 'custom-form__error', text: errorText }));
}

function validateForm(formSelector) {
    let formIsValid = true;

    let formDataObject = jQuery(formSelector).serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    signUpFormFields.forEach(function (fieldItem, i) {

        fieldItem.criterias.forEach(function (criteriaItem, i) {
            let result = validationCriterias[criteriaItem](formDataObject, fieldItem.domName, fieldItem.requirements);
            if (!result.status) {
                formIsValid = false;
                setFieldError(fieldItem.domName, result.message);
            }
        });

    });

    return formIsValid;
}

function clearFormErrors() {
    jQuery('.sign-up form .custom-form__row').removeClass('custom-form__row--error');
    jQuery('.sign-up form .custom-form__error').remove();
}

function manageResponse(response) {
    if (response.status == 'OK') {
        return true;
    } else if (response.status == 'Form Error' || response.status == 'Error') {
        if (response.field) {
            setFieldError(response.field, response.message);
            return false;
        } else {
            setFieldError('submit', response.message);
            return false;
        }
    } else {
        setFieldError('submit', 'Something goes wrong. Call to administrator');
        return false;
    }
}

function signUpSubmit() {
    clearFormErrors();

    if (validateForm('.sign-up .custom-form')) {
        let signInformData = jQuery('.sign-up .custom-form').serialize();

        http.post('user/registration', signInformData).then(function(res){
            let signUpStatus = manageResponse(res);

            if(signUpStatus) {
                window.location.replace("./companies.html");
            }
        });
    }
}

module.exports = {
    signUpSubmit: signUpSubmit
};