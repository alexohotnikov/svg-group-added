const readTextFile = require('read-text-file');
const writeFile = require('write-file');
var colors = require('colors');



const rege = new RegExp("<path class=\"line-click\".+?\/>", "ig")

let inFile = ""

readTextFile.read('input.txt').then((text) => {
  let _out = text.match(rege)
  _out.forEach((value) =>
    inFile = inFile + `
      <g class = "line-click">
        ${value.replace('stroke-width="2"', 'stroke-width="26"').replace(/stroke="[A-Z0-9#]+"/, 'stroke = "transparent"').replace(/class="line-click"/ig, '')}
        ${value.replace('<path', '<path class = "general"').replace(/class="line-click"/ig, '')}
      </g>
    `
  )

  if (inFile.length > 0) {
    writeFile('out.txt', inFile, function (err) {
      if (err) return console.log(err)
      console.log('file is written succesful'.blue)
    })
  }

})
