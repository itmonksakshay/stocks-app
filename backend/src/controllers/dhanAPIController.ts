import * as dotenv from 'dotenv'
import {
    AmoTime,
    ConvertPositionRequest,
    DailyHistoricalDataRequest,
    DhanEnv,
    DhanHqClient,
    ExchangeSegment, HistoricalDataResponse, Instrument, OrderDetail, OrderType,
    PositionType,
    ProductType,
    TransactionType, Validity
} from "dhanhq";


dotenv.config();

const ACCESS_TOKEN =  process.env.DHAN_ACCESS_TOKEN || '';
const DHAN_CLIENT_ID = process.env.DHAN_CLIENT_ID;
const client: DhanHqClient = new DhanHqClient({
    accessToken: ACCESS_TOKEN,
    env: DhanEnv.PROD
});

export const  getHistoricalData= async(params:DailyHistoricalDataRequest)=> {
    try{
        const result = await client.getDailyHistoricalData(params) as unknown;
        const fixedResponse = result as Omit<HistoricalDataResponse,'start_time'> & {start_Time:Array<number>;
            errorCode?: string;
            httpStatus?: string;
            internalErrorCode?:string;
            internalErrorMessage?: string;
          }
        if(fixedResponse?.errorCode){
            throw new Error(fixedResponse.internalErrorMessage);
        } else {
            const response = fixedResponse.open.map((item,key)=>({
                createdDate:fixedResponse.start_Time[key],
                stockOpen:item,
                stockClose:fixedResponse.close[key],
                stockHigh:fixedResponse.high[key],
                stockLow:fixedResponse.low[key],
                stockVolume:fixedResponse.volume[key],
             }))
             return response;
        }
    }
    catch(e){
        throw new Error((e as Error).message);
    }
}