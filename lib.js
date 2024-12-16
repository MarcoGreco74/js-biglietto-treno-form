/*
Il programma dovrà mostrare una form da compilare usando i corretti campi HTML di input con cui chiedere all’utente 
il numero di chilometri che vuole percorrere e l’età del passeggero. Utilizzate Bootstrap come libreria UI.
Sulla base di queste informazioni dovrà calcolare il prezzo totale del viaggio, secondo queste regole:
il prezzo del biglietto è definito in base ai km (0.21 € al km)
va applicato uno sconto del 20% per i minorenni
va applicato uno sconto del 40% per gli over 65.
Il recap dei dati e l’output del prezzo finale va stampato in pagina (formattato con massimo due decimali, per indicare centesimi sul prezzo). 
Questo richiederà un minimo di ricerca.
*/
let prezzoAlKm = 0.21;
let prezzo;
let res = '';
let errMsg = '';
let error = {nome: '', cognome: '', quantiKm: '', age: '', condition: ''};
let dati = {nome: '', cognome: '', quantiKm: '', age: '', condition: ''};
let btnSubmit = document.querySelector("#btnCalcola");
let btnSpinner = document.querySelector("#btnSpinner");

function convalidaNome(nome){
    return (nome.length > 1 && nome.length < 20);
}
function convalidaCognome(cognome){
    return (cognome.length > 1 && cognome.length < 20);
}
function convalidaKm(km){
    return (parseInt(km) > 0);
}
function convalidaAge(age){
    age = dati.age = document.querySelector("select").value;
    if(age !== "0-17 anni" && age !== "da 65 anni"){
        prezzo = (prezzoAlKm * dati.quantiKm);                 
        res = '€ '+prezzo.toFixed(2).replace(".", ",");
    }
    if(age == "0-17 anni"){
        prezzo =  (prezzoAlKm * dati.quantiKm) - ((20 * (prezzoAlKm * dati.quantiKm)) / 100);
        res = '€ '+prezzo.toFixed(2).replace(".", ",");
    }
    if(age == "da 65 anni"){
        prezzo =  (prezzoAlKm * dati.quantiKm) - ((40 * (prezzoAlKm * dati.quantiKm)) / 100);
        res = '€ '+prezzo.toFixed(2).replace(".", ",");
    }
    return age;
}
function showSpinner(){
    btnSpinner.style.display = 'block';
    btnSubmit.style.display = 'none';
}
function showCalcola(){
    btnSpinner.style.display = 'none';
    btnSubmit.style.display = 'block';
}
btnSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    showSpinner();
    dati.nome = document.querySelector('#validationDefault01').value;
    dati.cognome = document.forms[0].elements[1].value;
    dati.quantiKm = document.querySelector("#validationDefault05").value;
    dati.age = document.querySelector("select").value;
    dati.condition = document.querySelector("#invalidCheck2");
    error.condition = (dati.condition).checked ? '' : 'Devi accettare le condizioni per continuare';
    document.querySelector("#errorSpanCondition").innerHTML = error.condition;
    error.nome = convalidaNome(dati.nome) ? '' : 'Devi inserire un nome valido di min 2 e max 20 lettere';
    document.querySelector("form > div > #errorSpanNome").innerHTML = error.nome;
    error.cognome = convalidaCognome(dati.cognome) ? '' : 'Devi inserire un cognome valido di min 2 e max 20 lettere';
    document.querySelector("form > div > #errorSpanCognome").innerHTML = error.cognome ;
    error.age = convalidaAge(dati.age) ? '' : 'Devi inserire una fascia di età valida';
    document.querySelector("form > div > #errorSpanAge").innerHTML = error.age ;
    error.quantiKm = convalidaKm(dati.quantiKm) ? '' : 'Devi inserire i kms che vuoi percorrere';
    document.querySelector("form > div > #errorSpanKm").innerHTML = error.quantiKm ;
    errMsg+=error.nome+' '+error.cognome+' '+error.age+' '+error.quantiKm+' '+error.condition;
    if(!(errMsg.trim()).length){
        setTimeout( ()=>{
            document.getElementById("nomeUtente").innerHTML = 'Nome e cognome utente <strong>'+dati.nome+'</strong><strong>'+' '+dati.cognome+'</strong>';
            document.getElementById("tot").innerHTML = '<strong>Totale </strong>'+res;
            document.getElementById("prezzoAlKm").innerHTML = 'Prezzo al km €'+prezzoAlKm;
            document.getElementById("quantiKm").innerHTML = 'Km che vuoi percorrere '+dati.quantiKm;
            document.getElementById("eta").innerHTML = 'Età '+dati.age;
            document.getElementById("sconto").innerHTML = 'Sconto applicato '+((dati.age == "0-17 anni") ? 20 : ((dati.age == "da 65 anni") ? 40 : 'nessuno sconto'))+'%';
            document.getElementById("errorMsg").innerHTML = '<strong>'+errMsg+'</strong>';
        }, 3000);
        setTimeout(showCalcola, 3000);
    }else{
        alert('Dati inseriti non corretti !!!')
    }
});
