/////
/* this is slightly more simple implementation of the previous xy controller */
/* !!important!! this only works because the xyPad has been given a CSS position property, in this case relative */
/* e.layerX or e.layerY only work when they have one (doesn't need to be relative) */
/* also important is that we've set the marker to pointer-events: none in the CSS so that we can listen for events on the pad*/
/////

// find svg elements
const svgElm = document.getElementById("SVGParent");
const xyPad = document.getElementById("xyPad");
const marker = document.getElementById("xyPosMarker");
// find text feedback elements
const xOutputText = document.getElementById("xPosOutput");
const yOutputText = document.getElementById("yPosOutput");
// find dimensions of pad : this code doesn't handle screen or element resize currently
let xyPadWidth = xyPad.getBoundingClientRect().width;
let xyPadHeight = xyPad.getBoundingClientRect().height;

function updateXYPos(e){
    // find amount of pixels from lefthand side of element
    let xPos = e.layerX;
    // work out this as a percentage by dividing by width then mult by 100
    let xPercent = (xPos / xyPadWidth) * 100;
    // same as above but for y and height
    let yPos = e.layerY;
    let yPercent = (yPos / xyPadHeight) * 100;
    // then print these to our feedback elements : using template literals
    xOutputText.textContent = `${xPos} (${parseInt(xPercent)}%)`;
    yOutputText.textContent = `${yPos} (${parseInt(yPercent)}%)`;
    // finally update our marker
    marker.setAttribute("cx", xPercent);
    marker.setAttribute("cy", yPercent);
}

// so the above function updates our text and marker - the trick to making this work is to be a bit
// tricky with our event listener : we want to also be able to hold our mouse and drag the marker around
// and we need to handle the edge case of dragging going outside of the xyPad : we can do all this with
// some thought into assigning and removing eventlisteners
xyPad.addEventListener("mousedown", (e) => {
    // so first the user holds down their mouse on the pad : we need to immediately update the pos
    updateXYPos(e);
    // we then want to also update the pos if they move the mouse around while holding down the button so we can use
    // the mousemove event
    xyPad.addEventListener("mousemove", updateXYPos);
    // however we want to stop listening for this if the mouse button is released, so we can add another eventlistener to
    // remove the mousemove one : this only works if we know the name of the function and we need to run it on the window
    // not the xy pad to catch when users move their mouse outside the box
    window.addEventListener("mouseup", function mouseUpRemove() {
        // here we remove the previous eventlistener using the removeEventListener method
        xyPad.removeEventListener("mousemove", updateXYPos);
        // then recursively remove this mouseup one too using its name
        window.removeEventListener("mouseup", mouseUpRemove);
    });
});

/////
// This is a basic scroll event listener
/////

// find our document (the web page) information as the listener runs on it instead an element : see below
const page = document.documentElement;
const body = document.body;
const scrollPercentSpan = document.getElementById("scrollPercentSpan");

// the event listener is added to the document itself, rather than an element, so I can get the page scroll position. it
// can also be applied to a single element, if that element also has a scroll bar based on overflow
// because its a scroll event we need to set it to passive - see here for more detail :
// https://stackoverflow.com/questions/37721782/what-are-passive-event-listeners
document.addEventListener('scroll', handleScroll, { passive: true });

function handleScroll(){
    scrollPercentSpan.textContent = getScrollPercent();
}

function getScrollPercent() {
    // we want to find the percentage of the page scrolled
    // scrollTop is how far it is scrolled, scrollHeight is total height : dividing one by the other gives us our percent
    // we also have to minus the height of the window (clientHeight) to account for the end of the page
    // in practice this leads to the bottom being slightly over 1.0 but it's good enough for this
    const scrollPercent = page.scrollTop / (page.scrollHeight - page.clientHeight);
    // finally we want to return this as a percentage number, so we mult by 100 then round it to whole numbers
    return parseInt(scrollPercent * 100);
}