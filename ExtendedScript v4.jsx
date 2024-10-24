// CTRL + F5
// ASEGURARSE DE MARCAR EL IN POINT AL INICIO DE LA SEQUENCIA

// 59.97fps = 4233600000
// 25fps =    254016000000

app.enableQE();

var project = app.project;
var sequence = project.activeSequence;
var clip = qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0);

$.writeln("Sequence: " + sequence.name);

var inPoint  = parseFloat(sequence.getInPoint());  // Obtener el punto de entrada como número
var outPoint = parseFloat(sequence.getOutPoint()); // Obtener el punto de salida como número

var timecodes = [];

var timeTicks = 254016000000;
var minCutsEach = 4; // Tiempo mínimo en segundos entre cortes
var maxCutsEach = 6; // Tiempo máximo en segundos entre cortes
var numCameras = 4;  // Número total de cámaras

// Definir pesos para cada cámara (mayor peso para la cámara prioritaria)
var weights = [3, 4, 2, 2]; // Pesos para cada cámara

// Calcular la suma total de los pesos de forma manual
var totalWeight = 0;
for (var i = 0; i < weights.length; i++) {
    totalWeight += weights[i];
}

var currentTime = inPoint;  // Comenzar desde inPoint 
var videoTrack = 0;

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

// Función para agregar un pequeño delay entre acciones (en milisegundos)
function delay(ms) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + ms) {
    }
}

// Generar puntos de tiempo para los cambios de cámara con un intervalo variable
while (currentTime <= outPoint) {
    // Seleccionar un índice de cámara basado en pesos
    var cameraIndex = getRandomCameraIndex();

    // Asegurarse de que el índice de cámara no sea el mismo que el anterior
    while (cameraIndex === previousCameraIndex) {
        cameraIndex = getRandomCameraIndex();
    }

    // Ajustar el intervalo en función del peso de la cámara seleccionada
    var weightFactor = weights[cameraIndex - 1]; // -1 porque el índice de cámara es 1-based
    var weightedInterval = (Math.random() * (maxCutsEach - minCutsEach) + minCutsEach) * (1 + weightFactor * 0.1);

    timecodes.push(currentTime);
    currentTime += weightedInterval;

    // Actualizar el índice de cámara anterior
    previousCameraIndex = cameraIndex;
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

    $.writeln("Camera: " + cameraIndex);
    $.writeln("Time: " + currentTimeCode);

    // Agregar un pequeño delay de 100 milisegundos para dar tiempo al programa de procesar
    delay(300);

    // Cambiar la cámara
    qe.project.getActiveSequence().multicam.changeCamera(cameraIndex);

    // Agregar un pequeño delay de 100 milisegundos para dar tiempo al programa de procesar
    delay(200);
}
