app.enableQE();

var project = app.project;
var sequence = project.activeSequence;
var clip = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0)

var inPoint  = sequence.getInPoint();
var outPoint = sequence.getOutPoint();

var timecodes = [];

var timeTicks = 254016000000;
var minCutsEach = 3; // Tiempo mínimo en segundos entre cortes
var maxCutsEach = 7; // Tiempo máximo en segundos entre cortes
var numCameras = 4;  // Número total de cámaras

// Definir pesos para cada cámara (mayor peso para la cámara prioritaria)
var weights = [1, 1, 1, 1]; // Pesos para cada cámara

// Calcular la suma total de los pesos
var totalWeight = 0;
for (var i = 0; i < weights.length; i++) {
    totalWeight += weights[i];
}

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

// Función para seleccionar un índice de cámara basado en pesos
function getRandomCameraIndex() {
    var randomWeight = Math.random() * totalWeight;
    var weightSum = 0;
    for (var i = 0; i < numCameras; i++) {
        weightSum += weights[i];
        if (randomWeight <= weightSum) {
            return i + 1; // +1 porque el índice de cámara es 1-based
        }
    }
}

// Cambiar la cámara en los puntos de tiempo definidos
for (var t = 0; t < timecodes.length; t++) {
    var currentTimeCode = timecodes[t] * timeTicks;
    sequence.setPlayerPosition(currentTimeCode.toString());

    // Seleccionar un índice de cámara basado en pesos
    var cameraIndex = getRandomCameraIndex();

    // Asegurarse de que el índice de cámara no sea el mismo que el anterior
    while (cameraIndex === previousCameraIndex) {
        cameraIndex = getRandomCameraIndex();
    }

    // Actualizar el índice de cámara anterior
    previousCameraIndex = cameraIndex;

    $.writeln("Cámara: " + cameraIndex);
    $.writeln("Tiempo: " + currentTimeCode);
    
    qe.project.getActiveSequence().multicam.changeCamera(cameraIndex);
}
