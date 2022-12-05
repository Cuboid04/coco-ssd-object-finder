var img="";
var status="";
var object=[];
var object_name="";
function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status : Dectecting Object...";
    object_name=document.getElementById("object_name").value;
}
function modelloaded(){
    console.log("Model Loaded");
    status=true;
}
function gotresult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
function preload(){
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotresult);
        for(i=0;i< object.length ; i++){
            if(object[i].label == object_name){
                document.getElementById("status").innerHTML="Status : Object Detected";
                document.getElementById("detected_object_name").innerHTML="Object found";
            }
            else{
                document.getElementById("status").innerHTML="Status : Object Not Detected";
                document.getElementById("detected_object_name").innerHTML="Object Not Found";
            }
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+ percent+"%", object[i].x + 15, object[i].y+15);
            noFill();
            stroke(r,b,g);
            rect(object[i].x, object[i].y , object[i].width, object[i].height);
        }
    }

}