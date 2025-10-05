// Map button IDs to target URLs
const buttonLinks = {
    ttb: "../ttb/",           // Text To TextBlocks page
    sg: "../shg/",   // Shape Generator page
    cg: "../cg/",
    rtb: "../rtb/",// Read Text Blocks page
    other: "../other/"  // Other tools page
};

// Attach click events to each button
Object.keys(buttonLinks).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener("click", () => {
            window.location.href = buttonLinks[id];
        });
    }
});
