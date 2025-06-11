
//Brand 
export const initialBrand ={
  "id":0,
  "name":""
}

//Feature
export const intitialFeature ={
  "id":0,
  "name":""
}

//Product - feature 
export const intitialProductFeature = {
  "id":0,
  "feature":intitialFeature
}

//Product
export const initialProduct = {
    "id": 0,
    "name": "",
    "description": 0,
    "priceExclTax": 0,
    "brand": initialBrand,
    "stockQty": 0,
    "image": "",
    "features":{intitialProductFeature}
  };

