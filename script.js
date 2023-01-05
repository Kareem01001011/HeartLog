// notes:
    // you can now switch between user data using the id, so somewhat done. add the ability to access different ids 
    // using an input that asks for the id (you should make a thing that lists the patient name and the id and make 
    // a search thing to search for data like search for a certain name or id or birth date or phone number etc...
    // (that'll require regex (sadly)))
    // l1: input asks for the id, you write the id and press a button that displays data that belongs to that id
    // dates: https://www.w3schools.com/js/js_dates.asp
    // dates will play an important rule for readability, you can make the user check for a certain date for a 
    //   certain day, in that day the user gets to select what hour does he want to check it's logs, and in that 
    // hour there should be 60 recorded heartbeats (duh)

    // basic graphs are done, make the rest of the important stuff
    // important: make a graphing thing, graphs, you need them. make a graph for each recorded hour and make it 
    // save the graph data so to not use a lot of resources (aka cache the graphs), and make a custom thing that
    // graphs the data for the selected amount of time, also make a graph for every day, every week, every month

// THE CODE

const idk = document.getElementById("changeID").defaultValue = 0;
let tempVar = "0";

function showData() {

    const idInput = document.getElementById("changeID").value;
    const tempVar = idInput.toString();
    const temp = "ID" + tempVar;
    const data = JSON.parse(eval(temp));
    const tableBody = document.getElementById("tableBody");

    // Display patient data
    
    const patientID = document.getElementById("patientID");
    const patientName = document.getElementById("patientName");
    const dateOfBirth = document.getElementById("dateOfBirth");
    const nationalID = document.getElementById("nationalID");
    const emailAddress = document.getElementById("emailAddress");
    const phoneNumber = document.getElementById("phoneNumber");
    patientID.innerText = "ID: " + data.patientID;
    patientName.innerText = "Patient Name: " +  data.patientName;
    dateOfBirth.innerText = "Date Of Birth: " + data.dateOfBirth;
    nationalID.innerText = "National ID: " + data.nationalID;
    emailAddress.innerText = "Email Address: " + data.emailAddress;
    phoneNumber.innerText = "Phone Number: " + data.phoneNumber;

    // Chart

    let temp2 = "data/" + temp + ".csv";
    fetch(temp2)
    .then(function (response) {
       return response.text();
    })
    .then(function (text) {
        let series = csvToSeries(text);
        renderChart(series);
    })
    .catch(function (error) {
       //Something went wrong
       console.log(error);
    });

    function csvToSeries(text) {
        const bpmChart = 'bpm';
        let dataAsJson = JSC.csv2Json(text);
        let bpm = [];
        dataAsJson.forEach(function(row) {
            bpm.push({x: row.id, y: row[bpmChart]});
        });
        //console.log([bpm]);
        return [
            {name: 'bpm', points: bpm},
        ];
    }

// failed try of using a json file in the graph
// (cant i just use csv for everything? (i probably can but its a lot of work and i am lazy))

// JSC.fetch(data)
// .then(response => response.json())
// .then(function (json) {
//     let series = jsonToSeries(json);
//     renderChart(series)
// })
// .catch(function (error) {
//    //Something went wrong
//    console.log(error);
// });

// function jsonToSeries(text) {
//     const bpmChart = 'bpm';
//     let dataAsJson = text;
//     let bpm = []
//     dataAsJson.forEach(function(row) {
//         bpm.push({x: row.id, y: row[bpmChart]});
//     });
//     console.log([bpm]);
//     return [
//         {name: 'bpm', points: bpm},
//      ];
// }

    // JSC.Chart('chartDiv', {
    //     type: 'horizontal column',
    //     series: [
    //         {
    //             name: 'Andy',
    //             points: [
    //                 {x: 'Apples', y: 50},
    //                 {x: 'Oranges', y: 32}
    //             ]
    //         }, {
    //             name: 'Anna',
    //             points: [
    //                 {x: 'Apples', y: 30},
    //                 {x: 'Oranges', y: 22}
    //             ]
    //         }
    //     ]
    // });


// read csv files  (its here bec order of operations sucks and this wont work 
// after making the table bec "id is not defined")

// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "data/b.csv",
//         dataType: "text",
//         success: function(data) {processData(data);}
//         });
// });

// function processData(allText) {
//     var allTextLines = allText.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];

//     for (var i=1; i<allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {

//             let tarr = [];
//             for (var j=0; j<headers.length; j++) {
//                 tarr.push(headers[j]+":"+data[j]);
//             }
//             lines.push(tarr);
//         }
//     }
//     // alert(lines);
//     console.log(lines);
// }


    // Display heartbeat data
    
    let even = 0;
    let odd = 1;
    for(i=1; i<=data.hb.length; i+=1) {
        const tableRow = document.createElement("tr");
        const idData1 = document.createElement("td");
        const bpmData1 = document.createElement("td");
        const idData2 = document.createElement("td");
        const bpmData2 = document.createElement("td");
        // const dateAndTime = document.createElement("td"); (don't use it until you can generate consistent data of it)
    
        idData1.innerText = data.hb[even].id;
        bpmData1.innerText = data.hb[even].bpm;
        idData2.innerText = data.hb[odd].id;
        bpmData2.innerText = data.hb[odd].bpm;
        
    
        tableRow.appendChild(idData1);
        tableRow.appendChild(bpmData1);
        tableRow.appendChild(idData2);
        tableRow.appendChild(bpmData2);
        // tableRow.appendChild(dateAndTime)
        tableBody.appendChild(tableRow);
        even += 2
        odd += 2
    }

}

