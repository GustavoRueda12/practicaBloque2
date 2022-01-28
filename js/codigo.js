"use strict";

var oCerveceria = new Cerveceria();

document.querySelector("#mnuAltaCliente").addEventListener("click", gestionFormularios);
document.querySelector("#mnuModificaCliente").addEventListener("click", gestionFormularios);
document.querySelector("#mnuAltaFactura").addEventListener("click", gestionFormularios);
document.querySelector("#listadoFacturas").addEventListener("click", gestionFormularios);
document.querySelector("#mnuAltaCerveza").addEventListener("click", gestionFormularios);
document.querySelector("#tiposDeCerveza-R").addEventListener("click", gestionFormularioFactura);
document.querySelector("#tiposDeCerveza-N").addEventListener("click", gestionFormularioFactura);
document.querySelector("#rbtTipoCliente-V").addEventListener("click", gestionFormularioAltaClienteVip);
document.querySelector("#rbtTipoCliente-N").addEventListener("click", gestionFormularioAltaClienteNormal);
document.querySelector("#rbtMofificarTipoCliente-V").addEventListener("click", gestionFormularioModificarClienteVip);
document.querySelector("#rbtMofificarTipoCliente-N").addEventListener("click", gestionFormularioModificarClienteNormal);
document.querySelector("#mostrarModificarDNI").style.display = "none";
document.querySelector("#mostrarModificarCorreo").style.display = "block";
document.querySelector("#mostrarInputID").style.display = "none";
document.querySelector("#mostrarInputCorreo").style.display = "block";
document.querySelector("#numeroCervezasRubias").style.display = "none";
document.querySelector("#numeroCervezasNegras").style.display = "none";
document.querySelector("#btnAceptarAltaCliente").addEventListener("click", cliente, false);
document.querySelector("#btnAceptarFactura").addEventListener("click", factura, false);
document.querySelector("#btnAceptarAltaCerveza").addEventListener("click", cerveza, false);
document.querySelector("#btnAceptarModificaCliente").addEventListener("click",gestionClientesModificar);
document.querySelector("#mnuListadoCervezas").addEventListener("click", obtenerListadoCervezas, false);
document.querySelector("#mnuListadoClientes").addEventListener("click", obtenerListadoClientes, false);
document.querySelector("#btnAceptarListadoFacturas").addEventListener("click",recogerFecha,false);
var xml = loadXMLDoc("almacen.xml");
var xhttp;


// Gestion de formulario
function gestionFormularios(oEvento) {
    let oE = oEvento || window.event;
  
    if (oE.target.id == "mnuAltaCliente") {
        frmAltaCliente.style.display = "block";
        frmModificaCliente.style.display = "none";
        frmFacturaCliente.style.display = "none";
        frmAltaCerveza.style.display = "none";
        frmListadoFacturas.style.display = "none";
        
    }
    if (oE.target.id == "mnuModificaCliente") {
        frmModificaCliente.style.display = "block";
        frmListadoFacturas.style.display = "none";
        frmAltaCliente.style.display = "none";
        frmAltaCerveza.style.display = "none";
        frmFacturaCliente.style.display = "none";

  }
    if (oE.target.id == "mnuAltaFactura") {
        frmFacturaCliente.style.display = "block";
        frmModificaCliente.style.display = "none";
        frmAltaCliente.style.display = "none";
        frmAltaCerveza.style.display = "none";
        frmListadoFacturas.style.display = "none";
    }
    if (oE.target.id == "listadoFacturas") {
        frmListadoFacturas.style.display = "block";
        frmModificaCliente.style.display = "none";
        frmAltaCliente.style.display = "none";
        frmAltaCerveza.style.display = "none";
        frmFacturaCliente.style.display = "none";
    }
    if (oE.target.id == "mnuAltaCerveza") {
      frmFacturaCliente.style.display = "none";
      frmModificaCliente.style.display = "none";
      frmAltaCliente.style.display = "none";
      frmAltaCerveza.style.display = "block";
      frmListadoFacturas.style.display = "none";
  }
    /*
    if (oE.target.id == "ListadoClientesEnAlbergue") {
      obtenerListadoClientes();
    }
    if (oE.target.id == "listadoColaboradores") {
      obtenerListadoColaboradores();
    }
    */
  
  }

  // aceptarAltaCliente
