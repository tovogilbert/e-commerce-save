
export interface ClientResponseDTO {
  "id": string;
  "email": string;
  "telephone": string;
  "adresse": string;
  "createdAt": Date;
  "clientType": "particulier" | "entreprise";
  "fullName"?: string;
  "companyName"?: string;
  "nif"?: string;
  "stat"?: string;
}
