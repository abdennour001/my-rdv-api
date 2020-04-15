'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  Route.get('/', 'AppointmentController.index')
  Route.post('/patient/:id', 'AppointmentController.appoint')
  Route.get('/:id', 'AppointmentController.show')
  Route.put('/:id', 'AppointmentController.update')
  Route.delete('/:id', 'AppointmentController.destroy')
})
  .prefix('appointments')

Route.group(() => {
  Route.get('/', 'PatientController.index')
  Route.post('/', 'PatientController.store')
  Route.get('/:id', 'PatientController.show')
  Route.put('/:id', 'PatientController.update')
  Route.delete('/:id', 'PatientController.destroy')
})
  .prefix('patients')