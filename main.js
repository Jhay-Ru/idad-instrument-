//when browser loads > load dialog

const introDialog = document.getElementById("Intro-dialog"); //get dialog element
const introButtonClose = document.getElementById("Intro-button-close"); //get close button element

//console.log(introDialog); //tester debugger
introDialog.showModal(); //show dialog

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
const synth = new Tone.Synth();

function toneInit() {
  synth.connect(Tone.Destination); //connect to speakers
}

testButton.addEventListener("click", playTest);
function playTest() {
  synth.triggerAttackRelease("C4", "8n"); //play note
}
