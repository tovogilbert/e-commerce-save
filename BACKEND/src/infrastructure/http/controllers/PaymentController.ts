import { Request, Response } from "express";
import { CreatePaymentDTO } from "../dtos/requests/payment.dto";
import { PaymentRepository } from "../../../infrastructure/repositories/PaymentRepository";
import { CreatePayment } from "../../../core/usecases/payement/CreatePayment";
import { FindPaymentById } from "../../../core/usecases/payement/FindPaymentById";
import { GetAllPayments } from "../../../core/usecases/payement/GetAllPayments";
import { PaymentMapper } from "../mappers/PaymentMapper";
import { BusinessError } from "../../../shared/errors/BusinessError";
import { PaymentListResponseDTO } from "../dtos/responses/payment.dto";

const paymentRepo = new PaymentRepository();

export const createPayment = async (req: Request, res: Response) => {
  try {
    const dto: CreatePaymentDTO = req.body;
    
    const useCase = new CreatePayment(paymentRepo);
    const payment = await useCase.execute(dto);
    
    return res.status(201).json(PaymentMapper.toDTO(payment));
  } catch (err: any) {
    if (err instanceof BusinessError) {
      return res.status(400).json(err.toJSON());
    }
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  try {
    const useCase = new FindPaymentById(paymentRepo);
    const payment = await useCase.execute(Number(req.params.id));
    return res.json(PaymentMapper.toDTO(payment));
  } catch (err: any) {
    if (err instanceof BusinessError) {
      return res.status(err.errorCode === "PAYMENT_NOT_FOUND" ? 404 : 400)
                .json(err.toJSON());
    }
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const useCase = new GetAllPayments(paymentRepo);
    const payments = await useCase.execute();
    
    const response: PaymentListResponseDTO = {
      payments: PaymentMapper.toDTOList(payments),
      total: payments.length
    };
    
    return res.json(response);
  } catch (err: any) {
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
};