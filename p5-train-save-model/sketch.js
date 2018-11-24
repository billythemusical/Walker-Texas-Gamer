/* 
training one dice first, 6 possbilities 
want to try to filter out colors as well as
take a difference analysis between beginning image and image with dice
*/

let mobeilenet;
let classifier;
let video;
var label = 'nothing yet...';
let oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton;
let showGrid = false;
let numClasses = 6;
// var diceNumber1 = 1; 
// var diceNumber2 = 1;
let diceArray = [];

function modelReady() {
  console.log('Model is ready!');
  // mobilenet.predict(puffin);
}

function videoReady() {
  console.log('Video is ready!!');
}

function whileTraining(loss) {
  if (loss == null) {
    print('training complete');
    classifier.classify(gotResults);
  } else {
    print(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    print(error);
  } else {
    // print(results);
    label = result;
    classifier.classify(gotResults);
  }
}

function showImageInfo () {
print();
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  for (let i = 0; i < numClasses; i++) {
  	diceArray.push(i + 1);
  	// print(diceArray);
  }

  oneButton = createButton('one');
  oneButton.mousePressed(function() {
    classifier.addImage('one');
  });

  twoButton = createButton('two');
  twoButton.mousePressed(function() {
    classifier.addImage('two');
  });

  threeButton = createButton('three');
  threeButton.mousePressed(function() {
    classifier.addImage('three');
  });

  fourButton = createButton('four');
  fourButton.mousePressed(function() {
    classifier.addImage('four');
  });
  
  fiveButton = createButton('five');
  fiveButton.mousePressed(function() {
  classifier.addImage('five');
  });

  sixButton = createButton('six');
  sixButton.mousePressed(function() {
    classifier.addImage('six');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });
  
  saveButton = createButton('save');
  saveButton.mousePressed(function() {
    classifier.save();
  });

  /* one try for making training buttons 

  for (let i = 1; i <= numClasses; i++) {
  	Button = createButton(diceNumber1 + ' : ' + diceNumber2);
  	Button.mousePressed(function() {
    classifier.addImage(diceNumber1 + ' : ' + diceNumber2);
  	});
  if (i % 6 == 0 && i > 0) {
        diceNumber1++;

      }
    if (diceNumber2 < 6) {
        diceNumber2++;
      } else {
        diceNumber2 = 1;
      }
  } 
  */
 
 /* another try for making buttons using forEach
 but I could not get the classifier.addImage(????) feature
 to work in this way

  diceArray.forEach(function(element) {
  Button = createButton(element);
  Button.mousePressed(function() {
  	classifier.addImage(element, showImageInfo);
	})
 });

 */

}


function draw() {
  background(255);
  //display the video
  image(video, 0, 0, width, height);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);

  //drawing the grid for aligning the camera
  if (showGrid == true) {
    noStroke();
    fill(255,0,0,90);
    rect(width / 2 - 1, 0, 2 , height);
    rect(0, height/2 - 1, width, 2);
  }

}

//toggle grid for aligning camera by pressing 'g' key
function keyPressed() {
  if (keyCode === 71) {
    showGrid = !showGrid;
  }
}