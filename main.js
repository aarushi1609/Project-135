status= "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function start()
{
    console.log("start");
    object_input = document.getElementById("input_object").value;
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 300);
    if(status != " ")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
            accuracy = results[i].confidence*100;
            label1 = results[i].label;
            x = results[i].x;
            y = results[i].y;
            w = results[i].width;
            h = results[i].height;
            rect(x, y, w, h);

            if(objects[i].label == label1)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = "Object mentioned found.";
                synth = window.speechSynthesis;
                speakdata = new SpeechSynthesisUtterance(object_input + "has been found");
                synth.speak(speakdata);
            }
            else
            {
                document.getElementById("stauts").innerHTML = "object mentioned not found.";
            }
        }
    }
}

function gotResults(results)
{
    objects = results;
}
