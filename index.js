const readTextFile = require('read-text-file');
const writeFile = require('write-file');
const del = require('delete');
const colors = require('colors');



const rege = new RegExp("<path .+?\/>", "ig")

let inFile = ""

del.promise(['out.txt']).then(() => {
  console.log('[Prepare]: File was deleted'.yellow)
  readTextFile.read('input.txt').then((text) => {
    console.log('[wip]: File was succesfully opened/created'.yellow)
    let _out = text.match(rege)
    _svgUpdateCount = 0
    _out.forEach(( value, index ) => {
      if (!value.includes('click')) return 0;
      console.log(`[wip]: Itration ${index} doing...`.green)
      let _name = value.match(/[A-Z]+/g)[0]
      inFile = inFile + `
        <g class = "click-line ${_name}">
          ${value.replace('stroke-width="2"', 'stroke-width="26"').replace(/stroke="[A-Z0-9#]+"/, 'stroke = "transparent"').replace(/class="click/ig, 'class = "')}
          ${value.replace('<path', '<path class = "general"').replace(/class="click (.+?)"/ig, '')}
        </g>
      `
      _svgUpdateCount = index
    })
    
    if (inFile.length > 0) {
      writeFile('out.txt', inFile, function (err) {
        if (err) return console.log(err)
        console.log(`🐬 [Final]: File is written succesful. Was updated SVG:`.blue, `${_svgUpdateCount}`.red)
      })
    }
  
  })
})
