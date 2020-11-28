const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = Schema ({
    firstName : String,
    lastName : String,
    identification : {type: Number, default : 0},
    dateBirth : String,
    residency : String,
    downtown : String,
    telephone : {type: Number, default : 0}
})

module.exports = mongoose.model('Users', UsersSchema)