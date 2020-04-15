'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Appointment extends Model {

    patient() {
        return this.belongsTo('App/Models/Patient')
    }

}

module.exports = Appointment
