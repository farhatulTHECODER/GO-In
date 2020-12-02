// UI comp
const startBtn = document.createElement("button");
startBtn.innerHTML = "Start listening";
const result = document.createElement("div");
const processing = document.createElement("p");
document.write("<body><h1>My Siri</h1><p>Give it a try with 'hello', 'how are you', 'what's your name', 'what time is it', 'stop', ... </p></body>");
document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	const recognition = new SpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing ....";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `You said: ${text} </br>GO-In.Assistant said: ${response}`;
			processing.innerHTML = "";
			result.appendChild(p);

			// text to speech
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
		} else {
			processing.innerHTML = `listening: ${text}`;
		}
	}
	let listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.textContent = "Start listening";
		} else {
			recognition.start();
			startBtn.textContent = "Stop listening";
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

// processor
/*function process(rawText) {
	let text = rawText.replace(/\s/g, "");
	text = text.toLowerCase();
	let response = null;
	switch(text) {
        case "hi":
            response = "Hello"; break;
            case "whoinventedyou":
			response = "Sir,MD,FARHATUL,HUSSAIN,SK"; break;
		case "hello":
			response = "hi! how are you doing"; break;
		case "what'syourname":
			response = "My,name's,GO-In,A.I.,Assistant";  break;
		case "iloveyou":
            response = "I'm,a,robot,I,don't,have,feelings,but,i,love,you,too"; break;
            case "stop":
			response = "okBye!!,see you";
		case "whattimeisit":
            response = new Date().toLocaleTimeString(); break;
            case "whatisthetime":
            response = new Date().toLocaleTimeString(); break;
		case "stop":
			response = "okBye!!,see you";
			toggleBtn();
	}
	if (!response) {
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `I found some information for ${rawText}`;
	}
	return response;
}

*/


/*function startDictation() {
if (window.hasOwnProperty(‘webkitSpeechRecognition’)) {
var recognition = new webkitSpeechRecognition();
continuous = false;
interimResults = false;
lang = “en-US”;
start();
onresult = function(e) {
getElementById(‘transcript’).value
= e.results[0][0].transcript;
stop();
getElementById(‘GeekerMagazine’).submit();
};
onerror = function(e) {
stop();
}
}
}*/
/*function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');

    if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
    }
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
            // clear and hide result container when we press close
            container.find('.result-container').fadeOut(100, function(){$(this).empty();});
    }
}

function submitFn(obj, evt){
    value = $(obj).find('.search-input').val().trim();

    _html = "Searching for: ";
    if(!value.length){
        _html = "Ehem, I can't search nothing";
    }
    else{
        _html += "<b>" + value + "</b>";
    }

    $(obj).find('.result-container').html('<span>' + _html + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    evt.preventDefault();
}





function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
}*/