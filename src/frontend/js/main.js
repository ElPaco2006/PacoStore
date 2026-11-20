
async function call_backend() {
    const r = await fetch("http://backend:8888/store");
    const json = await r.json();
    console.log(json);
    document.getElementById("out").innerText = json.message;
    return json;
}

call_backend();