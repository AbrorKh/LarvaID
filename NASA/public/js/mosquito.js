let indexesToBeRemoved = {};
var allMosquitos = [];
var allTypeNames = ['Aedes aegypti', 'Aedes infirmatus', 'Aedes taeniorhynchus', 'Anopheles crucians', 'Coquil perturbans', 'Culex nigripalpus', 'Mansonia titillans'];
let type;
var oldImages = [];
let link;
let userName;

(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyCTN-D29q3oATwdh1exKXR1PMyH0QdHL9Y",
        authDomain: "nasa-8f8cf.firebaseapp.com",
        databaseURL: "https://nasa-8f8cf.firebaseio.com",
        projectId: "nasa-8f8cf",
        storageBucket: "nasa-8f8cf.appspot.com",
        messagingSenderId: "642014679933",
        appId: "1:642014679933:web:bd84e43a966a22b0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            document.getElementById('page').style.display = "none";
            document.getElementById('sherKar').addEventListener('click', e => {
                document.getElementById('page').style.display = "block";
                startPage();
                document.getElementById('userName').style.display = "none";
                document.getElementById('myVideo').style.display = "none";
                userName = "User 2";
            });
            document.getElementById('tanvir').addEventListener('click', e => {
                document.getElementById('page').style.display = "block";
                startPage();
                document.getElementById('userName').style.display = "none";
                document.getElementById('myVideo').style.display = "none";
                userName = "User 3";
            });
            document.getElementById('professor').addEventListener('click', e => {
                document.getElementById('page').style.display = "block";
                startPage();
                document.getElementById('userName').style.display = "none";
                document.getElementById('myVideo').style.display = "none";
                userName = "User 1";
            });
            document.getElementById('signout').addEventListener('click', e => {
                firebase.auth().signOut().then(function() {
                    window.location = "index.html";
                }).catch(function(error) {
                    // An error happened.
                });          
            });
        }
        else {
            window.location = "index.html";
        }
    });
}());

var map; 

function initMap(latitude, longitude) { 
    if(latitude != undefined && longitude != undefined)
    {
        map = new google.maps.Map(
            document.getElementById('map'), { 
                center: {
                    lat: parseFloat(latitude), 
                    lng: parseFloat(longitude)
                }, zoom: 8 
            }
        );
        var citymap = {
            city: {
            center: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
            rad: 100000
            }
        }
        for(var city in citymap)
        {
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: citymap[city].center,
                radius: Math.sqrt(citymap[city].rad) * 100
            });
        }
    }   
}

