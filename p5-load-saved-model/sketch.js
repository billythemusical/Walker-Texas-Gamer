let mobeilenet;
let classifier;
let video;
var label = 'Loading Model...';
let showGrid = false;

function mobilenetReady() {
  console.log('MobileNet is ready!');
  classifier.load('model.json', customModelReady);
}

function videoReady() {
  console.log('Video is ready!!');
}

function customModelReady () {
console.log('Custom Model is ready!!');
label = 'Model Ready!';
classifier.classify(gotResults);
}

// function whileTraining(loss) {
//   if (loss == null) {
//     print('training complete');
//     classifier.classify(gotResults);
//   } else {
//     print(loss);
//   }
// }

function gotResults(error, result) {
  if (error) {
    print(error);
  } else {
    // print(results);
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  mobilenet = ml5.featureExtractor('MobileNet', mobilenetReady);
  classifier = mobilenet.classification(video, videoReady);
}


function draw() {
  background(255);
  image(video, 0, 0, width, height);
  gridLines();
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}

//toggle grid
function keyPressed() {
  if (keyCode === 71) {
    showGrid = !showGrid;
  }
  
}

function gridLines () {
 if (showGrid == true) {
    noStroke();
    fill(255,0,0,80);
    rect(width / 2 - 1, 0, 2 , height);
    rect(0, height/2 - 1, width, 2);
  }
}