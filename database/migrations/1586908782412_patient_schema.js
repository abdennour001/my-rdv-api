'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up () {
    this.create('patients', (table) => {
      table.increments()

      table.string('firstname', 80).notNullable()
      table.string('lastname', 80).notNullable()
      table.string('address', 254).notNullable()
      table.string('phone', 25).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.text('info')

      table.timestamps()
    })
  }

  down () {
    this.drop('patients')
  }
}

module.exports = PatientSchema
