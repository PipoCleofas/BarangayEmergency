import { useState } from "react";


export const useRequestList = () => {
    const [requestList, setRequestList] = useState<string[]>([]);

    function updateRequestList() {
        setRequestList([]);
    }

    return { 
        requestList,
        updateRequestList,
     };
  };