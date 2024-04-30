var phoneticAlphabet = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu"];

var index1 = 0;
var index2 = 0;
var index3 = 0;

var count = 0;

function getStarRating(lastThreeLetters) {
    if (lastThreeLetters.length !== 3) {
        return "";
    }

    const index1 = lastThreeLetters.charAt(0);
    const index2 = lastThreeLetters.charAt(1);
    const index3 = lastThreeLetters.charAt(2);

    if (index1 === index2 && index2 === index3) {
        return " 🟢 🟢 🟢";
    }
    else if (index2 === index3) {
        return " ⚫️ 🟢 🟢";
    }
    else if (index1 === index2) {
        return " 🟢 🟢 ⚫️";
    }
    else if (index1 === index3) {
        return " 🟢 ⚫️ 🟢";
    }
    else {
        return "";
    }
}


function checkCallSign(callSign) {
  var xhr = new XMLHttpRequest();
  var searchText = "KULLANILABİLİR"; // Aranacak kelime
  xhr.open("POST", "https://www.kiyiemniyeti.gov.tr/ehizmetler/telsiz_cagri_isareti_sorgula");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function() {
    if (xhr.status === 200) {
      var responseText = xhr.responseText;
      if (responseText.indexOf(searchText) !== -1) {
        var lastThreeLetters = callSign.slice(-3); // Son 3 harfi al
        var phoneticLastThreeLetters = lastThreeLetters.split('').map(function(letter) {
          return phoneticAlphabet[letter.charCodeAt(0) - 65]; // Harfi fonetik alfabede bul ve dizi içinden al
        });
          
        count++;
        console.log(callSign + " ✅ (" + phoneticLastThreeLetters.join(', ') + ")" + getStarRating(lastThreeLetters));
        nextCallsign();
      } else {
        //console.log(callSign + " ❌");
        nextCallsign();
      }
    }
  };
  xhr.onerror = function() {
    //console.error('Request failed');
  };
  xhr.send("CallSign=" + callSign);
}

function nextCallsign() {

    var nextLetters = String.fromCharCode(65 + index1 % 26) + String.fromCharCode(65 + index2 % 26) + String.fromCharCode(65 + index3 % 26);
    
  if (nextLetters === "QAA") {
    index1++;
    nextCallsign();
    return;
  }
       
  if (nextLetters === "ZZZ") {
    console.log("total: " + count);
    return;
  }  
    
  index3++;
    
  if (index3 % 26 === 0) {
    index2++;
    index3 = 0;
  }
    
  if (index2 % 26 === 0 && index3 === 0) {
    index1++;
    index2 = 0;
  }
    
  if (index1 % 26 === 0 && index2 === 0 && index3 === 0) {
    index1 = 0;
  }

    checkCallSign("TA1" + nextLetters);
    
};

setTimeout(nextCallsign, 5000);
