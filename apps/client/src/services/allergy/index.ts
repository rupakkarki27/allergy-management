import { IAllergy, IApiPaginationResponse } from "@allergy-management/models";
import api from "../api";

class Allergy {
  private uri = "/allergies";

  async getAllAllergies(page = 1, limit = 10) {
    const response = await api.get<IApiPaginationResponse<IAllergy>>(this.uri, {
      params: { page, limit },
    });

    return response.data;
  }

  async getAllergy(id: string) {
    const response = await api.get<IAllergy>(`${this.uri}/${id}`);

    return response.data;
  }

  async createAllergy(body: FormData) {
    const response = await api.post<IAllergy>(`${this.uri}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

const AllergyService = new Allergy();

export default AllergyService;
