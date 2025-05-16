import * as yup from 'yup';

export const OrderSchemas = {
  base: yup.object().shape({
    "status": yup.string().oneOf(['Non livrée', 'Livrée']).required().label('Statut'),
    "deliveryAddress": yup.string().required().label('Adresse de livraison'),
    "shippingFee": yup.number().min(0).required().label('Frais de livraison'),
    "subtotal": yup.number().min(0).required().label('Sous-total'),
    "discount": yup.number().min(0).required().label('Remise'),
    "tax": yup.number().min(0).required().label('Taxe'),
    "total": yup.number().min(0).required().label('Total'),
  
   "lines": yup.array()
      .of(
        yup.object().shape({
          "quantity": yup.number().integer().min(1).required().label('Quantité'),
          "unitPrice": yup.number().positive().required().label('Prix unitaire')
        })
      )
      .min(1)
      .required()
      .label('Lignes de commande')
  })
};
