const fs = require('fs')
var textByLine = fs.readFileSync('NASALinksFullBody(X).txt').toString().split("\n");
var csvLinkNames = fs.readFileSync('linkNames.csv').toString().split("\n");
var allLinks = fs.readFileSync('excel.csv').toString().split("\n");

let allExcel = allLinks.map(e => e.split(","));

let uploadingVersion = new Object();
var allImages = new Object();
var numBerOfLinks = 0;

let x = 24;
let w = 23;
let y = 25;
let lat = 2;
let long = 3;

for(var i = 0; i < csvLinkNames.length; i++)
{
    let nameLink = csvLinkNames[i].split(',');
    let current = nameLink[0];
    let rowNumber = current.substring(current.indexOf('row-') + 4, current.indexOf(')'));
    let waterSources = allExcel[rowNumber][w-1].split("; ").filter(e => e != "0" && e!= "1" && e!= "rejected");
    let closeup = allExcel[rowNumber][y-1].split("; "); 

    if(!allImages.hasOwnProperty(rowNumber))
    {
        Object.assign(allImages, { [rowNumber] : {
            "CLOSE_UP" : closeup,
            "WATER_SOURCES" : waterSources,
            "LATITUDE" : allExcel[rowNumber][lat],
            "LONGITUDE" : allExcel[rowNumber][long],
            "FULL_BODY" : {}
        }});
    }
        var alphabet = "abcdefghijklmn".split("");
        let idx = 0;
        for(var j = 0; j < alphabet.length; j++)
        {
            if(current.indexOf('-' + alphabet[j] + '--') >= 0)
            {
                idx = j;
            }
        }
        let arrayOfImages = textByLine[rowNumber].split('; ').filter(item => item != 'rejected');
        let nasaLink = arrayOfImages[idx];
        let driveLink = nameLink[1];
        let driveID = driveLink.substring(driveLink.indexOf('file/d/') + 7, driveLink.indexOf('/view?usp='));
        Object.assign(allImages[rowNumber]["FULL_BODY"], { 
            [driveID] : nasaLink
        }); 
}

Object.assign(uploadingVersion, { 
    ['NASA_FILE_1'] : allImages,
});
fs.writeFile("NASA.json", JSON.stringify(uploadingVersion), function(err) {
    if (err) {
        console.log(err);
    }
});
