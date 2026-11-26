import {API_ENDPOINT} from "./config.js";

const add_detail_form = document.getElementById("form");
const tbody = document.getElementById("sale-details");

form.onsubmit = (e) => {
    e.preventDefault();
    add_row();
    add_row();
    add_row();
    add_row();
    add_row();
}

function add_row() {
    const row =  tbody.insertRow();
    row.insertCell().innerText = 'abc';
    row.insertCell().innerText = 'Producto';
    row.insertCell().innerText = '1';
    row.insertCell().innerText = '67';
    row.insertCell().innerText = '67';
}