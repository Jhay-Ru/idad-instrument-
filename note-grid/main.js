// const synth = new Tone.PolySynth();

// function toneInit() {
//   synth.connect(Tone.Destination); //connect to speakers
// }

const synth = new Tone.Synth().toDestination();
const keys = document.querySelectorAll(".key"); //selects all keys

keys.forEach((key) => {
  key.addEventListener("click", async () => {
    await Tone.start();

    // Pull the exact note string from data-note
    const note = key.dataset.note;

    if (note) {
      synth.triggerAttackRelease(note, "8n"); //
    }
  });
});
