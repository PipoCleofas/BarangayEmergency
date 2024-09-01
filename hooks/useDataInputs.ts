import { useState } from "react";

const useDataInput = () => {

    const[fname, setFname] = useState<string | null>(null)
    const[lname, setLname] = useState<string | null>(null)
    const[mname, setMname] = useState<string | null>(null)
    const[birthday, setBirthday] = useState<any>(null);
    const[sitio, setSitio] = useState<string | null>(null);
    const[barangay,setBarangay] = useState<string | null>(null);
    const[signupError,setSignupError] = useState<string | null>(null);

    const handleFnameChange = (text: any) => {
        if(text){
            setFname(text)
            console.log(fname)
        }
        else{
            return null;
        }
    }

    const handleLnameChange = (text: any) => {
        if(text){
            setLname(text)
            console.log(lname)
        }else{
            return null;
        }
    }

    const handleMnameChange = (text: any) => {
        if(text){
            setMname(text)
            console.log(mname)
        }else{
            return null;
        }
     

    }

    const handleSignupErrorChange = (text: any) => {
        if(text){
            setSignupError(text)
        }else{
            return null;
        }
    } 

    const handleBirthdayChange = (text: string) => {
        let formattedText = text.replace(/[^0-9]/g, '');
    
        const previousBirthday = birthday || ''; 
    
        if (formattedText.length < previousBirthday.replace(/[^0-9]/g, '').length) {
            setBirthday(text); 
            return;
        }
    
        if (formattedText.length <= 2) {
            let month = parseInt(formattedText, 10);
            if (isNaN(month) || month === 0) {
                month = 1; 
            } else if (month > 12) {
                month = 12; 
            }
            formattedText = month.toString().padStart(2, '0');
        } else if (formattedText.length <= 4) {
            let month = formattedText.slice(0, 2);
            let day = parseInt(formattedText.slice(2), 10);
            if (isNaN(day) || day === 0) {
                day = 1; 
            } else if (day > 31) {
                day = 31; 
            }
            formattedText = `${month}/${day.toString().padStart(2, '0')}`;
        } else if (formattedText.length > 4) {
            let month = formattedText.slice(0, 2);
            let day = parseInt(formattedText.slice(2, 4), 10);
            let year = parseInt(formattedText.slice(4, 8), 10);
            if (isNaN(day) || day === 0) {
                day = 1; 
            } else if (day > 31) {
                day = 31; 
            }
            if (isNaN(year) || year === 0) {
                year = 1990; 
            } else if (year > new Date().getFullYear()) {
                year = new Date().getFullYear(); 
            }
            formattedText = `${month}/${day.toString().padStart(2, '0')}/${year}`;
        }
    
        setBirthday(formattedText);
        console.log(formattedText);
    };
    
    const handleSitioChange = (text: any) => {
        setSitio(text)
        console.log(sitio)
    }

    const handleBarangayChange = (text: any) => {
        setBarangay(text)
        console.log(barangay)
    }
    
     return{
        fname,
        lname,
        mname,
        sitio,
        barangay,
        birthday,
        signupError,
        handleSignupErrorChange,
        handleFnameChange,
        handleLnameChange,
        handleMnameChange,
        handleBirthdayChange,
        handleSitioChange,
        handleBarangayChange,
    }
}

export default useDataInput;