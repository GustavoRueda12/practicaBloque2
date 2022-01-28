"use strict";

//Clase Cliente
class Cliente {
    constructor(idCliente, nombre, telefono) {
        this._idCliente = idCliente;
        this._nombre = nombre;
        this._telefono = telefono;
    }

    get idCliente() {
        return this._idCliente;
    }

    get nombre() {
        return this._nombre;
    }

    get telefono() {
        return this._telefono;
    }

    set idCliente(idCliente) {
         this._idCliente = idCliente;
    }

    set nombre(nombre) {
         this._nombre = nombre;
    }

    set telefono(telefono) {
         this._telefono = telefono;
    }
}

// Clase Normal
class Normal extends Cliente {
    constructor(idCliente, nombre, telefono, dni) {
        super(idCliente, nombre, telefono);
        this.dni = dni;
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idCliente },`;
        sFila += `${this.nombre},`;
        sFila += `${this.telefono},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.dni}`;

        return sFila;
    }
}

// Clase Vip
class Vip extends Cliente {
    constructor(idCliente, nombre, telefono, correo) {
        super(idCliente, nombre, telefono);
        this.correo = correo;
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idCliente},`;
        sFila += `${this.nombre},`;
        sFila += `${this.telefono},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.correo }`;

        return sFila;
    }
}

//Clase Cerveza
class Cerveza {
    constructor(idCerveza, nombre, alcohol) {
        this._idCerveza = idCerveza;
        this._nombre = nombre;
        this._alcohol = alcohol;
    }

    get idCerveza() {
        return this._idCerveza;
    }

    get nombre() {
        return this._nombre;
    }

    get alcohol() {
        return this._alcohol;
    }
}

// Clase Rubia
class Rubia extends Cerveza {
    constructor(idCerveza, nombre, alcohol) {
        super(idCerveza, nombre, alcohol);
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idCerveza},`;
        sFila += `${this.nombre},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.alcohol}`;

        return sFila;
    }
}

// Clase Negra
class Negra extends Cerveza {
    constructor(idCerveza, nombre, alcohol) {
        super(idCerveza, nombre, alcohol);
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idCerveza},`;
        sFila += `${this.nombre},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.alcohol}`;

        return sFila;
    }
}

function Factura(idFactura, idCliente, numCervezasRubias,numCervezasNegras,precioN,precioR,total,fecha) {
    this.idFactura = idFactura;
    this.idCliente = idCliente;
    this.numCervezasRubias = numCervezasRubias;
    this.numCervezasNegras = numCervezasNegras;
    this.precioN = precioN;
    this.precioR = precioR;
    this.total = total;
    this.fecha = fecha;
    
}
Factura.prototype.toHTMLRow = function () {
    let sFila = "";
    sFila += `${this.idFactura},`;
    sFila += `${this.idCliente},`;
    sFila += `${this.numCervezasRubias },`;
    sFila += `${this.numCervezasNegras},`;
    sFila += `${this.precioN},`;
    sFila += `${this.precioR},`;
    sFila += `${this.total},`;
    sFila += `${this.fecha.getDate()}/${(this.fecha.getMonth()+1)}/${this.fecha.getFullYear()}`;

    return sFila;
}

function Cerveceria() {
    this.clientes = [];
    this.facturas = [];
    this.cervezas = [];
}

Cerveceria.prototype.altaCliente = function (oCliente) {
    if (this.verificaCliente(oCliente.idCliente) == true) {
        this.clientes.push(oCliente);
        return "Alta Cliente OK";
    } else {
        return "Cliente registrado previamente";
    }
}

Cerveceria.prototype.verificaCliente = function (idCliente) {
    for (const cliente of this.clientes) {
        if (cliente.idCliente == idCliente) {
            return false;
        }
    }

    return true;
}

Cerveceria.prototype.buscaCliente = function (oCliente) {
    let newClientes = [];
    for (const cliente of this.clientes) {
        if (cliente.idCliente != oCliente.idCliente) {
            newClientes.push(cliente);
            
        }
    }
    newClientes.push(oCliente);
    this.clientes = newClientes;
    return false;
}

Cerveceria.prototype.modificaCliente = function(oCliente) {
    if(this.buscaCliente(oCliente) == false){
        return "Modificacion Cliente OK";
    }else{
        return "Modificacion Cliente Fallida";
    }
}

Cerveceria.prototype.altaFactura = function (oFactura) {

    if (this.compruebaCliente(oFactura.idCliente) == false) {
        return "Cliente no registrado previamente";
    }
    else{
    if (this.verificaFactura(oFactura.idFactura) == true) {
        this.facturas.push(oFactura);
        return "Alta factura OK";
    } else {
        return "Factura registrada previamente";
    }
}
}

Cerveceria.prototype.verificaFactura = function (idFactura) {
    for (const factura of this.facturas) {
        if (factura.idFactura == idFactura) {
            return false;
        }
    }

    return true;
}

Cerveceria.prototype.compruebaCliente = function (idCliente) {
    for (const cliente of this.clientes) {
        if (cliente.idCliente == idCliente) {
            return true;
        }
    }

    return false;
}

Cerveceria.prototype.altaCerveza = function (oCerveza) {
    if (this.verificaCerveza(oCerveza.idCerveza) == true) {
        this.cervezas.push(oCerveza);
        return "Alta Cerveza OK";
    } else {
        return "Cerveza registrada previamente";
    }
}

Cerveceria.prototype.verificaCerveza= function (idCerveza) {
    for (const cerveza of this.cervezas) {
        if (cerveza.idCerveza == idCerveza) {
            return false;
        }
    }

    return true;
}

Cerveceria.prototype.cogerCliente = function(idCliente){

    for (const cliente of this.clientes) {
        if(cliente.idCliente == idCliente){
            return cliente;
        }
    }
}

Cerveceria.prototype.listadoCervezas = function (){
    let array = [];
    for (const cerveza of this.cervezas) {
        array.push(cerveza.toHTMLRow());
    }
    setCookie('cerveza', JSON.stringify(array), 100);
}

Cerveceria.prototype.listadoClientes = function (){
    let array = [];
    for (const cliente of this.clientes) {
        array.push(cliente.toHTMLRow());
    }
    setCookie('cliente', JSON.stringify(array), 100);
}

Cerveceria.prototype.listadoFacturas = function (fechaInicio, fechaFin){
    let array = [];
    for (const factura of this.facturas) {
        if(factura.fecha > fechaInicio && factura.fecha < fechaFin){
        array.push(factura.toHTMLRow());
        
    }
}
setCookie('factura', JSON.stringify(array), 100);
}