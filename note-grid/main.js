const synth = new Tone.PolySynth();

function toneInit() {
  synth.connect(Tone.Destination); //connect to speakers
}
