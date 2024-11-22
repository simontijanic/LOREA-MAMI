const mongoose = require('mongoose');

const formModel = mongoose.Schema({
    epost: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@afk.no$/, "Ikke en gyldig epost! Bruk afk-eposten din"],
        validate: {
            validator: async function() {
                let docs = await this.constructor.find({date: this.date});
                let doc = docs.find(element => element.date == this.date && element.epost == this.epost);
                return !doc;
            },
            message: 'Svar allerede angitt for denne eposten på denne datoen!'
        }
    },
    svar: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    }
});

const Form = mongoose.model('Form', formModel);

module.exports = Form;

//ok model is document, nå er det formController.js

