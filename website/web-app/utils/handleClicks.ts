import { useNavigate } from "react-router-dom";
import { useGetItems } from "../src/hooks/useGetItems";

const navigate = useNavigate();

const {checkAccounts} = useGetItems();

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

    checkAccounts('admin');
    handleNavClick(e, 'admindashboard');

}