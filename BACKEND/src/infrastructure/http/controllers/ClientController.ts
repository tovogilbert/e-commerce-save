import { Request, Response } from "express";
import { CreateParticularClientDTO } from "../dtos/requests/CreateParticularClient.dto";
import { CreateBusinessClientDTO } from "../dtos/requests/CreateBusinessClient.dto";
import { ClientRepository } from "../../repositories/ClientRepository";
import { CreateParticularClient } from "../../../core/usecases/client/CreateParticularClient";
import { CreateBusinessClient } from "../../../core/usecases/client/CreateBusinessClient";
import { GetClient } from "../../../core/usecases/client/GetClient";
import { ListClients } from "../../../core/usecases/client/ListClients";
import { DeleteClient } from "../../../core/usecases/client/DeleteClient";
import { ClientMapper } from "../mappers/ClientMapper";
import { GetClientByEmail } from "../../../core/usecases/client/GetClientByEmail";


const clientRepo = new ClientRepository();

export const registerParticulier = async (req: Request, res: Response) => {
  try {
    const dto: CreateParticularClientDTO = req.body;
    const useCase = new CreateParticularClient(clientRepo);
    const client = await useCase.execute(dto);
    return res.status(201).json(ClientMapper.toDTO(client));
  } catch (err: any) {
    
  }
};

export const registerEntreprise = async (req: Request, res: Response) => {
  try {
    const dto: CreateBusinessClientDTO = req.body;
    const useCase = new CreateBusinessClient(clientRepo);
    const client = await useCase.execute(dto);
    return res.status(201).json(ClientMapper.toDTO(client));
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const getClientByEmail = async (req: Request, res: Response) => {
  try {
    const useCase = new GetClientByEmail(clientRepo);
    const client = await useCase.execute(req.params.email);
    return res.json(ClientMapper.toDTO(client));
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};

export const getParticulier = async (req: Request, res: Response) => {
  try {
    const useCase = new GetClient(clientRepo);
    const client = await useCase.execute(req.params.id);
    if (client.getClientType() !== "particulier") {
      return res.status(404).json({ error: "Client non trouvé" });
    }
    return res.json(ClientMapper.toDTO(client));
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};

export const getEntreprise = async (req: Request, res: Response) => {
  try {
    const useCase = new GetClient(clientRepo);
    const client = await useCase.execute(req.params.id);
    if (client.getClientType() !== "entreprise") {
      return res.status(404).json({ error: "Client non trouvé" });
    }
    return res.json(ClientMapper.toDTO(client));
  } catch (err: any) {
    return res.status(404).json({ error: err.message });
  }
};

export const listParticuliers = async (_req: Request, res: Response) => {
  try {
    const useCase = new ListClients(clientRepo);
    const clients = await useCase.getAllParticuliers();
    return res.json(clients.map(ClientMapper.toDTO));
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const listEntreprises = async (_req: Request, res: Response) => {
  try {
    const useCase = new ListClients(clientRepo);
    const clients = await useCase.getAllEntreprises();
    return res.json(clients.map(ClientMapper.toDTO));
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const useCase = new DeleteClient(clientRepo);
    await useCase.execute(req.params.id);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

