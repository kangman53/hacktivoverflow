const { Tag } = require('../models')

class TagController {
  static create(name) {
    return new Promise((resolve, reject) => {
      Tag.create({
        name: name
      })
        .then(tag => {
          resolve(tag);
        })
        .catch(error => {
          reject(error);
        })
    })
  }

  static find(name) {
    console.log(name);
    
    return new Promise((resolve, reject) => {
      Tag.findOne({
        name: { $regex: new RegExp(`^${name.toLowerCase()}$`, "i") }
      })
        .then(tag => {
        console.log(tag);
        resolve(tag);
        })

        .catch(error => {
          reject(error);
        })
    })
  }

  static findAll (req, res) {
    Tag.find()
      .then(tags => {
        res.status(200).json(tags);
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static generator(tags) {
    console.log(Tag);
    
    return new Promise((resolve, reject) => {
      let promises = tags.map(t => {
        return new Promise((resolve, reject) => {
          TagController.find(t)
          .then(tag => {
            resolve(tag)
          })
          .catch(error => {
            reject(error)
          })
        })
      })
      Promise.all(promises)
      .then(results => {
        let test = results.map(async (r, i) => {
          if (r) {
            return r
          } else {
            try {
              let news = await TagController.create(tags[i]);
              return news;
            } catch (error) {
              throw error;
            }
          }
        })
        return Promise.all(test)
      })
      .then(test => {
        resolve(test);
      })
      .catch(error => {
        // console.log(error);
        
        reject(error);
      })
    })
  }
}

module.exports = TagController