function startPage()
{
        (function($){
            $(document).on('contextmenu', 'img', function() {
                return false;
            })
        })(jQuery);  
        let select = document.getElementById('selection')
        let generas = ['Aedeomyia', 'Abraedes', 'Aedes', 'Anopheless', 'Culex', 'Culiseta', 'Coquillettidia', 'Eretmapodites', 'Fredwardsius', 'Haemagogus', 'Mansonia', 'Ochlerotatus', 'Opifex', 'Psorophora', 'Sabethes', 'Wyeomyia', 'Uranotaenia']
        for (var index_ = 0; index_ < generas.length; index_++){
            let option = document.createElement('option')
            option.value = generas[index_]
            option.innerHTML = generas[index_]
            select.appendChild(option)
        }
        document.getElementById('inputForName').style.display = "none";
        document.getElementById('selection').style.display = "none";
        document.getElementById('howSure').style.display = "none";
// Initialize Firebase

      setTimeout(showImages, 100);
    

      let somewhatSure = document.getElementById('somewhatSure');
      somewhatSure.addEventListener('click', e => {
          let comments = document.getElementById('comments').value
          console.log(comments)
          if (allMosquitos[indexesToBeRemoved['ROW']]["Completed Users"] === undefined || allMosquitos[indexesToBeRemoved['ROW']]["Completed Users"] === null){
            allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'] = [userName] 
          } else {
              allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'].push(userName)
              if (allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'].length === 3){
                delete allMosquitos[indexesToBeRemoved['ROW']];
              }
          }
          document.getElementById('comments').value = ''
          document.getElementById('TypeMosquito').innerHTML = "";
          validateToFirebase("Somewhat Sure", comments);
      });
      let verySure = document.getElementById('verySure');
      verySure.style.marginRight = "10px"; 
      verySure.addEventListener('click', e => {
        let comments = document.getElementById('comments').value
        console.log(comments)
          if (allMosquitos[indexesToBeRemoved['ROW']]["Completed Users"] === undefined || allMosquitos[indexesToBeRemoved['ROW']]["Completed Users"] === null){
            allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'] = [userName] 
          } else {
              allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'].push(userName)
              if (allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'].length === 3){
                delete allMosquitos[indexesToBeRemoved['ROW']];
              }
          }
          document.getElementById('comments').value = ''
          document.getElementById('TypeMosquito').innerHTML = "";
          validateToFirebase("Very Sure", comments);
      });

    document.getElementById('dontknow').addEventListener('click', e=> {
        let comments = document.getElementById('comments').value
        console.log(comments)
        if (allMosquitos[indexesToBeRemoved['ROW']]["Completed Users"] === undefined || allMosquitos[indexesToBeRemoved['ROW']]["Completed Users"] === null){
            allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'] = [userName] 
          } else {
              allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'].push(userName)
              if (allMosquitos[indexesToBeRemoved['ROW']]['Completed Users'].length === 3){
                delete allMosquitos[indexesToBeRemoved['ROW']];
              }
        }
        document.getElementById('comments').value = ''
        //indexesToBeRemoved = [];
        document.getElementById('inputForName').style.display = "none";
        document.getElementById('selection').style.display = "block";
        document.getElementById('selection').style.display = "none";
        document.getElementById('TypeMosquito').innerHTML = "";
        //showImages();
        validateToFirebase("Very Sure", comments);
    });

    document.getElementById('no').addEventListener('click', e => {
        document.getElementById('selection').style.display = "block";
    });
    
    document.getElementById('selection').onchange = function(){
        if(document.getElementById('selection').value.toString() == 'other')
        {
            document.getElementById('newMosquito').style.display = "block";
            document.getElementById('inputForName').style.display = "block";
            document.getElementById('selection').style.display = "none";
            document.getElementById('selection').value = 'choose';
        }
        else
        {
            if(document.getElementById('selection').value != 'choose'){
                indexesToBeRemoved['TYPE'] = document.getElementById('selection').value.toString();
                addValidateSure();
            }    
        } 
        document.getElementById('selection').style.display = "none";
    }
    document.getElementById('updateMosquito').addEventListener('click', e=> {
        if(document.getElementById('newMosquito').value != '')
        {
            console.log(indexesToBeRemoved['TYPE']);
            indexesToBeRemoved['TYPE'] = document.getElementById('newMosquito').value;
            console.log(indexesToBeRemoved['TYPE']);
            document.getElementById('inputForName').style.display = "none";
            addValidateSure();
        }
        else
        {
            document.getElementById('newMosquito').style.display = "none";
            document.getElementById('inputForName').style.display = "none";
            document.getElementById('selection').style.display = "block";
        }   
        document.getElementById('selection').style.display = "none";
    });
    
}

