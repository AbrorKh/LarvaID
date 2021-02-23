(function() {
// Initialize Firebase
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

    document.getElementById('out').addEventListener('click', e => {
      firebase.auth().signOut().then(function() {
          window.location = "index.html";
      }).catch(function(error) {
          // An error happened.
      });          
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        showValidatedImages();
          $(document).ready(function(){
              $("#input").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("#galary .row .col-xs-3").filter(function() {
                  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
              });
            });
            
            (function($){
              $(document).on('contextmenu', 'img', function() {
                  return false;
              })
            })(jQuery);  
      }
      else {
        window.location = "index.html";
      }  
    });  
}());      



function showValidatedImages()
{   
    firebase.database().ref().child('Validated_V2').once('value', function(val){
        const allValid = val.val();
        var allKeys = Object.keys(allValid);
        const divRow = document.createElement('div');
        divRow.className = "row";
        for(var k = 0; k < allKeys.length; k++)
        {    
            var divGalary = document.createElement('div');
            var allIMGs = allValid[allKeys[k]]['IMGS'];
            let closeup, waterSources;

            if(allValid[allKeys[k]].hasOwnProperty('CLOSE_UP'))
              closeup = allValid[allKeys[k]]['CLOSE_UP'];
            else
              closeup = [""];

            if(allValid[allKeys[k]].hasOwnProperty('WATER_SOURCES'))
              waterSources = allValid[allKeys[k]]['WATER_SOURCES'];
            else
              waterSources = [""];
              
            for(var w = 0; w < allIMGs.length; w++)
            {
                let image = document.createElement('img');
                image.src = allIMGs[w];
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
            if(closeup[0] != "")
            {
              for(var w = 0; w < closeup.length; w++)
              {
                  let image = document.createElement('img');
                  image.src = closeup[w];
                  image.className = "valCover";
                  let aTag = document.createElement('a');
                  aTag.href = image.src;
                  aTag.style.display = "none";
                  image.style.display = "none";   
                  aTag.appendChild(image);
                  divGalary.appendChild(aTag);
              } 
            }
            if(waterSources[0] != "")
            {
              for(var w = 0; w < waterSources.length; w++)
              {
                  let image = document.createElement('img');
                  image.src = waterSources[w];
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

            const divCol = document.createElement('div');
            divCol.className = "col-xs-3";
            const table = document.createElement('table')
            //table.style.width = "100%";
            const header_tr = document.createElement('tr')
            const td_type_header = document.createElement('th')
            const td_conf_header = document.createElement('th')
            const td_user_header = document.createElement('th')
            td_type_header.innerHTML = 'GENUS'
            td_conf_header.innerHTML = 'CONFID. LEVEL'
            td_user_header.innerHTML = 'USERS'
            header_tr.appendChild(td_type_header)
            header_tr.appendChild(td_conf_header)
            header_tr.appendChild(td_user_header)
            table.appendChild(header_tr)
            for (var index = 0; index < allValid[allKeys[k]]['TYPES'].length; index++){
              const cur_tr = document.createElement('tr')
              const td_type = document.createElement('td')
              const td_conf = document.createElement('td')
              const td_user = document.createElement('td')
              let genus = (allValid[allKeys[k]]['TYPES'][index]['UPDATED_TYPE'] === '') ? "N/A" : allValid[allKeys[k]]['TYPES'][index]['UPDATED_TYPE']
              td_type.innerHTML = genus
              td_conf.innerHTML = allValid[allKeys[k]]['TYPES'][index]['SURE']
              td_user.innerHTML = allValid[allKeys[k]]['TYPES'][index]['USER']
              console.log(allValid[allKeys[k]]['TYPES'][index])
              cur_tr.appendChild(td_type)
              cur_tr.appendChild(td_conf)
              cur_tr.appendChild(td_user)
              table.appendChild(cur_tr)
            }
            divCol.appendChild(divGalary)
            divCol.appendChild(table)
            divRow.appendChild(divCol);
        }
        $('img').mousedown(function (e) {
            if(e.button == 2) { // right click
              return false; // do nothing!
            }
        })
        document.getElementById('galary').appendChild(divRow);
    });
}