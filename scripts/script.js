provinceNames = {
    "TH-10": "กรุงเทพมหานคร",
    "TH-11": "สมุทรปราการ",
    "TH-12": "นนทบุรี",
    "TH-13": "ปทุมธานี",
    "TH-14": "พระนครศรีอยุธยา",
    "TH-15": "อ่างทอง",
    "TH-16": "ลพบุรี",
    "TH-17": "สิงห์บุรี",
    "TH-18": "ชัยนาท",
    "TH-19": "สระบุรี",
    "TH-20": "ชลบุรี",
    "TH-21": "ระยอง",
    "TH-22": "จันทบุรี",
    "TH-23": "ตราด",
    "TH-24": "ฉะเชิงเทรา",
    "TH-25": "ปราจีนบุรี",
    "TH-26": "นครนายก",
    "TH-27": "สระแก้ว",
    "TH-30": "นครราชสีมา",
    "TH-31": "บุรีรัมย์",
    "TH-32": "สุรินทร์",
    "TH-33": "ศรีสะเกษ",
    "TH-34": "อุบลราชธานี",
    "TH-35": "ยโสธร",
    "TH-36": "ชัยภูมิ",
    "TH-37": "อำนาจเจริญ",
    "TH-38": "บึงกาฬ",
    "TH-39": "หนองบัวลำภู",
    "TH-40": "ขอนแก่น",
    "TH-41": "อุดรธานี",
    "TH-42": "เลย",
    "TH-43": "หนองคาย",
    "TH-44": "มหาสารคาม",
    "TH-45": "ร้อยเอ็ด",
    "TH-46": "กาฬสินธุ์",
    "TH-47": "สกลนคร",
    "TH-48": "นครพนม",
    "TH-49": "มุกดาหาร",
    "TH-50": "เชียงใหม่",
    "TH-51": "ลำพูน",
    "TH-52": "ลำปาง",
    "TH-53": "อุตรดิตถ์",
    "TH-54": "แพร่",
    "TH-55": "น่าน",
    "TH-56": "พะเยา",
    "TH-57": "เชียงราย",
    "TH-58": "แม่ฮ่องสอน",
    "TH-60": "นครสวรรค์",
    "TH-61": "อุทัยธานี",
    "TH-62": "กำแพงเพชร",
    "TH-63": "ตาก",
    "TH-64": "สุโขทัย",
    "TH-65": "พิษณุโลก",
    "TH-66": "พิจิตร",
    "TH-67": "เพชรบูรณ์",
    "TH-70": "ราชบุรี",
    "TH-71": "กาญจนบุรี",
    "TH-72": "สุพรรณบุรี",
    "TH-73": "นครปฐม",
    "TH-74": "สมุทรสาคร",
    "TH-75": "สมุทรสงคราม",
    "TH-76": "เพชรบุรี",
    "TH-77": "ประจวบคีรีขันธ์",
    "TH-80": "นครศรีธรรมราช",
    "TH-81": "กระบี่",
    "TH-82": "พังงา",
    "TH-83": "ภูเก็ต",
    "TH-84": "สุราษฎร์ธานี",
    "TH-85": "ระนอง",
    "TH-86": "ชุมพร",
    "TH-90": "สงขลา",
    "TH-91": "สตูล",
    "TH-92": "ตรัง",
    "TH-93": "พัทลุง",
    "TH-94": "ปัตตานี",
    "TH-95": "ยะลา",
    "TH-96": "นราธิวาส",
};

google.charts.load('current', {
    'packages': ['geochart'],
});

google.charts.setOnLoadCallback(drawRegionsMap);

let chart, data;
let provinceData = [
    ['Province', 'Population'],
]

const options = {
    region: "TH",
    resolution: "provinces",
    width: 1200,
    keepAspectRatio: false,
};

function checkProvinece(xs, name) {
    console.log(xs)
    console.log(xs.flatMap(x => x))
}

function drawRegionsMap() {
    chart = new google.visualization.GeoChart(document.getElementById('map-chart'));

    data = google.visualization.arrayToDataTable(provinceData);

    chart.draw(data, options);

    google.visualization.events.addListener(chart, 'regionClick', e => {
        provinceData.find(x => {
            if (x[1] == e.region)
                console.log(e)
            console.log(e)
        })
    });
}

checkProvinece(provinceData)

console.log(google.charts)
console.log("haha " + google.visualization.events)

function getStats() {
    url = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces"
    return fetch(url)
        .then(r => r.json())
        .then(e => {
            console.log(e)
            return e
        })

}

x = getStats();
console.log(x)