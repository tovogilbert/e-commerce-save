

export interface ErrorResponseDTO {
  "error": string;
  "errorCode": string;
  "message": string;
  "details"?: string[];
  "timestamp": Date;
}
