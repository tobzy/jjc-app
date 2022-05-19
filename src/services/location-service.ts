import { mainApi, secureMainApi } from '../lib/apis';
import {IUserSigninData} from "./authentication-service";

/**
 * @description
 * Our wallet service.
 */
interface WalletTokenDetailsResponse {
  circulatingSupply: number;
  clientId: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
}

interface WalletAndTokenDetailsResponse {
  circulatingSupply: number;
  notInCirculation: number;
  clientId: string;
  tokenId: string;
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number;
  walletBalance: Wallet[];
  decimals: number;
  currencyCode: string;
}

interface TokenReportSummary {
  tokenId: string;
  tokenSymbol: string;
  totalDistributed: number;
  totalMinted: number;
  totalTransferred: number;
}

interface MintTokenResponse {
  tokenId: string;
  totalSupply: number;
  timestamp: number;
}

export interface MintTokenRequest {
  tokenId: string;
  tokenOwnerMasterWalletId: string;
  amount: number;
}

export interface TransferTokensRequest {
  tokenId: string;
  sourceWalletId: string;
  destinationWalletId: string;
  transactionType: string;
  amount: number;
  longitude: string;
  latitude: string;
}

export interface WalletGraphRequest {
  tokenId: string;
  distributionWalletId: string;
  period?: number;
  startDate?: string;
  endDate?: string;
}

export interface DashboardGraphRequest {
  tokenId: string;
  transactionType: string;
  period?: number;
  startDate?: string;
  endDate?: string;
}

export interface WalletGraphResponse {
  credit: number;
  debit: number;
  graphDataCredit: {
    [key: number]: number;
  };
  graphDataDebit: {
    [key: number]: number;
  };
}

export interface DashboardGraphResponse {
  graphData: {
    [key: number]: number;
  };
}

interface Wallet {
  walletId: string;
  clientId: string;
  userId: string;
  walletType: string;
  balances: [
    {
      name: string;
      symbol: string;
      balance: string;
    },
  ];
}

export interface Location {
  categories: string[];
  color: string;
  description: string;
  id: string;
  keywords: string[];
  location: {type:string, coordinates: number[]};
  name: string;
  openingTimes: string;
  phone: string;
  state: number;
  status: "verified"|"pending"|"denied";
}

interface ILocationResponse {
  data: {
    mapping: Location[],
    totalCount: number
  };
}

export class LocationService {

  /**
   * @description
   * Get list of locations
   */

  static async getAllLocations(pageNumber:number,pageSize:number, status?:string): Promise<ILocationResponse> {
    const response = await secureMainApi
      .get(`/mappings`, {
        params: {
          pageNumber,
          pageSize,
          status
        },
      })
      .then((res) => res?.data)
      .catch((err) => {
        // console.error('Error logging in: ', err.response.data);
        // throw Error(err.response);
      });
    return response;
  }


  /**
   * @description
   * Accept Mapping.
   */

  static async acceptMapping(id: string): Promise<any> {
    const response = await secureMainApi.put(`/review/mappings/${id}`, {},{
      params:{
        status:"verified"
      }
    });
    return response?.data?.data;
  }

  /**
   * @description
   * Accept Mapping.
   */

  static async declineMapping(id: string): Promise<any> {
    const response = await secureMainApi.put(`/review/mappings/${id}`, {}, {
      params:{
        status:"denied"
      }
    });
    return response?.data?.data;
  }

  static async getDashboardBalanceChartData(request: DashboardGraphRequest): Promise<DashboardGraphResponse> {
    const response = await secureMainApi.post(`/cb/dashGraphData`, request);
    return response.data;
  }
}
