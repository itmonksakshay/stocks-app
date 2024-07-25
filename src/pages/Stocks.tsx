import React from "react";
import { useGetHistoricalChartMutation } from "../store/api/chartsApi";
import moment from "moment";
import { calculateToDate, timeStampConvertor } from "../utils/dhanUtils";
import LiveFeed from "../components/LiveFeed";

const Stocks = () => {
  const [getHistoricalChart, { data, isLoading }] =
    useGetHistoricalChartMutation();

  const calculateHistoricalData = () => {
    const toDate = moment();
    const fromDate = calculateToDate(toDate.clone(), 5);

    const payload = {
      symbol: "BANKNIFTY",
      exchangeSegment: "IDX_I",
      instrument: "EQUITY",
      expiryCode: 0,
      fromDate: fromDate.format("YYYY-MM-DD"),
      toDate: toDate.format("YYYY-MM-DD"),
    };

    getHistoricalChart(payload);
  };

  return data && data?.length ? (
    <div>
      <table>
        <thead>
          <tr>
            <th>Stock Date</th>
            <th>Stock High</th>
            <th>Stock Low</th>
            <th>Stock Open</th>
            <th>Stock Close</th>
            <th>Stock Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key}>
              <td>
                {timeStampConvertor(item.createdDate).toLocaleDateString()}
              </td>
              <td>{item.stockHigh}</td>
              <td>{item.stockClose}</td>
              <td>{item.stockOpen}</td>
              <td>{item.stockClose}</td>
              <td>{item.stockVolume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <>
      {" "}
      <LiveFeed />
      <button disabled={isLoading} onClick={() => calculateHistoricalData()}>
        Calculate Histroical Data
      </button>
    </>
  );
};

export default Stocks;
