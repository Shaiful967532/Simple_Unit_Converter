// Unit categories and conversions
const unitConversions = {
    length: {
        units: {
            meters: 1,
            kilometers: 0.001,
            feet: 3.28084,
            inches: 39.3701
        }
    },
    weight: {
        units: {
            kilograms: 1,
            grams: 1000,
            pounds: 2.20462,
            ounces: 35.274
        }
    },
    temperature: {
        units: {
            celsius: "celsius",
            fahrenheit: "fahrenheit",
            kelvin: "kelvin"
        }
    },
    time: {
        units: {
            seconds: 1,
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400
        }
    }
};

// Update units dynamically based on the selected category
const categorySelect = document.getElementById("category");
const inputUnitSelect = document.getElementById("inputUnit");
const outputUnitSelect = document.getElementById("outputUnit");

function updateUnits() {
    const selectedCategory = categorySelect.value;
    const units = unitConversions[selectedCategory].units;

    inputUnitSelect.innerHTML = "";
    outputUnitSelect.innerHTML = "";

    for (const unit in units) {
        inputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        outputUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
    }
}

// Perform conversion
function convertUnits() {
    const selectedCategory = categorySelect.value;
    const inputValue = parseFloat(document.getElementById("inputValue").value);
    const inputUnit = inputUnitSelect.value;
    const outputUnit = outputUnitSelect.value;

    if (isNaN(inputValue)) {
        alert("Please enter a valid number!");
        return;
    }

    if (selectedCategory === "temperature") {
        let result;
        if (inputUnit === "celsius" && outputUnit === "fahrenheit") {
            result = (inputValue * 9) / 5 + 32;
        } else if (inputUnit === "fahrenheit" && outputUnit === "celsius") {
            result = ((inputValue - 32) * 5) / 9;
        } else if (inputUnit === "celsius" && outputUnit === "kelvin") {
            result = inputValue + 273.15;
        } else if (inputUnit === "kelvin" && outputUnit === "celsius") {
            result = inputValue - 273.15;
        } else if (inputUnit === "fahrenheit" && outputUnit === "kelvin") {
            result = ((inputValue - 32) * 5) / 9 + 273.15;
        } else if (inputUnit === "kelvin" && outputUnit === "fahrenheit") {
            result = ((inputValue - 273.15) * 9) / 5 + 32;
        } else {
            result = inputValue;
        }
        document.getElementById("result").textContent = `Result: ${result.toFixed(2)} ${outputUnit}`;
        return;
    }

    const inputFactor = unitConversions[selectedCategory].units[inputUnit];
    const outputFactor = unitConversions[selectedCategory].units[outputUnit];
    const result = (inputValue * inputFactor) / outputFactor;

    document.getElementById("result").textContent = `Result: ${result.toFixed(2)} ${outputUnit}`;
}

// Event listeners
categorySelect.addEventListener("change", updateUnits);
document.getElementById("convertBtn").addEventListener("click", convertUnits);

// Initialize default units
updateUnits();
