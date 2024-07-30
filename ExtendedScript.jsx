app.enableQE();

var project = app.project;
var sequence = project.activeSequence;
var clip = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0)

var inPoint  = sequence.getInPoint();
var outPoint = sequence.getOutPoint();

var timecodes = [];

var timeTicks = 254016000000
var cutsEach = 5
var numCameras = 4;

var timer = (timeTicks * cutsEach)
var videoTrack = 0

for (var t = 0; t <= outPoint; t += cutsEach){
 timecodes.push(t);
}


for (var t = 0; t < timecodes.length; t++) {

    var currentTimeCode = timer * t
    sequence.setPlayerPosition(currentTimeCode.toString());
   
    var cameraIndex = (t % numCameras) + 1
    $.writeln(cameraIndex)
    $.writeln(timecodes)
   // qe.project.getActiveSequence().timecode(timecode)
   qe.project.getActiveSequence().multicam.changeCamera(cameraIndex);
    
 

}
   // qe.project.getActiveSequence().getVideoTrackAt(videoTrack).razor(timecode);
   // qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0).setMulticam(false);
   // clip.addVideoEffect(qe.project.getVideoEffectByName ("Mosaic"))
   // qe.project.getActiveSequence().multicam.changeCamera(2);