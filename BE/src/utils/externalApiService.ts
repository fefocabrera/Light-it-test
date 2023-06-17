import axios, { AxiosRequestConfig } from 'axios';
import { ExternalApiError, GeneralError } from '../exceptions/exceptions';
import CryptoJS from 'crypto-js';
import ExternalApiToken from "../database/models/externalApiToken";
import sequelize from '../database/index';
import { QueryTypes } from 'sequelize';
import { SymptomDto } from "../domain/dto/symptomDto"

interface ExternalApiInvalidTokenError {
    response: {
        data: string;
    }
  }

const externalApiUsername = process.env.EXTERNAL_API_USERNAME || '';
const externalApiPassword = process.env.EXTERNAL_API_PASSWORD || '';
const externalApiAuthServiceBaseUrl = process.env.EXTERNAL_API_AUTH_SERVICE_BASE_URL || '';
const externalApiHealthServiceBaseUrl = process.env.EXTERNAL_API_HEALTH_SERVICE_BASE_URL || '';

class ExternalApiService {
  constructor() {
  }

  async updateExternalApiToken(): Promise<string> {

    const uri = `${externalApiAuthServiceBaseUrl}/login`;
    const computedHash = CryptoJS.HmacMD5(uri, externalApiPassword);
    const computedHashString = computedHash.toString(CryptoJS.enc.Base64); 

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${externalApiUsername}:${computedHashString}`
      },
    };

    try {
      const response = await axios.post(uri, {}, config);
      if(!response?.data?.Token){
        throw new ExternalApiError(`External Api Token not received.`)
      }
      await updateExternalApiTokenIntoDb(response?.data?.Token, response?.data?.ValidThrough)
      return response?.data?.Token;
    } catch (error) {
      throw new ExternalApiError(`Error trying to get token from external api. ${error}`)
    }
  }

  async getAllSymptomsFromExternalApi(): Promise<SymptomDto[]> {
    let simptoms = [];
    const uri = `${externalApiHealthServiceBaseUrl}/symptoms`;

    let token = await getExternalApiTokenFromDb();
    let url = updateUrlWithParams(uri, token)
    try {
      const response = await axios.get(url);

      simptoms = response.data;
    } catch (error) {
        if((error as ExternalApiInvalidTokenError).response.data === 'Invalid token') {
            try {
                token = await this.updateExternalApiToken();
                url = updateUrlWithParams(uri, token)
                const response = await axios.get(url);
                simptoms =  response.data;
            } catch (err){
                throw new ExternalApiError(`Error trying to get token from external api. ${error}`)
            }
        } else {
            throw new ExternalApiError(`Error trying to get token from external api. ${error}`)
        }
    }
    return simptoms;
  }
}


const updateExternalApiTokenIntoDb = async (token: string, validThrough: number) => {
    try{
        const query = `DELETE FROM ExternalApiTokens`;
        await sequelize.query(query, {
          type: QueryTypes.RAW,
          raw: true,
        });

        await ExternalApiToken.create({ 
            token,
            validThrough,
          });
    } catch (err) {
        throw new GeneralError(`Internal error trying to insert external api token into db. ${err}`);
    }
}

const getExternalApiTokenFromDb = async (): Promise<string> => {
    try{
        return (await ExternalApiToken.findOne() as ExternalApiToken).token;
    } catch (err) {
        throw new GeneralError(`Internal error trying to get external api token from db. ${err}`);
    }
}

const updateUrlWithParams = (uri:string, token: string): string => {
    const params = new URLSearchParams();
    params.append('token', token);
    params.append('language', 'en-gb');
    const url = `${uri}?${params.toString()}`;
    return url
}


export default ExternalApiService;