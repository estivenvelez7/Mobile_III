const express = require('express')
let app = express()
const moongose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors({ origin: true }));
app.use(express.json())
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Se importa el esquema 
const Users = require('./models/users')
const { db } = require('./models/users')
const { request } = require('express')

app.post('/createUser', (req, res) => {
  const { firstName, lastName, identification, dateBirth, residency, downtown, telephone } = req.body;
  const telephoneNumber = parseInt(req.body.telephone);
  const identificationNumber = parseInt(req.body.identification);

  if (firstName && lastName && identification && dateBirth && residency && downtown && telephoneNumber) {
    if (typeof (telephoneNumber) == "string" || isNaN(telephoneNumber)) {
      res.send("The_telephone_not_is_a_number_value.")
    } else {
      if (!/^\d{10}$/.test(telephoneNumber)) {
        res.send("Telephone_must_have_10_digits");
      } else {
        if (typeof (identificationNumber) == "string" || isNaN(identificationNumber)) {
          res.send("The_identification_not_is_a_number_value.")
        } else {
          //Done
          let users = new Users()
          users.firstName = req.body.firstName
          users.lastName = req.body.lastName
          users.identification = identificationNumber
          users.dateBirth = req.body.dateBirth
          users.residency = req.body.residency
          users.downtown = req.body.downtown
          users.telephone = telephoneNumber

          users.save((err, userSave) => {
            if (err) res.status(500).send({ messsage: `Save error : ${err}` })
            res.status(200).send({ users: userSave })
          })
        }
      }
    }
  } else {
    const respErr = "Enter_all_data_or_check_the_format";
    res.send(respErr);
  }
});

app.get('/get', (req, res) => {
  Users.find({}, (err, users) => {
    if (err) return res.status(500).send({
      message: `Error when requesting: ${err}`
    })

    if (!users) return res.status(404).send({
      message: 'There are no product'
    })
    res.status(200).send({ users })
  })
});


app.delete('/deleteUser/:id', async (req, res) => {
  let id = req.params.id
  Users.findById(id, (err, users) => {
    if (err) return res.status(500).send({
      message: `Error deleting: ${err}`
    })

    if (!users) return res.status(404).send({
      message: 'Product does not exist'
    })

    users.remove(err => {
      if (err) return res.status(500).send({
        message: `Error deleting: ${err}`
      })
      res.status(200).send({
        message: 'Product removed'

      })
    })
  })

})

app.put("/updateUser/:id", (req, res) => {
  let userId = req.params.id
  let updateData = req.body
  const telephoneNumber = parseInt(req.body.telephone);
  const identificationNumber = parseInt(req.body.identification);
  const { firstName, lastName, dateBirth, residency, downtown, identification } = req.body;
  if (
    userId &&
    firstName &&
    lastName &&
    identification &&
    dateBirth &&
    residency &&
    downtown &&
    telephoneNumber
  ) {
    if (typeof telephoneNumber == "string" || isNaN(telephoneNumber)) {
      res.send("Telephone_dont_have_the_format.");
    } else {
      if (!/^\d{10}$/.test(telephoneNumber)) {
        res.send("Telephone_must_have_10_digits");
      } else {
        if (typeof (identificationNumber) == "string" || isNaN(identificationNumber)) {
          res.send("The_identification_not_is_a_number_value.")
        } else {
          Users.findByIdAndUpdate(userId, updateData, (err, productUpdated) => {
            if (err) return res.status(500).send({
              message: `Failed to update data: ${err}`
            })
            res.status(200).send({ product: productUpdated })
            console.log("Updated.");
          })
        }
      }
    }
  } else {
    // Failed
    const respErr = "Enter_all_data_or_check_the_format";
    res.send(respErr);
  }
});



moongose.connect('mongodb://localhost:27017/users', (err, res) => {

  if (err) throw err
  console.log('Database connection OK!')

  const server = app.listen(port, () => {
    console.log(`Listening http://localhost:${server.address().port}`)
  })

})