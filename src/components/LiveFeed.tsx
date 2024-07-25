import React from 'react'
// import proto from "../utils/liveDataFeed.proto";
import { Buffer } from "buffer";
import { useLazyGetUpstockUrlQuery } from '../store/api/coreApi';
import {FeedResponse} from "../proto/liveDataFeed_pb"




const blobToArrayBuffer = async (blob:Blob) => {
  if ("arrayBuffer" in blob) return await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject();
    reader.readAsArrayBuffer(blob);
  });
};


const getLiveFeed = async(wsUrl:string)=>{

  try {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected");
      const data = {
        guid: "someguid",
        method: "sub",
        data: {
          mode: "full",
          instrumentKeys: ["NSE_EQ|INE669E01016"],
        },
      };
      ws.send(Buffer.from(JSON.stringify(data)));
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    ws.onmessage = async (event) => {
      const arrayBuffer = await blobToArrayBuffer(event.data);
      let buffer = Buffer.from(arrayBuffer as ArrayBuffer);
      let response = FeedResponse.fromBinary(buffer);
      console.log(response,'response');
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    return () => ws.close();
  } catch (error) {
    console.error("WebSocket connection error:", error);
  }
}


const LiveFeed = () => {

  const [webSocketUrl,setWebSocketUrl] = React.useState("");

  const [getSocketURL] = useLazyGetUpstockUrlQuery();
  React.useEffect(()=>{

    if(!webSocketUrl)

    getSocketURL().unwrap().then(response => {
      setWebSocketUrl(response.data.authorizedRedirectUri);
    });

  },[webSocketUrl])

  React.useEffect(()=>{

    if(webSocketUrl){
      getLiveFeed(webSocketUrl);
    }

   // initProtobuf();
  },[webSocketUrl])
  return (
    <div>LiveFeed</div>
  )
}

export default LiveFeed