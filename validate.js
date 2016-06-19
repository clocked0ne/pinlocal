'use strict';

// dd/mm/yyyy regex (including leap years): http://stackoverflow.com/a/20773444
const dateRegex = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/g;
const validate  = require('validator');

const validation = function (fields, callback){
	const requiredFields = [];

	if (!fields.formType)
		requiredFields.push('formType');
	if (!fields.firstName)
		requiredFields.push('firstName');
	if (!fields.lastName)
		requiredFields.push('lastName');
	if (!fields.email)
		requiredFields.push('email');
	if (!fields.phone)
		requiredFields.push('phone');
	if (!fields.addressLine1)
		requiredFields.push('addressLine1');
	if (!fields.addressLine2)
		requiredFields.push('addressLine2');
	if (!fields.city)
		requiredFields.push('city');
	if (!fields.postCode)
		requiredFields.push('postCode');
	// If Domestic Removals formType also check for required field no_of_bedrooms
	if(fields.formType && parseInt(fields.formType) === 35){
		if (!fields.no_of_bedrooms)
			requiredFields.push('no_of_bedrooms');
	}
	if (!fields.to_city)
		requiredFields.push('to_city');
	if (!fields.moving_date)
		requiredFields.push('moving_date');
	if (requiredFields.length)
		return callback({ error: 'Missing required fields', fields: requiredFields }, null);

	const validationErrors = [];

	if (!validate.isInt(fields.formType, { min: 35, max: 37 }))
		validationErrors.push('formType must be either 35, 36 or 37');
	if (!validate.isEmail(fields.email))
		validationErrors.push('email must be a valid email address');
	if (!validate.isNumeric(fields.phone) && !validate.isLength(fields.phone, { min: 10 }))
		validationErrors.push('phone must be a number least 10 characters long');
	if (!validate.isAlphanumeric(fields.postCode.replace(' ','')) || !validate.isLength(fields.postCode, { min: 3 }))
		validationErrors.push('postCode must be at least 3 characters long');
	if (fields.from_property_type && !validate.isIn(fields.from_property_type, ['House','Apartment / Flat','Bungalow']))
		validationErrors.push('from_property_type must be one of House, Apartment / Flat, Bungalow');
	if(fields.from_floor && fields.from_property_type=='Apartment / Flat'){
		if (!validate.isIn(fields.from_floor + '', ['1','2','3','4','5+']))
			validationErrors.push('from_floor must be one of 1, 2, 3, 4, 5+');
	}
	if (fields.to_property_type && !validate.isIn(fields.to_property_type, ['House','Apartment / Flat','Bungalow']))
		validationErrors.push('to_property_type must be one of House, Apartment / Flat, Bungalow');
	if(fields.to_floor && fields.to_property_type=='Apartment / Flat'){
		if (!validate.isIn(fields.to_floor + '', ['1','2','3','4','5+']))
			validationErrors.push('to_floor must be one of 1, 2, 3, 4, 5+');
	}
	if (fields.lift_available && !validate.isIn(fields.lift_available, ['Yes','No']))
		validationErrors.push('lift_available must either Yes or No');
	if (fields.from_lift_available && !validate.isIn(fields.from_lift_available, ['Yes','No']))
		validationErrors.push('from_lift_available must either Yes or No');
	if (fields.to_lift_available && !validate.isIn(fields.to_lift_available, ['Yes','No']))
		validationErrors.push('to_lift_available must either Yes or No');
	if (fields.no_of_bedrooms && !validate.isIn(fields.no_of_bedrooms + '', ['1','2','3','4','5+']))
		validationErrors.push('no_of_bedrooms must be one of 1, 2, 3, 4, 5+');
	if (fields.packing_service && !validate.isIn(fields.packing_service, ['Yes','No','Not sure']))
		validationErrors.push('packing_service must either Yes, No or Not sure');
	if (fields.assembly_service && !validate.isIn(fields.assembly_service, ['Yes','No','Not sure']))
		validationErrors.push('assembly_service must either Yes, No or Not sure');
	if (fields.storage_service && !validate.isIn(fields.storage_service, ['Yes','No','Not sure']))
		validationErrors.push('storage_service must either Yes, No or Not sure');
	if (fields.parking_available && !validate.isIn(fields.parking_available, ['Yes','No']))
		validationErrors.push('parking_available must either Yes or No');
	if (fields.to_parking_available && !validate.isIn(fields.to_parking_available, ['Yes','No']))
		validationErrors.push('to_parking_available must either Yes or No');
	if (fields.pets_moved && !validate.isIn(fields.pets_moved, ['Yes','No']))
		validationErrors.push('pets_moved must either Yes or No');
	if (fields.vehicle_moved && !validate.isIn(fields.vehicle_moved, ['Yes','No']))
		validationErrors.push('vehicle_moved must either Yes or No');
	if(!fields.moving_date.match(dateRegex))
		validationErrors.push('moving_date must be a valid dd/mm/yyyy date');
	if (fields.out_of_buisness_hours_removal && !validate.isIn(fields.out_of_buisness_hours_removal, ['Yes','No','Not sure']))
		validationErrors.push('out_of_buisness_hours_removal must either Yes, No or Not sure');
	if (fields.ip && !validate.isIP(fields.ip))
		validationErrors.push('ip must be a valid version 4 IP address');

	if (validationErrors.length)
		return callback({ error: 'Form validation errors', errors: validationErrors }, null);

	return callback(null, fields);
};

module.exports = validation;
