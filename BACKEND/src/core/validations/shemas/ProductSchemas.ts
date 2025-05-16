import * as yup from 'yup';

export const ProductSchemas = {
  base: yup.object().shape({
    "name": yup.string().min(5).required().label('Nom du produit'),
    "description": yup.string().nullable().label('Description'),
    "priceExclTax": yup.number().positive().required().label('Prix HT'),
    "stockQty": yup.number().integer().min(0).required().label('Quantité en stock'),
    "image": yup.string().required().label('Image')
  }),

  brand: yup.object().shape({
    "name": yup.string().required().label('Nom de la marque')
  }),

   feature: yup.object().shape({
    "name": yup.string().min(2).max(100).required().label('Nom de la caractéristique')
  })
};
