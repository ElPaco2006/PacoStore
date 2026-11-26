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

    const response = await fetch(API_ENDPOINT + "product/" + sku);
    if (!response.ok) {
        alert("Error connecting to backend: " + response.statusText);
        return;
    }
    
    const json = await response.json();
    add_row(json.product, quantity);
}

function add_row(product, quantity) {
    const row =  tbody.insertRow();
    row.insertCell().innerText = product.sku;
    row.insertCell().innerText = product.name;
    row.insertCell().innerText = quantity;
    row.insertCell().innerText = product.price;
    row.insertCell().innerText = quantity * product.price;
}