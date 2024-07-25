export type IHistoryChartRequest = {
  symbol: string;
  exchangeSegment: string;
  instrument: string;
  expiryCode: number;
  fromDate: string;
  toDate: string;
};

export type IHistoryChartDataType = {
  createdDate: number;
  stockOpen: number;
  stockClose: number;
  stockHigh:number;
  stockLow: number;
  stockVolume: number;
};
