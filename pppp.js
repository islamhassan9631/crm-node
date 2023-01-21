const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
doc
  
  .fontSize(25)
  .text(JSON.stringify({price:"20"}), 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally


// Add another page

// Draw a triangle


// Apply some transforms and render an SVG path with the 'even-odd' fill rule


// Add some text with annotations

// Finalize PDF file
doc.end();