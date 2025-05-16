import * as yup from 'yup';

export const ClientSchemas = {
  particulier: yup.object().shape({
    "firstName": yup.string().min(2).max(50).required().label('Prénom'),
    "lastName": yup.string().min(2).max(50).required().label('Nom'),
    "email": yup.string().email().required().label('Email'),
    "telephone": yup.string().matches(/^[0-9]{10}$/).required().label('Téléphone'),
    "adresse": yup.string().min(5).max(200).required().label('Adresse')
  }),

  entreprise: yup.object().shape({
    "companyName": yup.string().min(2).max(100).required().label("Nom de l'entreprise"),
    "nif": yup.string().matches(/^[0-9]{10,15}$/).required().label('NIF'),
    "stat": yup.string().min(3).max(20).required().label('STAT'),
    "email": yup.string().email().required().label('Email'),
    "telephone": yup.string().matches(/^[0-9]{10}$/).required().label('Téléphone'),
    "adresse": yup.string().min(5).max(200).required().label('Adresse')
  })
};
