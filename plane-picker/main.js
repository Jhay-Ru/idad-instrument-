// 1. Initialize Tone.js Synth
const synth = new Tone.Synth().toDestination();

// Base root note (e.g., C4)
const BASE_NOTE = "C4";

const pad = document.getElementById("pad");
const dot = document.getElementById("dot");
const xVal = document.getElementById("x-val");
const yVal = document.getElementById("y-val");

let isDragging = false;
let currentNote = BASE_NOTE;

function updatePosition(e) {
  const rect = pad.getBoundingClientRect();

  let mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  let mouseY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

  // Visual dot placement
  dot.style.left = `${(mouseX / rect.width) * 100}%`;
  dot.style.top = `${(mouseY / rect.height) * 100}%`;

  // Normalized values (-1 to 1)
  const normX = (mouseX / rect.width) * 2 - 1;
  const normY = ((mouseY / rect.height) * 2 - 1) * -1; // Invert so top is positive

  const baseFreq = Tone.Frequency("C4").toFrequency();
  // Y: -6 to +6 Semitones (half steps)

  const totalSemitones = normX * 24 + normY * 6;

  // Total semitone offset relative to base note
  const currentFreq = baseFreq * Math.pow(2, totalSemitones / 12);

  // Calculate new target frequency string/note
  const calculatedNote = Tone.Frequency(BASE_NOTE)
    .transpose(totalSemitones)
    .toNote();

  // Output values to HTML display
  xVal.textContent = `Freq: ${currentFreq.toFixed(1)} Hz`;
  yVal.textContent = `Offset: ${totalSemitones.toFixed(2)} semitones`;
  // Update pitch continuous sound if note changes while dragging
  if (isDragging && calculatedNote !== currentNote) {
    currentNote = calculatedNote;
    synth.setNote(currentNote); // Smoothly glides/changes pitch without re-triggering attack
  }
}

// Event Listeners
pad.addEventListener("pointerdown", async (e) => {
  await Tone.start();
  isDragging = true;
  pad.setPointerCapture(e.pointerId);

  // Trigger initial note attack on press
  updatePosition(e);
  synth.triggerAttack(currentNote);
});

pad.addEventListener("pointermove", (e) => {
  if (isDragging) updatePosition(e);
});

pad.addEventListener("pointerup", (e) => {
  isDragging = false;
  pad.releasePointerCapture(e.pointerId);

  // Release note on drag end
  synth.triggerRelease();
});

//second pad //

const synth2 = new Tone.Synth().toDestination();

const pad2 = document.getElementById("pad2");
const dot2 = document.getElementById("dot2");
const xVal2 = document.getElementById("x-val2");
const yVal2 = document.getElementById("y-val2");

let isDragging2 = false;

function updatePosition2(e) {
  const rect = pad2.getBoundingClientRect();

  let mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  let mouseY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

  // Visual dot placement
  dot2.style.left = `${(mouseX / rect.width) * 100}%`;
  dot2.style.top = `${(mouseY / rect.height) * 100}%`;

  // Normalized coordinates (-1 to 1)
  const normX = (mouseX / rect.width) * 2 - 1;
  const normY = ((mouseY / rect.height) * 2 - 1) * -1;

  // Pitch calculation
  const baseFreq = Tone.Frequency("C4").toFrequency();
  const totalSemitones = normX * 24 + normY * 6;
  const currentFreq = baseFreq * Math.pow(2, totalSemitones / 12);

  // Update text content indicators
  xVal2.textContent = `Freq: ${currentFreq.toFixed(1)} Hz`;
  yVal2.textContent = `Offset: ${totalSemitones.toFixed(2)} semitones`;

  // Real-time audio pitch update
  if (isDragging2) {
    synth2.setNote(currentFreq);
  }
}

// Event Listeners for Pad 2
pad2.addEventListener("pointerdown", async (e) => {
  await Tone.start();
  isDragging2 = true;
  pad2.setPointerCapture(e.pointerId);

  updatePosition2(e);

  // Calculate starting frequency directly for instant sound trigger
  const rect = pad2.getBoundingClientRect();
  let mouseX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  let mouseY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
  const normX = (mouseX / rect.width) * 2 - 1;
  const normY = ((mouseY / rect.height) * 2 - 1) * -1;
  const startFreq =
    Tone.Frequency("C4").toFrequency() *
    Math.pow(2, (normX * 24 + normY * 6) / 12);

  synth2.triggerAttack(startFreq);
});

pad2.addEventListener("pointermove", (e) => {
  if (isDragging2) updatePosition2(e);
});

pad2.addEventListener("pointerup", (e) => {
  isDragging2 = false;
  pad2.releasePointerCapture(e.pointerId);
  synth2.triggerRelease();
});
