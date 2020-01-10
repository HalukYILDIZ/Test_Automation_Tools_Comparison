const fs = require('fs');

const FilePath = 'css_file_samples/'


function generateHTML(depth, tag, attributes) {
  let fileContent ="body{ background-color: black; }";
  const hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

  for (let i = 0; i < depth; i++) {
    let colorCode = hex[Math.floor(Math.random()*16)]
    + hex[Math.floor(Math.random()*16)]
    +hex[Math.floor(Math.random()*16)]
    + hex[Math.floor(Math.random()*16)]
    +hex[Math.floor(Math.random()*16)]
    + hex[Math.floor(Math.random()*16)];
    fileContent += `\nbody{ background-color: #${colorCode}; }`
      
  }

   fileContent +="\nbody{ background-color: red; }";

  // console.log(fileContent);

  return fileContent;
}

// const content = generateHTML(5000, 'div', 'style= "border-color: red; border-width: 2px; border-style: solid; margin: 2px;  padding: 2px;"');
// const content = generateHTML(2000, 'div', 'style= "border-color: red; border-width: 2px; border-style: solid; margin: 2px;  padding: 2px;"');
const content = generateHTML(2000000, 'div', '');

function writeHtmlFile(filePath, fileName, content) {
  fs.writeFile(filePath + '/' + fileName, content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

writeHtmlFile(FilePath, 'intensive_css_rules.css', content);

