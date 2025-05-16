import * as yup from 'yup';

export const PaymentSchemas = {
  base: yup.object().shape({
    "amount": yup.number().positive().required().label('Montant'),
    "method": yup.string().oneOf(['carte', 'paypal', 'virement']).required().label('Mode de paiement'),
    "transactionRef": yup.string().required().label('Référence')
  })
};
