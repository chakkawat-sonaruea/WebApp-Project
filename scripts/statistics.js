URL = 'https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all'

let days = []
let total_cases = []
let new_cases = []
let last30day = []
let last7day = []
let last2day = []
let loaded = false
fetch(URL)
    .then(res => res.json())
    .then(x => {
        loaded = true;
        return x
    })
    .then(arr => {
        let arr_rev = arr
        arr_rev = arr_rev.reverse()
        last30day = arr_rev.slice(0, 31)
        last7day = last30day.slice(0, 8)
        last2day = last7day.slice(0, 2)

        last30day.forEach(a => {
            days.push(a.txn_date)
            total_cases.push(a.total_case)
            new_cases.push(a.new_case)
        })
        console.log(arr)
        return arr
    })
    .then(arr => {
        plotChart()
        return arr;
    })

function plotChart() {
    console.log(days.reverse())
    console.log(new_cases)
    const data = {
        labels: days,
        datasets: [{
            label: 'Covid Statistics',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: new_cases.reverse(),
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scale: {
                y: {
                    stacked: true
                }
            }
        }

    }


    const covid_chart = new Chart(
        document.getElementById('covid-chart').getContext('2d'),
        config
    );
}

document.getElementById("interval-select").addEventListener("change", changeHandler)

const infected_total = document.querySelector("#total-case>.total-case-number")
const infected_today = document.querySelector("#total-case>.today-case-number")
const recovering_total = document.querySelector("#recovering-case>.total-case-number")
const recovering_today = document.querySelector("#recovering-case>.today-case-number")
const recovered_total = document.querySelector("#recovered-case>.total-case-number")
const recovered_today = document.querySelector("#recovered-case>.today-case-number")
const death_total = document.querySelector("#death-case>.total-case-number")
const death_today = document.querySelector("#death-case>.today-case-number")

function changeHandler(event) {
    if (!loaded) {
        alert('Data still not finish downloading, the operation may take some time.')
    }
    const interval = event.target.value
    console.log(last30day);
    console.log(last7day);
    console.log(last2day);
    switch (interval) {
        case 'perDay':
            configValue(
                last2day[0].total_case,
                `เพิ่มขึ้น ${last2day[0].new_case}`,
                (last2day[0].total_case - last2day[0].total_recovered - last2day[0].total_death),
                `ลดลง ${-(last2day[0].new_case - last2day[0].new_recovered - last2day[0].new_death)}`,
                `เพิ่มขึ้น ${last2day[0].new_recovered}`,
                last2day[0].total_recovered,
                last2day[0].total_death,
                `เพิ่มขึ่น ${last2day[0].new_death}`,
            )
            break;
        case 'perWeek':
            configValue(
                last7day[0].total_case,
                `เพิ่มขึ้น ${last7day[0].total_case - last7day[7].total_case}`,
                (last7day[0].total_case - last7day[0].total_recovered - last7day[0].total_death),
                `ลดลง ${-((last7day[0].total_case - last7day[7].total_case)
                    - (last7day[0].total_recovered - last7day[7].total_recovered)
                    - (last7day[0].total_death - last7day[7].total_death)
                )}`,
                `เพิ่มขึ้น ${last7day[0].total_recovered - last7day[7].total_recovered}`,
                last7day[0].total_recovered,
                last7day[0].total_death,
                `เพื่มขึ้น ${last7day[0].total_death - last7day[7].total_death}`,
            )
            break;
        case 'perMonth':
            configValue(
                last30day[0].total_case,
                `เพิ่มขึ้น ${last30day[0].total_case - last30day[30].total_case}`,
                (last30day[0].total_case - last30day[0].total_recovered - last30day[0].total_death),
                `ลดลง ${-((last30day[0].total_case - last30day[30].total_case)
                    - (last30day[0].total_recovered - last30day[30].total_recovered)
                    - (last30day[0].total_death - last30day[30].total_death)
                )}`,
                `เพิ่มขึ้น ${last30day[0].total_recovered - last30day[30].total_recovered} NEW`,
                last30day[0].total_recovered,
                last30day[0].total_death,
                `เพิ่มขึ้น ${last30day[0].total_death - last30day[30].total_death}`,
            )
            break;
        default:
            break;
    }

}

function configValue(inf_total, inf_today, rei_total, rei_today, rec_total, rec_today, dth_total, dth_today) {
    // swap order of total case and today case
    infected_today.innerText = inf_total
    infected_total.innerText = inf_today
    recovering_total.innerText = rei_today
    recovering_today.innerText = rei_total
    recovered_today.innerText = rec_today
    recovered_total.innerText = rec_total
    death_total.innerText = dth_today
    death_today.innerText = dth_total
}