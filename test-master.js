var fs = require('fs');

function generateAllCombinations(text) {
    let res = [];
    generateTexts(text, res);
    return res;
}
  
function generateTexts(text, results) {
  if (results.length > 10) {
    return;
  }
  let matches, options;
  const regEx = new RegExp(/{([^{}]+?)}/);
  
  if ((matches = regEx.exec(text)) !== null) {
      options = matches[1].split('|');
      for(let i=0; i<options.length; i++){
          generateTexts(text.replace(matches[0], options[i]), results);
      }
  } else if(!results.includes(text)){
    const x = Math.floor(Math.random() * 100000000);
    if(x<=10){
      results.push(text);
    }
    
  }
}


try {  
    var data = fs.readFileSync('master-spintax.txt', 'utf8');
    const text = data.toString();    
    const allCombinations = generateAllCombinations(text);
    // console.log(allCombinations)
    // console.log(allCombinations.length);
    for(let i=0; i < allCombinations.length; i ++){
      fs.writeFile("" + i +".txt", allCombinations[i], function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
} catch(e) {
    console.log('Error:', e.stack);

}

