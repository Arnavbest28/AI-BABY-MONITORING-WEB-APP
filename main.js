var img1 = "";
var status = "";
var objects = [];
var objectDetector1 = "";
var song1 = "";
var ans = "";


function preload() {
}

function setup() {
    canvas = createCanvas(600, 400)
    canvas.center();

    objectDetector1 = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status=>> Object Is Detecting";

    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 400);
}

function modelLoaded() {

    console.log("Cocossd Model Is Loaded");
    status = true;
    objectDetector1.detect(video, gotResult);
}




function draw() {
    image(video, 0, 0, 600, 400);

    if (status != "") {
        objectDetector1.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status=>> Object Detected";
            percentage = Math.floor(objects[i].confidence * 100) + "%";

            fill(r, g, b);
            textSize(17);
            text(objects[i].label + percentage, objects[i].x, objects[i].y);

            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById('baby5').innerHTML = "BABY IS FOUND";
            } else if (objects[i].label != "person") {
                    document.getElementById('baby5').innerHTML = "BABY IS NOT FOUND";
            
                }
            }
        }
    }




function gotResult(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}