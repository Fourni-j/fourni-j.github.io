(function () {
    "use strict";

    const calculator = document.getElementById("food-waste-calculator");
    if (!calculator) return;

    const currencyInput = document.getElementById("calculator-currency");
    const weeklySpendInput = document.getElementById("weekly-grocery-spend");
    const wastePercentageInput = document.getElementById("waste-percentage");
    const reductionPercentageInput = document.getElementById("reduction-percentage");
    const annualSpendOutput = document.getElementById("annual-grocery-spend");
    const annualWasteOutput = document.getElementById("annual-waste-cost");
    const annualSavingsOutput = document.getElementById("annual-potential-savings");
    const summaryOutput = document.getElementById("calculator-summary");

    const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);
    const numericValue = (input, maximum) => {
        const parsedValue = Number.parseFloat(input.value);
        if (!Number.isFinite(parsedValue)) return 0;
        return clamp(parsedValue, 0, maximum);
    };

    const formatCurrency = (value, currency) => new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(value);

    function updateResults() {
        const currency = currencyInput.value;
        const weeklySpend = numericValue(weeklySpendInput, 1000000);
        const wastePercentage = numericValue(wastePercentageInput, 100);
        const reductionPercentage = numericValue(reductionPercentageInput, 100);

        const annualSpend = weeklySpend * 52;
        const annualWaste = annualSpend * (wastePercentage / 100);
        const annualSavings = annualWaste * (reductionPercentage / 100);
        const monthlySavings = annualSavings / 12;

        annualSpendOutput.textContent = formatCurrency(annualSpend, currency);
        annualWasteOutput.textContent = formatCurrency(annualWaste, currency);
        annualSavingsOutput.textContent = formatCurrency(annualSavings, currency);
        const pageLang = (document.documentElement.lang || "").toLowerCase();
        if (pageLang.startsWith("fr")) {
            summaryOutput.textContent = `Réduire votre gaspillage estimé de ${Math.round(reductionPercentage)} % pourrait garder environ ${formatCurrency(monthlySavings, currency)} par mois dans votre budget.`;
        } else if (pageLang.startsWith("de")) {
            summaryOutput.textContent = `Wenn Sie Ihre geschätzte Verschwendung um ${Math.round(reductionPercentage)} % reduzieren, könnten etwa ${formatCurrency(monthlySavings, currency)} pro Monat in Ihrem Budget bleiben.`;
        } else {
            summaryOutput.textContent = `Reducing your estimated waste by ${Math.round(reductionPercentage)}% could keep about ${formatCurrency(monthlySavings, currency)} per month in your budget.`;
        }
    }

    [currencyInput, weeklySpendInput, wastePercentageInput, reductionPercentageInput].forEach((input) => {
        input.addEventListener("input", updateResults);
        input.addEventListener("change", updateResults);
    });

    updateResults();
})();
