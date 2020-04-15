'use strict'

const Patient = use('App/Models/Patient')
const { validate } = use('Validator')


class PatientController {

    /**
     * 
     * Get the list of patients.
     * 
     */
    async index({ request, response }) {
        return response.json({
            status: 'success',
            data: await Patient.all()
        })
    }

    /**
     * 
     * Store new patient.
     * 
     */
    async store({ request, response }) {

        const {
            firstname,
            lastname,
            address,
            phone,
            email,
            info,
        } = request.all()

        const rules = {
            firstname: 'required',
            lastname: 'required',
            address: 'required:address',
            phone: 'required|unique:patients',
            email: 'required|email|unique:patients',
            info: 'required',
        }

        const validation = await validate(request.all(), rules);
        
        if (validation.fails()) {
            return response.status(500).send(validation.messages());
        }

        const patient = new Patient()
        patient.fill({
            firstname,
            lastname,
            address,
            phone,
            email,
            info,
        })
        await patient.save()

        return response.json({
            status: 'success',
            message: 'Patient created!',
            data: patient,
        })

    }

    /**
     * 
     * Get the patient with id=params.id.
     * 
     */
    async show({ request, params, response }) {
        try {

            const patient = await Patient.query()
                .where('id', params.id)
                .with('appointments')
                .firstOrFail()

                return response.json({
                    status: 'success',
                    data: patient,
                })

        } catch (error) {
            return response.status(404).json({
                status: 'error',
                massage: 'Patient not found',
            })
        }
    }

    /**
     * 
     * Update the patient with id=params.id.
     * 
     */
    async update({ request, params, response }) {

        const {
            firstname,
            lastname,
            address,
            phone,
            email,
            info,
        } = request.all()

        const rules = {
            firstname: 'required',
            lastname: 'required',
            address: 'required:address',
            phone: 'required|unique:patients',
            email: 'required|email|unique:patients',
            info: 'required',
        }

        const validation = await validate(request.all(), rules);
        
        if (validation.fails()) {
            return response.status(500).send(validation.messages());
        }

        try {

            const patient = await Patient.find(params.id)

            patient.merge({
                firstname,
                lastname,
                address,
                phone,
                email,
                info,
            })
            
            await patient.save()

            return response.json({
                status: 'success',
                message: 'Patient updated!',
                data: patient,
            })

        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Patient not found'
            })
        }
    }

    /**
     * 
     * Delete the patient with id=params.id.
     * 
     */
    async destroy({ request, params, response }) {
        try {
            const patient = await Patient.find(params.id)
            
            patient.delete()

            return response.json({
                status: 'success',
                message: 'Patient deleted!',
                data: patient,
            })
        } catch (error) {
            return response.status(404).json({
                status: 'error',
                message: 'Patient not found'
            })
        }
    }

    /**
     * 
     * Add an appointment to the user.
     * 
     */
    async addAppointment() {

    }

}


module.exports = PatientController
