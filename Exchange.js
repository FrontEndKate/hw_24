const formHandlerRegister = new FormHandler("#reg_form");

const base_url = "https://data.fixer.io/api/";
const api_key = "b0563b6dc78ccfd17382d5b64ffc1845";

const result_text = document.getElementById("result_text");

async function exchangeFetch(data) {
    try {
        result_text.textContent = "Please wait, loading...";
        result_text.style.display = "flex";

        const response = await fetch(`${base_url}latest?access_key=${api_key}`
            + "&symbols=" + data.from + "," + data.to);
        const result = await response.json();
        if (result.success) {
            const firstSymbolRate = result.rates[data.from];
            const secondSymbolRate = result.rates[data.to];

            const res = (data.amount * (secondSymbolRate / firstSymbolRate)).toFixed(2);
            result_text.textContent = `Result = ${res}`;
            result_text.style.display = "flex";
        } else {
            console.error(result.error);
            result_text.textContent = `${result.error}. Please try again.`;
        }
    } catch (error) {
        console.error(error);
        result_text.textContent = `${result.error}. Please try again.`;
    }
}

formHandlerRegister.addHandler(exchangeFetch);
