import {API_ENDPOINT} from "./config.js";

async function call_backend() {
    try {
        const r = await fetch(API_ENDPOINT + "/store");
        const json = await r.json();
        console.log(json);
        document.getElementById("out").innerText = json.message;
        return json;    
    } catch (error) {
        document.getElementById("out").innerText = error.message;
    }
    
}

call_backend();