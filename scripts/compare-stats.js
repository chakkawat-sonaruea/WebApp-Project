URL = "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-by-provinces"

let done = false;
let prompT = false;
const covid_data = fetch(URL)
    .then(res => res.json())
    .then(json => {
        done = true;
        console.log('Downloading Done')
        if (prompT) {
            alert('Downloading Done')
        }
        return json
    })





autocomplete(document.getElementById("left-input"), thaiProvinces);
autocomplete(document.getElementById("right-input"), thaiProvinces);

document.getElementById("submit-compare").addEventListener("click", checkForCompare)


function checkForCompare(event) {
    if (!done) {
        promptT = true;
        alert('Data still not finish downloading, the operation may take some time.')
        return
    }
    const left_input = document.getElementById("left-input")
    const right_input = document.getElementById("right-input")
    const date_picker = document.getElementById("date-picker")
    const left_value = left_input.value
    const right_value = right_input.value
    const date_picker_vulae = date_picker.value

    const left_total_total = document.querySelector("#left-result .total-case .total-case-number")
    const left_total_today = document.querySelector("#left-result .total-case .today-case-number")
    const left_rei_total = document.querySelector("#left-result .recovering-case .total-case-number")
    const left_rei_today = document.querySelector("#left-result .recovering-case .today-case-number")
    const left_rec_total = document.querySelector("#left-result .recovered-case .total-case-number")
    const left_rec_today = document.querySelector("#left-result .recovered-case .today-case-number")
    const left_death_total = document.querySelector("#left-result .death-case .total-case-number")
    const left_death_today = document.querySelector("#left-result .death-case .today-case-number")


    const right_total_total = document.querySelector("#right-result .total-case .total-case-number")
    const right_total_today = document.querySelector("#right-result .total-case .today-case-number")
    const right_rei_total = document.querySelector("#right-result .recovering-case .total-case-number")
    const right_rei_today = document.querySelector("#right-result .recovering-case .today-case-number")
    const right_rec_total = document.querySelector("#right-result .recovered-case .total-case-number")
    const right_rec_today = document.querySelector("#right-result .recovered-case .today-case-number")
    const right_death_total = document.querySelector("#right-result .death-case .total-case-number")
    const right_death_today = document.querySelector("#right-result .death-case .today-case-number")

    const compare_result = document.querySelector("#compare-result")

    if (thaiProvinces.includes(left_value) && thaiProvinces.includes(right_value) && date_picker_vulae !== '') {
        covid_data
            .then(arr => {
                const result = arr.filter(a => {
                    return a.txn_date == date_picker.value &&
                        (a.province == left_value || a.province == right_value)
                })
                console.log(result)

                left_result = result.filter(a => a.province == left_value)[0]
                right_result = result.filter(a => a.province == right_value)[0]

                console.log(left_result)
                console.log(right_result)

                left_total_total.innerText = left_result.total_case
                left_total_today.innerText = `เพิ่มขึ้น ${left_result.new_case.toLocaleString('en-US')}`

                left_death_total.innerText = left_result.total_death
                left_death_today.innerText = `เพิ่มขึ้น ${left_result.new_death.toLocaleString('en-US')}`

                right_total_total.innerText = right_result.total_case
                right_total_today.innerText = `เพิ่มขึ้น ${right_result.new_case.toLocaleString('en-US')}`

                right_death_total.innerText = right_result.total_death
                right_death_today.innerText = `เพิ่มขึ้น ${right_result.new_death.toLocaleString('en-US')}`

                // let higher, lower, p_high, p_low
                // if (left_total_today > right_total_today) {
                //     higher = left_total_today
                //     p_high = left.value
                //     lower = right_total_today
                //     p_low = right_value
                // } else {
                //     lower = left_total_today
                //     p_low = left.value
                //     higher = right_total_today
                //     p_high = right.value
                // }

                const diff = Math.abs(left_result.new_case - right_result.new_case)
                compare_result.innerHTML = `<p>ผลจาการเปรียบเทียบระหว่างจังหวัด${left_value}กับจังหวัด ${right_value}</p>` +
                    `<p>จำนวนผู้ติดเชื้อรายใหม่ของจังหวัด${left_value}มีจำนวนต่างจากผ้ติดเชึ้อของจังหวัด${right_value}อยู่${diff}คน ติดเป็น${Math.round(diff/Math.min(left_result.new_case, right_result.new_case)*100)}เปอร์เซ็น</p>`
                // compare_result.style.display = :w


            })
    }
    console.log(left_value)
    console.log(right_value)
    console.log(date_picker.value)
}