function showImages()
{
    document.getElementById('selection').value = 'choose';
    document.getElementById('bottomNav').innerHTML = "";
    document.getElementById('typeNames').innerHTML = "";
    for(var o = 0; o < oldImages.length; o++)
    {
        var div = document.createElement('div');
        div.className = "col-xs-2";
        var divGalary = document.createElement('div');
        for(var w = 0; w < oldImages[o]["LINKS"].length; w++)
        {
            let image = document.createElement('img');
            image.src = oldImages[o]["LINKS"][w];
            image.className = "valCover";
            let aTag = document.createElement('a');
            aTag.href = image.src;
            if(w != 0)
            {
                aTag.style.display = "none";
                image.style.display = "none";
            }    
            aTag.appendChild(image);
            divGalary.appendChild(aTag);
        } 
        if(oldImages[o]["CLOSE_UP"][0] != "")
        {
            for(var w = 0; w < oldImages[o]["CLOSE_UP"].length; w++)
            {
                let image = document.createElement('img');
                image.src = oldImages[o]["CLOSE_UP"][w];
                image.className = "valCover";
                let aTag = document.createElement('a');
                aTag.href = image.src;
                aTag.style.display = "none";
                image.style.display = "none";    
                aTag.appendChild(image);
                divGalary.appendChild(aTag);
            }
        } 
        if(oldImages[o]["WATER_SOURCES"][0] != "")
        {
            for(var w = 0; w < oldImages[o]["WATER_SOURCES"].length; w++)
            {
                let image = document.createElement('img');
                image.src = oldImages[o]["WATER_SOURCES"][w];
                image.className = "valCover";
                let aTag = document.createElement('a');
                aTag.href = image.src;
                aTag.style.display = "none";
                image.style.display = "none";    
                aTag.appendChild(image);
                divGalary.appendChild(aTag);
            }   
        }
        lightGallery(divGalary, {
            thumbnail:true,
            mode: 'lg-fade',
            animateThumb: true,
            showThumbByDefault: false
        });   
        var span = document.createElement('span');
        span.innerHTML = oldImages[o]["TYPE"];
        var p = document.createElement('p');
        p.innerHTML = "VERIFIED";
        p.style.color = "green";
        p.style.fontStyle = "bold"; 
        var div2 = document.createElement('div');
        div2.className = "col-xs-2";
        div2.appendChild(span);
        div2.appendChild(p);
        div.appendChild(divGalary);
        if($("#bottomNav > div").length == 6)
        {
            document.getElementById('bottomNav').firstChild.remove();
            document.getElementById('typeNames').firstChild.remove();
            oldImages.shift();
        }
        document.getElementById('typeNames').appendChild(div2);
        document.getElementById('bottomNav').appendChild(div);
    }

    document.getElementById('newMosquito').value = "";
    /*firebase.database().ref('NASA/').once('value', function(allData){
      console.log('Here');  
      allMosquitos = allData.val();
      console.log(allMosquitos);   
            let allKeys = Object.keys(allMosquitos);
            var rand = allKeys[Math.floor(Math.random() * allKeys.length)];

            let allImages = Object.keys(allMosquitos[rand]);
            let NASALinks = Object.values(allMosquitos[rand]);
    
            indexesToBeRemoved = {
                "TYPE" : '',
                "ROW" : rand,
                "ID" :  allImages,
                "LINKS" : NASALinks
            }
            console.log(allImages.length);     
            for(var p = 0; p < NASALinks.length; p++)
            {
                let img = document.createElement('img');
                img.src = NASALinks[p];
                img.className = "cover";
                let aTag = document.createElement('a');
                aTag.href = img.src;
                aTag.appendChild(img);
                document.getElementById('TypeMosquito').appendChild(aTag);
            }
            lightGallery(document.getElementById('TypeMosquito'), {
                thumbnail:true,
                mode: 'lg-fade',
                animateThumb: true,
                showThumbByDefault: false
            }); 
    }, function(error) {
        console.error(error);
    });*/
    firebase.database().ref('NASA_FILE_1/').once('value', function(allData){
        allMosquitos = allData.val();
        console.log(allMosquitos);   
              let allKeys = Object.keys(allMosquitos);
              //console.log(allKeys)
              let index_to_pick = 0
              while (index_to_pick < allKeys.length) {
                  if (allMosquitos[allKeys[index_to_pick]]["Completed Users"] === undefined || allMosquitos[allKeys[index_to_pick]]["Completed Users"] === null){
                      break; 
                  } 
                  else if(!(allMosquitos[allKeys[index_to_pick]]["Completed Users"].includes(userName))){
                      break;
                  } 
                  index_to_pick += 1;
              }
              var rand = allKeys[index_to_pick]//allKeys[Math.floor(Math.random() * allKeys.length)];
              //console.log(rand)
              let allImages = Object.keys(allMosquitos[rand]['FULL_BODY']);
              let NASALinks = Object.values(allMosquitos[rand]['FULL_BODY']);
              let closeup = Object.values(allMosquitos[rand]['CLOSE_UP']);
              let water_source;
              if(allMosquitos[rand].hasOwnProperty('WATER_SOURCES'))
                water_source = Object.values(allMosquitos[rand]['WATER_SOURCES']);
              else
                water_source = [""]; 
                //initMap(allMosquitos[rand]['LATITUDE'], allMosquitos[rand]['LONGITUDE']);
              indexesToBeRemoved = {
                  "TYPE" : '',
                  "ROW" : rand,
                  "ID" :  allImages,
                  "LINKS" : NASALinks,
                  "CLOSE_UP" : closeup,
                  "WATER_SOURCES" : water_source
              }
              console.log(allImages.length);     
              for(var p = 0; p < NASALinks.length; p++)
              {
                  let img = document.createElement('img');
                  img.src = NASALinks[p];
                  img.className = "cover";
                  let aTag = document.createElement('a');
                  aTag.href = img.src;
                  aTag.appendChild(img);
                  document.getElementById('TypeMosquito').appendChild(aTag);
              }
              if(water_source[0] != "")
              {
                for(var p = 0; p < water_source.length; p++)
                {
                    let img = document.createElement('img');
                    img.src = water_source[p];
                    img.className = "cover";
                    let aTag = document.createElement('a');
                    aTag.href = img.src;
                    aTag.appendChild(img);
                    document.getElementById('TypeMosquito').appendChild(aTag);
                }
              }
              if(closeup[0] != "")
              {
                for(var p = 0; p < closeup.length; p++)
                {
                    let img = document.createElement('img');
                    img.src = closeup[p];
                    img.className = "cover";
                    let aTag = document.createElement('a');
                    aTag.href = img.src;
                    aTag.appendChild(img);
                    document.getElementById('TypeMosquito').appendChild(aTag);
                }
              }
              lightGallery(document.getElementById('TypeMosquito'), {
                  thumbnail:true,
                  mode: 'lg-fade',
                  animateThumb: true,
                  showThumbByDefault: false
              }); 
      }, function(error) {
          console.error(error);
      });
    
}

