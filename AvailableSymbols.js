let currencies = {}
const base_url1 = "https://data.fixer.io/api/";
const api_key1 = "b0563b6dc78ccfd17382d5b64ffc1845";


async function loadCurrencies() {
    try {
        const response = await fetch(`${base_url1}symbols?access_key=${api_key1}`);
        const result = await response.json();
        if (result.success) {
            currencies = result.symbols;
        } else {
            console.error(result.error);
        }
    } catch (error) {
        console.error(error);
    }
}

function setupAutocomplete(inputElement, autocompleteListElement) {
    let isSelecting = false;
    inputElement.addEventListener("input", function() {
        const val = this.value.toUpperCase();
        autocompleteListElement.innerHTML = "";
        if (!val) return false;

        for (const [currency, description] of Object.entries(currencies)) {
            if (currency.startsWith(val)) {
                const item = document.createElement("div");
                item.textContent = `${currency} - ${description}`;
                item.addEventListener("mousedown", function(e) {
                    isSelecting = true;
                    inputElement.value = currency;
                    autocompleteListElement.innerHTML = "";
                });
                autocompleteListElement.appendChild(item);
            }
        }
    });

    inputElement.addEventListener("blur", function() {
        if (!isSelecting) {
            if (!currencies[inputElement.value.toUpperCase()]) {
                alert("Please select a valid currency from the list.");
                inputElement.value = "USD";
            }
        }
        isSelecting = false;
    });
}


loadCurrencies().then(() => {
    const currencyFromInput = document.getElementById("currency_from");
    const currencyFromList = document.getElementById("autocomplete_from_list");
    setupAutocomplete(currencyFromInput, currencyFromList);

    const currencyToInput = document.getElementById("currency_to");
    const currencyToList = document.getElementById("autocomplete_to_list");
    setupAutocomplete(currencyToInput, currencyToList);
});