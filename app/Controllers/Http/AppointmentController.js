'use strict'

const Patient = use('App/Models/Patient')
const Appointment = use('App/Models/Appointment')

class AppointmentController {

    /**
     * Create an appointment.
     * 
     * @method appoint
     * 
     * @param {Object} request
     * @param {Object} params
     * @param {Object} response
     * 
     * @return {JSON}
     */
    async appoint({ request, params, response }) {
        // try to get the patient
        try {
            const patient = await Patient.find(params.id)
            
            // save the appointment to the database
            const appointment = await Appointment.create({
                patient_id: patient.id,
                object: request.input('object'),
                date: request.input('date'),
            })

            return response.json({
                status: 'success',
                message: 'Appointment created!',
                data: appointment,
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: error
            })
        }
    }


    /**
     * Show the appointments of this patient with ( pk='id' ).
     * 
     * @method showPatientAppointment
     * 
     * @param {Object} request
     * @param {Object} params
     * @param {Object} response
     * 
     * @return {JSON}
     */
    async showPatientAppointment({ request, params, response }) {
        // try to get the patient
        try {
            const patient = await Patient.find(params.id)
            
            const data = await patient.appointments().fetch()

            return response.json({
                status: 'success',
                data: data,
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: error
            })
        }
    }

    /**
     * Get all appointments.
     * 
     * @method index
     * 
     * @param {Object} request
     * @param {Object} response
     * 
     * @return {JSON}
     */
    async index({ request, response }) {
        return response.json({
            status: 'success',
            data: await Appointment
                .query()
                .with('patient')
                .fetch()
        })
    }


    /**
     * Get the appointment with id=params.id.
     * 
     * @method appoint
     * 
     * @param {Object} request
     * @param {Object} params
     * @param {Object} response
     * 
     * @return {JSON}
     */
    async show({ request, params, response }) {
        try {

            const appointment = await Appointment.query()
                .where('id', params.id)
                .with('patient')
                .firstOrFail()

                return response.json({
                    status: 'success',
                    data: appointment,
                })

        } catch (error) {
            return response.status(404).json({
                status: 'error',
                massage: 'Appointment not found',
            })
        }
    }

    /**
     * Update the appointment with id=params.id.
     * 
     * @method appoint
     * 
     * @param {Object} request
     * @param {Object} params
     * @param {Object} response
     * 
     * @return {JSON}
     */
    async update({ request, params, response }) {
        try {

            const appointment = await Appointment.find(params.id)

            appointment.merge({
                object: request.input('object'),
                date: request.input('date'),
            })
            
            await appointment.save()

            return response.json({
                status: 'success',
                message: 'Appointment updated!',
                data: appointment,
            })

        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Appointment not found'
            })
        }
    }

    /**
     * Delete the appointment with id=params.id.
     * 
     * @method appoint
     * 
     * @param {Object} request
     * @param {Object} params
     * @param {Object} response
     * 
     * @return {JSON}
     */
    async destroy({ request, params, response }) {
        try {
            const appointment = await Appointment.find(params.id)
            
            appointment.delete()

            return response.json({
                status: 'success',
                message: 'Appointment deleted!',
                data: appointment,
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Appointment not found'
            })
        }
    }

}

module.exports = AppointmentController