function aceptarAltaCliente() {
    let idCliente = parseInt(frmAltaCliente.txtIdCliente.value.trim());
    let nombre = frmAltaCliente.txtNombreCliente.value.trim();
    let telefono = parseInt(frmAltaCliente.txtNumeroDeTelefono.value.trim());
    let dni = frmAltaCliente.txtDni.value.trim();
    let correo = frmAltaCliente.txtCorreo.value.trim();
    let oCliente;
    let mensaje;
    
    if (document.querySelector("#rbtTipoCliente-N").checked) {
        oCliente = new Normal(idCliente, nombre, telefono, dni);
        mensaje = oCerveceria.altaCliente(oCliente);
        if (mensaje == "Alta Cliente OK")
          document.getElementById("frmAltaCliente").reset();
        frmAltaCliente.style.display = "none";
        alert(mensaje);
    } else {
        oCliente = new Vip(idCliente, nombre, telefono, correo);
        mensaje = oCerveceria.altaCliente(oCliente);
        if (mensaje == "Alta Cliente OK")
          document.getElementById("frmAltaCliente").reset();
        frmAltaCliente.style.display = "none";
        alert(mensaje);
    }
    añadeCliente(idCliente);
  }

  // aceptarAltaFactura
function aceptarAltaFactura() {
    let idFactura = parseInt(frmFacturaCliente.txtIdFactura.value.trim());
    let idCliente = parseInt(frmFacturaCliente.txtIdFacturaCliente.value.trim());
    let numCervezasRubias = parseInt(frmFacturaCliente.txtNumCervezasRubias.value.trim())||0;
    let numCervezasNegras = parseInt(frmFacturaCliente.txtNumCervezasNegras.value.trim())||0;
    let precioR = 2.40;
    let precioN = 2.70;
    let total = numCervezasNegras*precioN + numCervezasRubias*precioR;  
    let fecha = new Date();
    fecha.setHours(0, 0, 0);
    let mensaje;
    let oFactura;
  
    if (document.querySelector("#tiposDeCerveza-N").checked && document.querySelector("#tiposDeCerveza-R").checked){
      oFactura = new Factura(idFactura, idCliente, numCervezasRubias, numCervezasNegras, precioN, precioR, total, fecha);
      mensaje = oCerveceria.altaFactura(oFactura);
      if (mensaje == "Alta Factura OK")
        document.getElementById("frmFacturaCliente").reset();
        frmFacturaCliente.style.display = "none";
      alert(mensaje);
    }
    else{
    if (document.querySelector("#tiposDeCerveza-R").checked) {
        oFactura = new Factura(idFactura, idCliente, numCervezasRubias, 0 ,precioR, precioR, total, fecha);
        mensaje = oCerveceria.altaFactura(oFactura);
        if (mensaje == "Alta Factura OK")
          document.getElementById("frmFacturaCliente").reset();
          frmFacturaCliente.style.display = "none";
        alert(mensaje);
    } 
    else{
        oFactura = new Factura(idFactura, idCliente, 0 ,numCervezasNegras,precioR, precioN, total, fecha);
        mensaje = oCerveceria.altaFactura(oFactura);
        if (mensaje == "Alta Factura OK")
          document.getElementById("frmFacturaCliente").reset();
          frmFacturaCliente.style.display = "none";
        alert(mensaje);
      }
    }
}

//añadir Un cliente al select de modificaCliente
function añadeCliente(idCliente){
  let option = document.createElement("option");
  let lstC = document.getElementById("lstClientes");

  lstC.appendChild(option);
  option.setAttribute("id",idCliente);

  let text = "Cliente nº ";
  text+=idCliente;
  option.textContent = text;
}

//modificar cliente
var id;
function gestionClientesModificar(){
  let oCliente;
  let mensaje;
  let select = document.querySelector("#lstClientes");
  let idCliente = select.selectedOptions[0].id;
 

  let nuevoNombre = frmModificaCliente.txtModificarNombreCliente.value.trim();
  let nuevotelefono = parseInt(frmModificaCliente.txtModificarNumeroDeTelefono.value.trim());
  let nuevodni = frmModificaCliente.txtModificaDni.value.trim();
  let nuevocorreo = frmModificaCliente.txtModificarCorreo.value.trim();

  if (document.querySelector("#rbtMofificarTipoCliente-V").checked) {
    oCliente = new Vip(idCliente, nuevoNombre, nuevotelefono, nuevocorreo);
    mensaje = oCerveceria.modificaCliente(oCliente);
    if (mensaje == "Modificacion Cliente OK")
      document.getElementById("frmModificaCliente").reset();
    frmModificaCliente.style.display = "none";
    alert(mensaje);
} else {
    oCliente = new Normal(idCliente, nuevoNombre, nuevotelefono, nuevodni);
    mensaje = oCerveceria.modificaCliente(oCliente);
    if (mensaje == "Modificacion Cliente OK")
      document.getElementById("frmModificaCliente").reset();
    frmModificaCliente.style.display = "none";
    alert(mensaje);
}

}

