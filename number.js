function amountToWordsLatvian(amount) {
    if (typeof amount === "string") {
        amount = parseFloat(amount.replace(",", "."));
    }
    
    if (isNaN(amount)) {
        return "Nederīgs skaitlis"; // Неверное число
    }

    const ones = [
        "", "viens", "divi", "trīs", "četri", "pieci",
        "seši", "septiņi", "astoņi", "deviņi"
    ];

    const teens = [
        "desmit", "vienpadsmit", "divpadsmit", "trīspadsmit", "četrpadsmit",
        "piecpadsmit", "sešpadsmit", "septiņpadsmit", "astoņpadsmit", "deviņpadsmit"
    ];

    const tens = [
        "", "", "divdesmit", "trīsdesmit", "četrdesmit",
        "piecdesmit", "sešdesmit", "septiņdesmit", "astoņdesmit", "deviņdesmit"
    ];

    const hundreds = [
        "", "viens simts", "divi simti", "trīs simti", "četri simti",
        "pieci simti", "seši simti", "septiņi simti", "astoņi simti", "deviņi simti"
    ];

    const thousands = [
        "", "viens tūkstotis", "divi tūkstoši", "trīs tūkstoši", "četri tūkstoši",
        "pieci tūkstoši", "seši tūkstoši", "septiņi tūkstoši", "astoņi tūkstoši", "deviņi tūkstoši"
    ];

    const eurosText = "eiro";
    const centsText = "centi";

    function translateNumber(number) {
        if (number === 0) return "nulle";

        let words = "";

        if (number >= 1000) {
            let t = Math.floor(number / 1000);
            words += thousands[t] + " ";
            number %= 1000;
        }

        if (number >= 100) {
            words += hundreds[Math.floor(number / 100)] + " ";
            number %= 100;
        }

        if (number >= 20) {
            words += tens[Math.floor(number / 10)] + " ";
            number %= 10;
        }

        if (number >= 10) {
            words += teens[number - 10] + " ";
        } else if (number > 0) {
            words += ones[number] + " ";
        }

        return words.trim();
    }

    const [euros, cents] = amount.toFixed(2).split(".").map(Number);

    // let result = translateNumber(euros) + " " + eurosText;
    // if (cents > 0) {
    //     result += ` un ${cents} ${centsText}`;
    // }

    let result = translateNumber(euros) + " " + eurosText;
    result += ` un ${cents.toString().padStart(2, "0")} ${centsText}`; // Добавляем 00 если центы нулевые
    // Делаем первую букву заглавной
    return result.charAt(0).toUpperCase() + result.slice(1);
    //return result.trim();
}

// Примеры использования:
console.log(amountToWordsLatvian("1234,45")); // "Viens tūkstotis divi simti trīsdesmit četri Eiro un 45 Centi"
console.log(amountToWordsLatvian(5));         // "Pieci Eiro un 00 Centi"
console.log(amountToWordsLatvian("0.01"));    // "Nulle Eiro un 01 Centi"
console.log(amountToWordsLatvian("1000"));    // "Viens tūkstotis eiro un 00 Centi"
console.log(amountToWordsLatvian(5.23));      //'Pieci Eiro un 23 Centi'
console.log(amountToWordsLatvian(1005.45));   //'Viens tūkstotis pieci Eiro un 45 Centi'
console.log(amountToWordsLatvian("2055.34")); //"Divi tūkstoši piecdesmit pieci Eiro un 34 Centi"
console.log(amountToWordsLatvian("ab.34")); //"Nederīgs skaitlis"