const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { bcrypt } = require('../helpers');

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname required'],
    minlength: [3, 'Fullname must contains minimum 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    validate: [
      {
        isAsync: true,
        validator: function(value, callback) {
          User.findOne({
              email: value,
              _id: {
                $ne: this._id
              }
            }, (err, member) => {
              if (member || err) {
                callback(false)
              } else {
                callback(true)
              }
            })
        },
        message: 'This email address is already registered'
      }
    ]
  },
  password: {
    type: String,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, 'Password must contains minimum six characters, at least one uppercase letter, one lowercase letter and one number']
  },
  tags: [
    {
      type: 'ObjectId',
      ref: 'Tag'
    }
  ]
}, {
  timestamps: {}
})

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashPassword(this.password);
  next();
})
const User = mongoose.model('User', userSchema);
module.exports = User;