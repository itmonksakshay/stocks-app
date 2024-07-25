import { Moment } from "moment";
import {Buffer} from 'buffer';

export const calculateToDate = (date: Moment, days: number): Moment => {
  let newDate = date.clone();
  for (let i = 0; i < days; i++) {
    if (newDate.isoWeekday() !== 6 && newDate.isoWeekday() !== 7) {
      newDate = newDate.subtract(1, "days");
    } else {
      newDate = newDate.subtract(1, "days");
      i--;
    }
  }
  return newDate;
};

export const timeStampConvertor = (n: number) => {
  let offset1 = new Date().getTimezoneOffset();
  let istOffset = 330;
  n = n - (istOffset + offset1) * 60;
  let time = new Date("1980-01-02T00:00:00.000+05:30");
  time.setSeconds(n);
  let year = time.getFullYear();
  let month = time.getMonth();
  let day = time.getDate();
  let hours = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  return new Date(year, month, day, hours, min, sec);
};

const padWithZeros = (buffer: Buffer, length: number) => {
  const padding = Buffer.alloc(length - buffer.length, 0);
  return Buffer.concat([buffer, padding], length);
};

export const socketAuthorizatinPacket = () => {
  const accessToken = Buffer.from(
    import.meta.env.VITE_DATA_ACCESS_TOKEN || "",
    "utf-8"
  );
  const authenticationType = Buffer.from("2P", "utf-8");
  const apiAccessToken = padWithZeros(accessToken, 500);
  const payload = Buffer.concat([apiAccessToken, authenticationType]);
  const feedRequestCode = 11;
  const messageLength = 83 + apiAccessToken.length + authenticationType.length;
  let clientId = Buffer.from(import.meta.env.VITE_CLIENT_ID || "", "utf-8");
  clientId = padWithZeros(clientId, 30);
  const dhanAuth = Buffer.alloc(50, 0);
  const header = Buffer.alloc(83);
  // Adjust the size based on your actual header structure
  header.writeInt8(feedRequestCode, 0);
  header.writeUInt16LE(messageLength, 1);
  clientId.copy(header, 3);
  dhanAuth.copy(header, 33);
  return Buffer.concat([header, payload]);
};

export const createInstrumentStructure =()=>{
  const feedRequestCode = 15;
  const messageLength = 83+4+2100;
  const payload = Buffer.alloc(2104);
  const instruments =padWithZeros(Buffer.from("FUTCOM", "utf-8"),2100);
  payload.writeInt8(1,0);
  instruments.copy(payload,4);
  let clientId = Buffer.from(import.meta.env.VITE_CLIENT_ID || "", "utf-8");
  clientId = padWithZeros(clientId, 30);
  const dhanAuth = Buffer.alloc(50, 0);
  const header = Buffer.alloc(83);
  // Adjust the size based on your actual header structure
  header.writeInt8(feedRequestCode, 0);
  header.writeUInt16LE(messageLength, 1);
  clientId.copy(header, 3);
  dhanAuth.copy(header, 33);
  return Buffer.concat([header, payload]);
}
