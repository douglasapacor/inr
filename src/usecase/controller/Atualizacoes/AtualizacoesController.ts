import { defaultResponse } from "@lib/types/defaultResponse"
import IAtualizacoesService from "src/usecase/service/Atualizacoes/IAtualizacoesService"
import {
  getAtualizacoesById,
  getAtualizacoesByIdInput
} from "src/validation/Atualizacoes/getAtualizacoesById"
import { IAtualizacoesController } from "./IAtualizacoesController"

export default class AtualizacoesController implements IAtualizacoesController {
  constructor(private _AtualizacaoService: IAtualizacoesService) {}
  async getAtualizacoesById(
    params: getAtualizacoesByIdInput
  ): Promise<defaultResponse> {
    try {
      const validation = await getAtualizacoesById.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      const service = await this._AtualizacaoService.getAtualizacoesById(
        validation.data
      )

      if (!service.success) throw new Error(service.message)

      return {
        success: true,
        data: service.data
      }
    } catch (error: any) {
      return {
        success: true,
        message: error.message
      }
    }
  }
}
