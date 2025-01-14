setTimeout(async () => {
    const bankExchangeCourseUrl = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    const restCountriesUrl = "https://restcountries.com/v3.1/all";
    let countriesData = await fetch(restCountriesUrl);
    countriesData = await countriesData.json();

    let bankData = await fetch(bankExchangeCourseUrl);
    bankData = await bankData.json();

    document.getElementById("exchangetoday").innerHTML = `Курсы валют от НБУ на ${bankData[0].exchangedate}`;

    let cardOfExchange = document.getElementById("exchangeCard");
    cardOfExchange.innerHTML = bankData
        .filter((item) => {

            return countriesData.some((country) => {
                return (
                    country.currencies &&
                    Object.keys(country.currencies).includes(item.cc)
                );
            });
        })
        .map((item) => {
            let matchingCountries = countriesData.filter((country) => {
                return (
                    country.currencies &&
                    Object.keys(country.currencies).includes(item.cc)
                );
            });
            let countryFlags = matchingCountries
                .map((country) => {
                                return `<img src="${country.flags.png}" 
                                 alt="${country.name.common}" 
                                 title="${country.name.common}" 
                                 style="width: 32px; height: 20px; margin: 0 5px; border: 1px solid #ccc; border-radius: 3px;">`;
                })
                .join("");

            if (!countryFlags) {
                countryFlags = "Флаги не найдены";
            }

            return `
                <div class="card mx-auto" id="exchangeCard">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            ${item.txt} (${item.cc}) — ${item.rate} грн
                            <b id="countryFlags">${countryFlags}</b>
                        </li>
                    </ul>
                </div>
            `;
        })
        .join('');

        
}, 1000);