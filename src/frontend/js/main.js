import {API_ENDPOINT} from "./config.js";

const add_detail_form = document.getElementById("form");
const tbody = document.getElementById("sale-details");
const total_cells = document.getElementById("total");
const form = document.getElementById("form");
form.addEventListener("submit",  add_product);

async function add_product(event) {
    event.preventDefault();
    const form_data = new FormData(form);
    const {sku, quantity} = Object.fromEntries(form_data);

    const response = await fetch("http://localhost:6868/api/v1/product/" + sku);
    if (!response.ok) {
        alert("Error connecting to backend: " + response.statusText);
        return;
    }

    console.log(response);
    
}

function add_row() {
    const row =  tbody.insertRow();
    row.insertCell().innerText = 'abc';
    row.insertCell().innerText = 'Producto';
    row.insertCell().innerText = '1';
    row.insertCell().innerText = '67';
    row.insertCell().innerText = '67';
}