function gestionFormularioAltaClienteVip(){
  if(document.querySelector("#rbtTipoCliente-V:checked")){
    document.querySelector("#mostrarInputCorreo").style.display = "block";
    document.querySelector("#mostrarInputID").style.display = "none";
  }

}
function gestionFormularioAltaClienteNormal(){
  if(document.querySelector("#rbtTipoCliente-N:checked")){
    document.querySelector("#mostrarInputID").style.display = "block";
    document.querySelector("#mostrarInputCorreo").style.display = "none";
  }

}
function gestionFormularioModificarClienteVip(){
  if(document.querySelector("#rbtMofificarTipoCliente-V:checked")){
    document.querySelector("#mostrarModificarCorreo").style.display = "block";
    document.querySelector("#mostrarModificarDNI").style.display = "none";
  }

}
function gestionFormularioModificarClienteNormal(){
  if(document.querySelector("#rbtMofificarTipoCliente-N:checked")){
    document.querySelector("#mostrarModificarDNI").style.display = "block";
    document.querySelector("#mostrarModificarCorreo").style.display = "none";
  }

}

  function gestionFormularioFactura(){
    if(document.querySelector("#tiposDeCerveza-R:checked")){
      document.querySelector("#numeroCervezasRubias").style.display = "block";
    }
    else{
      document.querySelector("#numeroCervezasRubias").style.display = "none";
    }
    if(document.querySelector("#tiposDeCerveza-N:checked")){
      document.querySelector("#numeroCervezasNegras").style.display = "block";
    }
    else{
      document.querySelector("#numeroCervezasNegras").style.display = "none";
    }

  }

   // aceptarAltaCerveza
function aceptarAltaCerveza() {
  let idCerveza = parseInt(frmAltaCerveza.txtIdCerveza.value.trim());
  let nombre = frmAltaCerveza.txtNombreCerveza.value.trim();
  let alcohol = parseFloat(frmAltaCerveza.txtGradosDeAlcohol.value.trim());
  let oCerveza;
  let mensaje;
  if (document.querySelector("#rbtTipoCerveza-R").checked) {
      oCerveza = new Rubia(idCerveza, nombre, alcohol);
      mensaje = oCerveceria.altaCerveza(oCerveza);
      if (mensaje == "Alta Cerveza OK")
        document.getElementById("frmAltaCerveza").reset();
      frmAltaCerveza.style.display = "none";
      alert(mensaje);
    }
  else {
      oCerveza = new Negra(idCerveza, nombre, alcohol);
      mensaje = oCerveceria.altaCerveza(oCerveza);
      if (mensaje == "Alta Cerveza OK")
        document.getElementById("frmAltaCerveza").reset();
      frmAltaCerveza.style.display = "none";
      alert(mensaje);
    }
}

 // Validación alta clientes y modifica clientes
