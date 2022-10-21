var fs = require('fs');


function generateText(text) {
  let matches, options;
  const regEx = new RegExp(/{([^{}]+?)}/);
  
  while ((matches = regEx.exec(text)) !== null) {
      options = matches[1].split('|');
      const index = Math.floor(Math.random() * 2);
      text = text.replace(matches[0], options[index]);
  }

  return text;
}


try {  
    var data = fs.readFileSync('master-spintax.txt', 'utf8');
    const text = data.toString();    
    for(let i=0; i < 10; i ++) {
      const newText = generateText(text);
      fs.writeFile("" + i +".txt", newText, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file " + i + " was saved!");
      });
    }
} catch(e) {
    console.log('Error:', e.stack);

}

