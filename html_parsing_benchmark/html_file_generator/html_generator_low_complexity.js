const fs = require('fs');

const FilePath = 'html_file_samples/'


function generateHTML(depth, tag, attributes) {
  let fileContent ="";

  for (let i = 0; i < depth; i++) {
    fileContent +=
      `\n
<${tag} ${attributes} ${(i===(depth-1))? 'id="theElement"':""}>

</${tag}>
`;
  }

  // console.log(fileContent);

  return fileContent;
}

// const content = generateHTML(5000, 'div', 'style= "border-color: red; border-width: 2px; border-style: solid; margin: 2px;  padding: 2px;"');
// const content = generateHTML(2000, 'div', 'style= "border-color: red; border-width: 2px; border-style: solid; margin: 2px;  padding: 2px;"');
const content = generateHTML(2000, 'div', '');

function writeHtmlFile(filePath, fileName, content) {
  fs.writeFile(filePath + '/' + fileName, content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

writeHtmlFile(FilePath, 'low_complexity_html.html', content);

