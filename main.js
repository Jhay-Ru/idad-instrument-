//document.body.style.backgroundColor = "red";
const testButton = document.getElementById("test-button");

//new instrument and connect to speakers
const synth = new Tone.Synth().todestination();

testButton.addEventListener("click", playTest);
function playTest() {
  synth.triggerAttackRelease("C4", "8n"); //play note
}
