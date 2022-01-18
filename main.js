song1 = "";
song2 = "";
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;

LeftWristy = 0;
LeftWristx = 0;

RightWristy = 0;
RightWristx = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on( 'pose',gotPoses);
}
function modelLoaded() {
    console.log('Posenet is Initialzed');
} 
function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        RightWristx = results[0].pose.rightWrist.x;
        RightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + RightWristx +" rightWristY = "+ RightWristy);

        LeftWristx = results[0].pose.leftWrist.x;
        LeftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + LeftWristx +" leftWristY = "+ LeftWristy);

    }
}
function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
	stroke("#FF0000");

    if(scoreRightWrist > 0.009)
    {
        circle(RightWristx,RightWristy,20);

        if(RightWristy > 0 && RightWristy <= 500) {
            song1.play();
            song1.setVolume(1);
            song1.rate(1);   
            song2.stop();
     
    }

}
if(scoreLeftWrist > 0.009)
    {
        circle(LeftWristx,LeftWristy,20);

        if(LeftWristy > 0 && LeftWristy <= 500) {
            song2.play();
            song2.setVolume(1);
            song2.rate(1);   
            song1.stop();
     
    }

}
}
