import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const handleNavClick = (e: any, target: any) => {
    e.preventDefault();


    switch(target){
        case 'admindashboard':
            navigate('/AdminDashboard');
            break;
        case 'viewrequests':
            navigate('/ViewRequest')   
            break;
        case 'approval':
            navigate('/Approval')   
            break;
        case 'settings':   
            navigate('/Settings')   
            break;
    }
}

export const onLoginClick = (e: Event) => {
    e.preventDefault();

    
}