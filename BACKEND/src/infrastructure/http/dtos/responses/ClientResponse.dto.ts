export interface ClientResponseDTO {
  id: string;
  email: string;
  telephone: string;
  adresse: string;
  createdAt: Date;
  clientType: "particulier" | "entreprise";
  
  // Propriétés pour particulier
  firstName?: string;
  lastName?: string;
  fullName?: string;
  
  // Propriétés pour entreprise
  companyName?: string;
  nif?: string;
  stat?: string;
}