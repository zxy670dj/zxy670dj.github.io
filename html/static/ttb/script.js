function textToBlocks(text, y_offset, spacing = 0.5, bold = false, x_offset = 0, bold_copies = 16) {
    let blocks = [];
    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        let x = x_offset + i * spacing;
        let block = `13,0,${x},0,${y_offset},${ch.charCodeAt(0)}`;
        if (bold) {
            for (let b = 0; b < bold_copies; b++) blocks.push(block);
        } else {
            blocks.push(block);
        }
    }
    return blocks.join(";");
}

function parseRichText(line) {
    let segments = [];
    let bold = false, strike = false, underline = false;
    let buf = '';
    let i = 0;

    while (i < line.length) {
        let two = line.slice(i, i+2);
        if (two === "**") {
            if (buf) segments.push({text: buf, bold, strike, underline});
            buf = ''; bold = !bold; i += 2;
        } else if (two === "~~") {
            if (buf) segments.push({text: buf, bold, strike, underline});
            buf = ''; strike = !strike; i += 2;
        } else if (two === "__") {
            if (buf) segments.push({text: buf, bold, strike, underline});
            buf = ''; underline = !underline; i += 2;
        } else {
            buf += line[i]; i++;
        }
    }
    if (buf) segments.push({text: buf, bold, strike, underline});
    return segments;
}

function multilineTTB(text, spacing = 0.5, gap = 1, bold_copies = 16) {
    let lines = text.split("\n");
    let allBlocks = [];

    lines.forEach((line, row) => {
        if (!line.trim()) return;
        let y = row * gap;
        let current_x = 0;
        let segments = parseRichText(line);

        segments.forEach(seg => {
            let seg_len = seg.text.length;

            // Strikethrough
            if (seg.strike) {
                let dashLine = '-'.repeat(seg_len);
                allBlocks.push(textToBlocks(dashLine, y, spacing, false, current_x, bold_copies));
            }
            // Underline
            if (seg.underline) {
                let underlineLine = '_'.repeat(seg_len);
                allBlocks.push(textToBlocks(underlineLine, y + 0.1, spacing, false, current_x, bold_copies));
            }
            // Actual text
            allBlocks.push(textToBlocks(seg.text, y, spacing, seg.bold, current_x, bold_copies));

            current_x += seg_len * spacing;
        });
    });

    return allBlocks.join(";") + "???";
}

// Event listener
document.getElementById("convertBtn").addEventListener("click", () => {
    let inputText = document.getElementById("inputText").value;
    let spacing = parseFloat(document.getElementById("spacingInput").value);
    document.getElementById("outputText").value = multilineTTB(inputText, spacing);
});

document.getElementById("copy").addEventListener("click", () => {
    const output = document.getElementById("outputText");
    output.select();
    output.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(output.value)
        .then(() => alert("Copied to clipboard!"))
        .catch(err => alert("Failed to copy: " + err));
});
document.getElementById("backBtn").addEventListener("click", () => {
    // Go back to the main page
    window.location.href = "../main/index.html"; 
});
