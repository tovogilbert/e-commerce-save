import { IClientRepository } from "../../../interfaces/repositories/IClientRepository";
import { BusinessError } from "../../../shared/errors/BusinessError";

export class DeleteClient {
  constructor(private repo: IClientRepository) {}

  async execute(id: string): Promise<void> {
    try {
      const client = await this.repo.findById(id);
      if (!client) {
        throw new BusinessError("Client non trouvé", {
          errorCode: "CLIENT_NOT_FOUND",
          details: [`ID: ${id}`]
        });
      }
      await this.repo.delete(id);
    } catch (error) {
      if (error instanceof BusinessError) throw error;
      throw new BusinessError("Échec de la suppression du client", {
        errorCode: "CLIENT_DELETION_FAILED",
        details: [error instanceof Error ? error.message : "Erreur inconnue"]
      });
    }
  }
}