function validarAltaCliente(){
  let sErrores = ""; // Cadena de texto con los errores
  let bValido = true; // en principio el formulario es válido
  let oE = window.event;

// Validación IdCliente   
let sIdCliente = frmAltaCliente.txtIdCliente.value.trim();
let oExpRegIdCliente = /^[0-9]{1,}$/;


if(!oExpRegIdCliente.test(sIdCliente)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCliente.txtIdCliente.focus();
      bValido = false;
  
  sErrores += "\nEl ID del cliente no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmAltaCliente.txtIdCliente.classList.add("error");
} 
else {
  frmAltaCliente.txtIdCliente.classList.remove("error");
}

// Validación Nombre Cliente 
let sNombreCliente = frmAltaCliente.txtNombreCliente.value.trim();
let oExpRegNombreCliente = /^(?=.{6,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;


if(!oExpRegNombreCliente.test(sNombreCliente)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCliente.txtNombreCliente.focus();
      bValido = false;
  
  sErrores += "\nEl nombre no tiene el formato correcto (de 6 a 10 letras y numeros sin espacios)";
  frmAltaCliente.txtNombreCliente.classList.add("error");
} 
else {
  frmAltaCliente.txtNombreCliente.classList.remove("error");
}

// Validación Número de teléfono 
let sTelefono = frmAltaCliente.txtNumeroDeTelefono.value.trim();
let oExpRegTelefono = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;


if(!oExpRegTelefono.test(sTelefono)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCliente.txtNumeroDeTelefono.focus();
      bValido = false;
  
  sErrores += "\nEl teléfono no tiene el formato correcto (debe ser un número de teléfono español)";
  frmAltaCliente.txtNumeroDeTelefono.classList.add("error");
} 
else {
  frmAltaCliente.txtNumeroDeTelefono.classList.remove("error");
}

if (document.querySelector("#rbtTipoCliente-N").checked) {

// Validación DNI 
let sDni = frmAltaCliente.txtDni.value.trim();
let oExpRegDni = /^\d{8}[a-zA-Z]$/;


if(!oExpRegDni.test(sDni)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCliente.txtDni.focus();
      bValido = false;
  
  sErrores += "\nEl DNI no tiene el formato correcto (debe tener 8 números seguido de una letra)";
  frmAltaCliente.txtDni.classList.add("error");
} 
else {
  frmAltaCliente.txtDni.classList.remove("error");
}
}

else{
// Validación email 
let sEmail = frmAltaCliente.txtCorreo.value.trim();
let oExpRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


if(!oExpRegEmail.test(sEmail)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCliente.txtCorreo.focus();
      bValido = false;
  
  sErrores += "\nEl correo electrónico no tiene el formato correcto";
  frmAltaCliente.txtCorreo.classList.add("error");
} 
else {
  frmAltaCliente.txtCorreo.classList.remove("error");
}
}

if(!bValido){ // si ---NO--- está todo OK
  oE.preventDefault();
  alert(sErrores);
  return false;
 }
 else{
   return true;
 }

}

function cliente(){
  if(validarAltaCliente() == true){
     aceptarAltaCliente();
  }
}

 // Validación alta factura
 function validarAltaFactura(){
  let sErrores = ""; // Cadena de texto con los errores
  let bValido = true; // en principio el formulario es válido
  let oE = window.event;

// Validación IdFactura   
let sIdFactura = frmFacturaCliente.txtIdFactura.value.trim();
let oExpRegIdFactura = /^[0-9]{1,}$/;


if(!oExpRegIdFactura.test(sIdFactura)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmFacturaCliente.txtIdFactura.focus();
      bValido = false;
  
  sErrores += "\nEl ID de la factura no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmFacturaCliente.txtIdFactura.classList.add("error");
} 
else {
  frmFacturaCliente.txtIdFactura.classList.remove("error");
}

// Validación IdCliente   
let sIdCliente = frmFacturaCliente.txtIdFacturaCliente.value.trim();
let oExpRegIdCliente = /^[0-9]{1,}$/;


if(!oExpRegIdCliente.test(sIdCliente)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmFacturaCliente.txtIdFacturaCliente.focus();
      bValido = false;
  
  sErrores += "\nEl ID del cliente no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmFacturaCliente.txtIdFacturaCliente.classList.add("error");
} 
else {
  frmFacturaCliente.txtIdFacturaCliente.classList.remove("error");
}

// Validar que algún checkbox está seleccionado 
if(!document.querySelector("#tiposDeCerveza-R").checked && !document.querySelector("#tiposDeCerveza-N").checked){

      //frmFacturaCliente.tiposDeCerveza.focus();
      bValido = false;

    sErrores += "\nDebe seleccionar al menos un tipo de cerveza";

}
if (document.querySelector("#tiposDeCerveza-N").checked) {

  // Validación Numero de cervezas negras 
  let sNumeroCervezasNegras = frmFacturaCliente.txtNumCervezasNegras.value.trim();
  let oExpRegNumeroCervezasNegras = /^[0-9]{1,}$/;
  
  
  if(!oExpRegNumeroCervezasNegras.test(sNumeroCervezasNegras)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmFacturaCliente.txtNumCervezasNegras.focus();
        bValido = false;
    
    sErrores += "\nEl número de cervezas negras no tiene el formato correcto (sólo números y mínimo un caracter)";
    frmFacturaCliente.txtNumCervezasNegras.classList.add("error");
  } 
  else {
    frmFacturaCliente.txtNumCervezasNegras.classList.remove("error");
  }
} 
  
  if(document.querySelector("#tiposDeCerveza-R").checked){
  // Validación numeroCervezasRubias 
  let sNumeroCervezasRubias = frmFacturaCliente.txtNumCervezasRubias.value.trim();
  let oExpRegNumeroCervezasRubias = /^[0-9]{1,}$/;
  
  
  if(!oExpRegNumeroCervezasRubias.test(sNumeroCervezasRubias)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmFacturaCliente.txtNumCervezasRubias.focus();
        bValido = false;
    
    sErrores += "\nEl número de cervezas rubias no tiene el formato correcto (sólo números y mínimo un caracter)";
    frmFacturaCliente.txtNumCervezasRubias.classList.add("error");
  } 
  else {
    frmFacturaCliente.txtNumCervezasRubias.classList.remove("error");
  }
}

if(!bValido){ // si ---NO--- está todo OK
  oE.preventDefault();
  alert(sErrores);
  return false;
 }
 else{
   return true;
 }

}
function factura(){
  if(validarAltaFactura() == true){
     aceptarAltaFactura();
  }
}

 // Validación alta cerveza
 function validarAltaCerveza(){
  let sErrores = ""; // Cadena de texto con los errores
  let bValido = true; // en principio el formulario es válido
  let oE = window.event;

// Validación IdCerveza   
let sIdCerveza = frmAltaCerveza.txtIdCerveza.value.trim();
let oExpRegIdCerveza = /^[0-9]{1,}$/;


if(!oExpRegIdCerveza.test(sIdCerveza)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCerveza.txtIdCerveza.focus();
      bValido = false;
  
  sErrores += "\nEl ID de la cerveza no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmAltaCerveza.txtIdCerveza.classList.add("error");
} 
else {
  frmAltaCerveza.txtIdCerveza.classList.remove("error");
}

// Validación Nombre Cerveza 
let sNombreCerveza = frmAltaCerveza.txtNombreCerveza.value.trim();
let oExpRegNombreCerveza = /^[A-Za-z0-9\s]+$/g;


if(!oExpRegNombreCerveza.test(sNombreCerveza)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCerveza.txtNombreCerveza.focus();
      bValido = false;
  
  sErrores += "\nEl nombre no tiene el formato correcto";
  frmAltaCerveza.txtNombreCerveza.classList.add("error");
} 
else {
  frmAltaCerveza.txtNombreCerveza.classList.remove("error");
}

// Validación grados de alcohol   
let sGradosDeAlcohol = frmAltaCerveza.txtGradosDeAlcohol.value.trim();
let oExpRegGradosDeAlcohol = /^[0-9]+([.][0-9]+)?$/;


if(!oExpRegGradosDeAlcohol.test(sGradosDeAlcohol)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaCerveza.txtGradosDeAlcohol.focus();
      bValido = false;
  
  sErrores += "\nLos grados del alcohol no tienen el formato correcto (sólo números o números decimales con '.' y como mínimo debe de tener un caracter)";
  frmAltaCerveza.txtGradosDeAlcohol.classList.add("error");
} 
else {
  frmAltaCerveza.txtGradosDeAlcohol.classList.remove("error");
}

if(!bValido){ // si ---NO--- está todo OK
  oE.preventDefault();
  alert(sErrores);
  return false;
 }
 else{
   return true;
 }

}

function cerveza(){
  if(validarAltaCerveza() == true){
     aceptarAltaCerveza();
  }
}

function obtenerListadoCervezas() {
  let url = encodeURI("listadoCervezas.html");
  oCerveceria.listadoCervezas();
  let ventana = open(url,"_blank");
}

function obtenerListadoClientes() {
  let url = encodeURI("listadoClientes.html");
  oCerveceria.listadoClientes();
  let ventana = open(url,"_blank");
}

function recogerFecha(){
  let fechaInicio = new Date(document.getElementById("txtFechaInicio").value);
  let fechaFin = new Date (document.getElementById("txtFechaFin").value);
  obtenerListadoFacturas(fechaInicio, fechaFin);
}

function obtenerListadoFacturas(fechaInicio, fechaFin) {
  let url = encodeURI("listadoFacturas.html");
  oCerveceria.listadoFacturas(fechaInicio, fechaFin);
  let ventana = open(url,"_blank");
}


function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	  {
	  xhttp=new XMLHttpRequest();
	  }
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",filename,false);
	
	xhttp.send();
	
	return xhttp.responseXML;
}

function datosIniciales(){
  let cervezas = xml.getElementsByTagName("cerveza");
  let contador = 0;
  
  for (const cerveza of cervezas) {
    let id = cerveza.querySelector("id").textContent;
    let nombre = cerveza.querySelector("nombre").textContent;
    let alcohol = cerveza.querySelector("alcohol").textContent;
    if(contador < 2){
      contador++;
      oCerveceria.altaCerveza(new Rubia(id,nombre,alcohol));
    }
    else{
      oCerveceria.altaCerveza(new Negra(id,nombre,alcohol));

    }
  }
     
}
