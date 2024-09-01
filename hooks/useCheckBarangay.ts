import { useState } from "react";




const useCheckBarangay = () => {
    const [barangay, setBarangay] = useState<string | null>(null)



    const handleBarangayChange = (text: string) => {
        setBarangay(text)
    }



    return{
        barangay,
        handleBarangayChange
    };



}



export default useCheckBarangay;