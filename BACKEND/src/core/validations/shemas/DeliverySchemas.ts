import * as yup from 'yup';

export const DeliverySchemas = {
  base: yup.object().shape({
    "mode": yup.string().required().label('Mode de livraison'),
    "deliveryPersonName": yup.string().required().label('Nom du livreur'),
  })
};