function addValidateSure()
{
    document.getElementById('howSure').style.display = "block";
    document.getElementById('rightSide').style.display = "none";       
}

function validateToFirebase(sureHowMuch, comment)
{
        const nowTime = new Date();
        let idVerified = indexesToBeRemoved['ID'][0];
        let typeVerified = indexesToBeRemoved['TYPE'];
        let verified = {};
        //console.log(indexesToBeRemoved);
        oldImages.push(indexesToBeRemoved); 
        verified[idVerified] = {
            'IMGS' : indexesToBeRemoved['LINKS'],
            'CLOSE_UP' : indexesToBeRemoved['CLOSE_UP'],
            'WATER_SOURCES' : indexesToBeRemoved['WATER_SOURCES'],
            'TYPES': [{
                'UPDATED_TYPE' : typeVerified,
                'TIME' : nowTime.toDateString() + " " + nowTime.toLocaleTimeString(),
                'SURE' : sureHowMuch,
                'USER' : userName,
                'COMMENT': comment
                }
            ],
        };
        firebase.database().ref().child('NASA_FILE_1').push();
        firebase.database().ref().child('NASA_FILE_1').set(allMosquitos);
        firebase.database().ref().child('Validated_V2').once('value', e => {
            let validated = e.val()
            console.log(validated)
            if (validated !== undefined && validated !== null){
                console.log(validated[idVerified])
                if (validated[idVerified] !== undefined && validated[idVerified] !== null){
                    validated[idVerified]['TYPES'].push(verified[idVerified]['TYPES'][0]);
                    verified[idVerified] = validated[idVerified]
                    console.log(validated[idVerified])
                }
            }
            firebase.database().ref().child('Validated_V2').push();
            firebase.database().ref().child('Validated_V2').child(idVerified).push();
            firebase.database().ref().child('Validated_V2').child(idVerified).update(verified[idVerified]).then().catch();
        })
        document.getElementById('inputForName').style.display = "none";
        indexesToBeRemoved = [];
        document.getElementById('selection').style.display = "none";
        document.getElementById('howSure').style.display = "none";
        document.getElementById('rightSide').style.display = "block";
        document.getElementById('selection').value = 'choose';
        showImages();
}

