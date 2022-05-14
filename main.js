video = "";
stas = "";
obj = "";
object = "";
speech = "";
function preload(){
video = createCapture();
perc = 0;
}
function setup(){
canvas = createCanvas(500, 400);
canvas.center();
video.hide(); 
}
function start(){
    ryry = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("stats").innerHTML = "Status : Detecting Objects";
    if(document.getElementById(objname) == obj){
      video = webcamLiveView.stop();
      objectDetector.detect(gotresults);
      speak_data = "the object is " + (document.getElementById(objname));
    utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
    }


    else{
        speak_data = "the object is not a" + (document.getElementById(objname));
        utterthis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterthis);    }
}

function modelloaded(){
    console.log("modelloaded");
    stas = true
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
image(video, 0, 0, 500, 400);
if(stas != ""){
ryry.detect(video, gotresults);
for(i=0; i<obj.length; i++){
document.getElementById("objno").innerHTML = "Number of objects detected are "+ obj.length;
document.getElementById("stats").innerHTML = "Status : Objects Detected";
fill('#FFFFFF');
perc = Math.floor(obj[i].confidence *100);
text(obj[i].label + " " + perc + "%", obj[i].x, obj[i].y);
nofill();       
stroke('#000000');
rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
}
}
}

function gotresults(error, result){
    if(error){
        console.log(error);
    }
    else{console.log(result)};
    obj = result
}