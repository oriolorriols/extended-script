app.enableQE();

var project = app.project;
var sequence = project.activeSequence;
var clip = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0)

var inPoint  = sequence.getInPoint();
var outPoint = sequence.getOutPoint();

var timecodes = [];

var timeTicks = 254016000000;
var minCutsEach = 2;
var maxCutsEach = 4; 
var numCameras = 4;

var currentTime = 0;
var videoTrack = 0;

// Generar puntos de tiempo para los cambios de cámara con un intervalo variable
while (currentTime <= outPoint) {
    timecodes.push(currentTime);
    var randomInterval = Math.random() * (maxCutsEach - minCutsEach) + minCutsEach;
    currentTime += randomInterval;
}

// Inicializar el índice de cámara anterior para evitar repeticiones
var previousCameraIndex = -1;

// Cambiar la cámara en los puntos de tiempo definidos
for (var t = 0; t < timecodes.length; t++) {
    var currentTimeCode = timecodes[t] * timeTicks;
    sequence.setPlayerPosition(currentTimeCode.toString());

    // Generar un índice de cámara que no sea igual al índice anterior
    var baseCameraIndex = (t % numCameras) + 1; // Índice cíclico
    var randomOffset = Math.floor(Math.random() * numCameras); // Desplazamiento aleatorio
    var cameraIndex = ((baseCameraIndex + randomOffset - 1) % numCameras) + 1; // Asegura que el índice esté entre 1 y numCameras

    // Asegurarse de que el índice de cámara no sea el mismo que el anterior
    while (cameraIndex === previousCameraIndex) {
        randomOffset = Math.floor(Math.random() * numCameras);
        cameraIndex = ((baseCameraIndex + randomOffset - 1) % numCameras) + 1;
    }

    // Actualizar el índice de cámara anterior
    previousCameraIndex = cameraIndex;

    $.writeln("Cámara: " + cameraIndex);
    $.writeln("Tiempo: " + currentTimeCode);
    
    qe.project.getActiveSequence().multicam.changeCamera(cameraIndex);
}
