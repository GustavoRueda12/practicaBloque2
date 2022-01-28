'use strict';

function setCookie(nombre, valor, dias) {

    var expires = "";
    if (dias) {

        var date = new Date();
        date.setTime(date.getTime() + (dias * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();

    }

    document.cookie = nombre + "=" + (valor || "") + expires + "; path=/";

}

function getCookie(nombre) {

    var nameEQ = nombre + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);

    }

    return null;

}

function eraseCookie(nombre) {

    document.cookie = nombre + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

}