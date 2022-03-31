const app = require('./app')
require('./db')

console.log(process.env.MONGODB_URI)

app.listen(4000)
console.log('server on port 4000') 