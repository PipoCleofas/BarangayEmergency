
export const handleNavClick = (e: any, target: any) => {
    e.preventDefault();

    switch(target){
        case 'admindashboard':
            console.log('go in admin dashboard')
            break;
        case 'viewrequests':   
            console.log('go in view requests')
            break;
        case 'approval':
            console.log('go in admin dashboard')
            break;
        case 'settings':   
            console.log('go in view requests')
            break;
    }
}