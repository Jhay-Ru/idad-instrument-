//when browser loads > load dialog

const introDialog = document.getElementById("Intro-dialog"); //get dialog element
const introButtonClose = document.getElementById("Intro-button-close"); //get close button element

const key = document.getElementById("key-test");
//console.log(introDialog); //tester debugger
introDialog.showModal(); //show dialog

/// is the mouse btn being held?      ///test key
let mouseButtonDown = false;

key.addEventListener("click", function () {
  playTest();
});

introButtonClose.addEventListener("click", function closeIntroDialog() {
  //you can put a function directly into the event listener
  introDialog.close(); //close dialog
});

introDialog.addEventListener("close", toneInit); //when user click close, load audio
//closeIntroDialog.addEventListener("click", ()=> {IntroDialog.close();}); //you can also use an arrow function

//--- sound player from button ---

//// audio
const testButton = document.getElementById("test-button");

//new instrument and connect to speakers
const synth = new Tone.PolySynth(); //polysynth to play multiple notes at once

function toneInit() {
  synth.connect(Tone.Destination); //connect to speakers
}

// testButton.addEventListener("click", function(e){
//   console.log(e)
//   playTest("C4");
// });
// function playTest(note) {
//   synth.triggerAttackRelease(note, "8n"); //play note
// }
// key.addEventListener("click", function () {
//   playTest("C4");
// });

function playNote(e) {
  // find the element that the event ran on
  let keyPressed = e.target;
  console.log(keyPressed);
  // find the data-note attribute of that element
  let note = keyPressed.dataset.note;
  console.log(note);
  synth.triggerAttackRelease(note, "8n"); //play note
}
testButton.addEventListener("mousedown", playNote);
key.addEventListener("mousedown", playNote);

testButton.addEventListener("mousedown", playnote);
