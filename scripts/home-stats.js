const infected_total = document.querySelector("#total-case>.total-case-number")
const infected_today = document.querySelector("#total-case>.today-case-number")
const recovering_total = document.querySelector("#recovering-case>.total-case-number")
const recovering_today = document.querySelector("#recovering-case>.today-case-number")
const recovered_total = document.querySelector("#recovered-case>.total-case-number")
const recovered_today = document.querySelector("#recovered-case>.today-case-number")
const death_total = document.querySelector("#death-case>.total-case-number")
const death_today = document.querySelector("#death-case>.today-case-number")

url = "https://api-lab-covid.mindbase.co.th/v2/stats/dailies?key=a719ddf1-2351-44ce-b9e5-2021117c61efdc9b53&limit=2"
fetch(url)
    .then(res => res.json())
    .then(json => json.data.details)
    .then(days => {
        return days.map(day => {
            return {
                cumulative_covid_cases: day.cumulative_covid_cases,
                daily_covid_cases: day.daily_covid_cases,
                daily_stay_patient: day.daily_stay_patient,
                cumulative_recovered_cases: day.cumulative_recovered_cases,
                daily_recovered: day.daily_recovered,
                cumulative_deaths: day.cumulative_deaths,
                daily_deaths: day.daily_deaths
            }

        })
    })
    .then(days => {
        const today = days[0]
        const yesterday = days[1]
        infected_total.innerHTML = today.cumulative_covid_cases.toLocaleString('en-US')
        infected_today.innerHTML = `เพิ่มขึ้น ${today.daily_covid_cases.toLocaleString('en-US')}`
        recovering_total.innerText = today.daily_stay_patient.toLocaleString('en-US')
        const recovering_diff = today.daily_stay_patient - yesterday.daily_stay_patient
        if (recovering_diff < 0) {
            recovering_today.innerText = `ลดลง ${(-recovering_diff).toLocaleString('en-US')}`
        } else {
            recovering_today.innerText = `เพิ่มขึ่น ${recovering_diff.toLocaleString('en-US')}`
        }
        recovered_total.innerText = today.cumulative_recovered_cases.toLocaleString('en-US')
        recovered_today.innerText = `เพิ่มขึ้น ${today.daily_recovered.toLocaleString('en-US')}`
        death_total.innerText = today.cumulative_deaths.toLocaleString('en-US')
        death_today.innerText = `เพื่มขึ้น ${today.daily_deaths.toLocaleString('en-US')}`

    })
    .then(console.log)