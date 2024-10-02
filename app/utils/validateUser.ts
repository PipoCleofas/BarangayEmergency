export const validateName = (fname: string | null, mname: string | null, lname: string | null) => {
    if (!fname || !mname || !lname) {
      return "First name, middle name, and last name are required.";
    }
    return null;
  };

  export const validatePassword = (password: string | null, reEnteredPassword: string | null = null) => {
    if (!password) {
      return "Password cannot be empty.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }

    if (reEnteredPassword !== null && password !== reEnteredPassword) {
      return "Passwords do not match.";
    }

    if(reEnteredPassword == null){
      return "Reenter your password"
    }

    return null; // No error
  };

   // barangay and sitio

  

  
  export const validateBirthday = (birthday: string) => {
    if (!birthday) {
      return "Birthday cannot be empty.";
    }
    
    return null; // No error
  }

  export const handleBirthdayChange = (text: string, birthday: string | null, dispatch: React.Dispatch<any>) => {
    let formattedText = text.replace(/[^0-9]/g, '');
  
    const previousBirthday = birthday || '';
  
    if (formattedText.length < previousBirthday.replace(/[^0-9]/g, '').length) {
      dispatch({
        actionType: 'input',
        data: { birthdate: text }
      });
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
  
    // Dispatch the formatted birthdate to update the state
    dispatch({
      actionType: 'input',
      data: { birthdate: formattedText }
    });
  };
  
  export const validateBarangayAndSitio = (barangay: string | null, sitio: string | null = null) => {
    if (!barangay) {
      return "Barangay must not be empty.";
    }
  
    if (!sitio) {
      return "Sitio must not be empty."; 
    }
  
    return null; 
  };

  export const validateUsernamePhoto = (username: string | null, photo?: any) => {
    if (!username || username.trim() === "") {
      return "Username cannot be empty.";
    }
    
    /*
    if (!photo || photo === "" || typeof photo !== 'string') {
      return "Photo cannot be empty or invalid.";
    }
    */
   
    return null; // No error
  };
  

  export const validatePhotos = (photo1: string | null,photo2: string | null,photo3: string | null) => {

    if (!photo1 || photo1 === "" || typeof photo1 !== 'string' || !photo2 || photo2 === "" || typeof photo2 !== 'string' || !photo3 || photo3 === "" || typeof photo3 !== 'string') {
      return "Photo cannot be empty or invalid.";
    }
  
    return null; // No error
  };

  export const validateLogin = (username: string | null, password: string | null) => {
    if (!username || username.trim() === "") {
      return "Username cannot be empty.";
    }
  
    if (!password || password.trim() === "") {
      return "Password cannot be empty.";
    }
  
    return null; // No error
  };
  