function renderChart(series){
    JSC.Chart('chartDiv', {
        title_label_text: 'BPM each minute (for 1 hour)',
        type: 'normal',
        xAxis_crosshair_enabled: true,
        defaultPoint_tooltip: '<b>%yValue</b> BPM',
        series: series
    });
}

// TODO: make this work, chrome tabs are bookmarked in a folder called "continue hl"
    // function createUser() {

    //     const idInput = document.getElementById("changeID").value;
    //     tempVar = idInput.toString()
    //     const temp = "ID" + tempVar;
    //     const file = temp + ".json"
    //     const fetchedFile = fetch("data/" + file);

    //     const patientNameCR = document.getElementById("patientNameCR").value;
    //     const dateOfBirthCR = document.getElementById("dateOfBirthCR").value;
    //     const nationalIDCR = document.getElementById("nationalIDCR").value;
    //     const emailAddressCR = document.getElementById("emailAddressCR").value;
    //     const phoneNumberCR = document.getElementById("phoneNumberCR").value;

    //     var txt = '{"employees":[' +
    //     '{"firstName":"Jerry","lastName":"Negrell","time":"9:15 am","email":"jerry@bah.com","phone":"800-597-9405","image":"images/jerry.jpg" },' +
    //     '{"firstName":"Ed","lastName":"Snide","time":"9:00 am","email":"edward@bah.com","phone":"800-597-9406","image":"images/ed.jpg" },' +
    //     '{"firstName":"Pattabhi","lastName":"Nunn","time":"10:15 am","email":"pattabhi@bah.com","phone":"800-597-9407","image":"images/pattabhi.jpg" }'+
    //     ']}';

    //     const dataTest = '{"patientID":"0", "patientName": "Kareem Osama", "dateOfBirth": "12-04-2007", "nationalID": "4070412251944", "emailAddress":"kareemosama@example.com", "phoneNumber":"+201012345678", "hb": [ {"id":"0", "bpm":"80"}, {"id":"1", "bpm": "79"},{"id":"2", "bpm": "81"},{"id":"3", "bpm": "83"},{"id":"4", "bpm": "92"},{"id":"5", "bpm": "95"}, {"id":"6", "bpm":"78"}, {"id":"7", "bpm":"89"}, {"id":"8", "bpm":"84"}, {"id":"9", "bpm":"84"}, {"id":"10", "bpm":"82"} ]}';
    //     let filee;
    //     fs.readFile("heart data.txt", (err, data) => {
    //         if (err) throw err;
    //         console.log(data.toString());
    //         filee = data;
    //      });

    //     var dataa = JSON.parse(fetchedFile);  //parse the JSON
    //     dataa.hb.push(filee);
    //     txt = JSON.stringify(dataa);
    //     fs.writeFile(file, txt, function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //       });
    // }
    //
    // this should be thown in the main function
    // function createUser() {
    //
    //     const idInput = document.getElementById("changeID").value;
    //     tempVar = idInput.toString()
    //     const temp = "ID" + tempVar;
    //
    //     const patientNameCR = document.getElementById("patientNameCR").value;
    //     const dateOfBirthCR = document.getElementById("dateOfBirthCR").value;
    //     const nationalIDCR = document.getElementById("nationalIDCR").value;
    //     const emailAddressCR = document.getElementById("emailAddressCR").value;
    //     const phoneNumberCR = document.getElementById("phoneNumberCR").value;
    //
    //     fs.appendFile('mynewfile1.json', 'Hello content!', function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });
    // }

showData()


// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "data/b.csv",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });

// function processData(allText) {
//     var allTextLines = allText.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];

//     for (var i=1; i<allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {

//             var tarr = [];
//             for (var j=0; j<headers.length; j++) {
//                 tarr.push(headers[j]+":"+data[j]);
//             }
//             lines.push(tarr);
//         }
//     }
//     alert(lines);
//     print(lines);
// }