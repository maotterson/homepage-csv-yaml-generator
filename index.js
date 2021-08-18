const fs = require('fs')
const csv = require('csv-parser')

const csvPath = 'skills.csv'
const ymlFolder = './ymls/'

function generateYMLs(){
  fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    generateCurrentYML(row)
  })
  .on('end', () => {
    console.log('end of file')
  })
}

function generateCurrentYML(row){
  const stream = fs.createWriteStream(ymlFolder + row.title + '.yml')
  stream.on('open', () => {
    Object.keys(row).forEach(key=>{
      stream.write(key + ": " + row[key] + '\n')
    })
    stream.end()
  })
}

generateYMLs()