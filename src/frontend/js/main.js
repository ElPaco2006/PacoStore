
async function call_backend() {
    const r = await fetch("http://localhost:8888/store");
    const json = await r.json();
    console.log(json);
}

call_backend();