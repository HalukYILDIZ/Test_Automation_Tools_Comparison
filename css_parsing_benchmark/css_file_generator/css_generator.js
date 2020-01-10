const fs = require('fs');

const FilePath = 'css_file_samples/'


function generateCSS(depth, tag, attributes) {
  let fileContent =`${tag}`;

  for (let i = 0; i < depth; i++) {
    fileContent += `>${tag}`;
  }

  fileContent += '{ background-color: red; }';
  fileContent += '\nbody{ background-color: blue; }';

  // console.log(fileContent);

  return fileContent;
}

// const content = generateHTML(5000, 'div', 'style= "border-color: red; border-width: 2px; border-style: solid; margin: 2px;  padding: 2px;"');
// const content = generateHTML(2000, 'div', 'style= "border-color: red; border-width: 2px; border-style: solid; margin: 2px;  padding: 2px;"');
const content = generateCSS(2000, 'div', '');

function writeHtmlFile(filePath, fileName, content) {
  fs.writeFile(filePath + '/' + fileName, content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

writeHtmlFile(FilePath, 'complex_css_selector.css', content);

