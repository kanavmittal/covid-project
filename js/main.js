// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const ctx = document.getElementById('my_chart').getContext('2d');
const ctx1 = document.getElementById('my_chart_active').getContext('2d');
var slider = document.getElementById("range-slider_range");
var output = document.getElementById("range-slider_value");

output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    axesLinerChart();
}

// APP VARIABLES
let app_data = [],
    cases_list = [],
    recovered_list = [],
    deaths_list = [],
    deaths = [],
    formatedDates = [];
active = [];

// GET USERS COUNTRY CODE
let country_code = 'IN';
let user_country;
country_list.forEach((country) => {
    if (country.code == country_code) {
        user_country = country.name;
    }
});

/* ---------------------------------------------- */
/*                     FETCH API                  */
/* ---------------------------------------------- */
function fetchData(country) {
    user_country = country;
    country_name_element.innerHTML = "Loading...";

    (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);
    (active = []);

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    const api_fetch = async(country) => {
        await fetch(
                "https://api.covid19api.com/total/country/" +
                country +
                "/status/confirmed",
                requestOptions
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach((entry) => {
                    dates.push(entry.Date);
                    cases_list.push(entry.Cases);
                });
            });

        await fetch(
                "https://api.covid19api.com/total/country/" +
                country +
                "/status/recovered",
                requestOptions
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach((entry) => {
                    recovered_list.push(entry.Cases);
                });
            });

        await fetch(
                "https://api.covid19api.com/total/country/" + country + "/status/deaths",
                requestOptions
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach((entry) => {
                    deaths_list.push(entry.Cases);
                });
            });

        await fetch(
                "https://api.covid19api.com/total/country/" +
                country,
                requestOptions
            )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach((entry) => {
                    active.push(entry.Active);
                });
            });

        updateUI();
    };

    api_fetch(country);
}

fetchData(user_country);

// UPDATE UI FUNCTION
function updateUI() {
    updateStats();
    axesLinerChart();
}

function updateStats() {
    const total_cases = cases_list[cases_list.length - 1];
    const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

    const total_recovered = recovered_list[recovered_list.length - 1];
    const new_recovered_cases =
        total_recovered - recovered_list[recovered_list.length - 2];

    const total_deaths = deaths_list[deaths_list.length - 1];
    const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

    country_name_element.innerHTML = user_country;
    total_cases_element.innerHTML = total_cases;
    new_cases_element.innerHTML = `+${new_confirmed_cases}`;
    recovered_element.innerHTML = total_recovered;
    new_recovered_element.innerHTML = `+${new_recovered_cases}`;
    deaths_element.innerHTML = total_deaths;
    new_deaths_element.innerHTML = `+${new_deaths_cases}`;

    // format dates
    dates.forEach((date) => {
        formatedDates.push(formatDate(date));
    });
}


// UPDATE CHART



let my_chart;

function axesLinerChart() {
    let chart_cases_list = [];
    let chart_formated_list = [];
    let chart_recovered_list = [];
    let chart_deaths_list = [];
    let chart_active_list = [];
    var valueslide = parseInt(slider.value);
    for (var i = 10; i < cases_list.length;) {
        chart_cases_list.push(cases_list[i]);
        chart_formated_list.push(formatedDates[i]);
        chart_recovered_list.push(recovered_list[i]);
        chart_deaths_list.push(deaths_list[i]);
        chart_active_list.push(active[i]);

        i = i + valueslide;
    }
    Chart.defaults.global.defaultFontFamily = 'Open Sans';
    Chart.defaults.global.defaultFontSize = 15;
    if (my_chart && my_chart_active) {
        my_chart.destroy();
        my_chart_active.destroy();
    }
    my_chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                    label: "Cases",
                    data: chart_cases_list,
                    borderWidth: 3,
                    fill: false,
                    borderColor: "rgba(227, 90, 80)",
                    pointRadius: 2,
                    pointHoverRadius: 10,
                    pointBackgroundColor: "rgba(227, 90, 80)",

                },
                {
                    label: "Recovered",
                    data: chart_recovered_list,
                    borderWidth: 3,
                    fill: false,
                    borderColor: "rgba(101, 202, 152)",
                    pointRadius: 2,
                    pointHoverRadius: 10,
                    pointBackgroundColor: "rgba(101, 202, 152)",
                },
                {
                    label: "Deaths",
                    data: chart_deaths_list,
                    fill: false,
                    borderWidth: 3,
                    borderColor: "rgba(52, 124, 231)",
                    pointRadius: 2,
                    pointHoverRadius: 10,
                    pointBackgroundColor: "rgba(52, 124, 231)",
                },
            ],
            labels: chart_formated_list,
        },

        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                }]
            },

        }
    });
    my_chart_active = new Chart(ctx1, {
        type: 'line',
        data: {
            datasets: [{
                label: "Active",
                data: chart_active_list,
                borderWidth: 3,
                fill: false,
                borderColor: "rgba(240, 166, 85)",
                pointRadius: 2,
                pointHoverRadius: 10,
                pointBackgroundColor: "rgba(240, 166, 85)",

            }, ],
            labels: chart_formated_list,
        },

        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                }]
            },

        }
    });

}

// FORMAT DATES
const monthsNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function formatDate(dateString) {
    let date = new Date(dateString);
    return `${date.getDate()} ${monthsNames[date.getMonth() - 1]}`;
}