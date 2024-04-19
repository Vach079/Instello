export const handleError = ({login,phone,email,password}) => {
  const errors = {}
     if(login === ''){
      errors.loginErr = 'Path `login` is required.'
    }else if(login.length < 3){
      errors.loginErr = 'the number must be more than 3'
    }
    
    if(phone === ''){
      errors.phoneErr = 'Path `phoneNumber` is required'
    }else if(phone.length < 12){
      errors.phoneErr = 'the number of numbers after + must be 11'
    }else if(phone.length > 12){
      errors.phoneErr = 'the phoneNumbers length big is 12'
    }

    if(email === ''){
      errors.emailErr =  'Path `email` is required.'
    }else if(!email.includes('@')){
      errors.emailErr = '(@) is reqired'
    }

    if(password === ''){
      errors.passwordErr = 'Path `password` is required.'
    }else if(password.length < 8){
      errors.passwordErr = 'paroli erkarutyun@ petqe lini 8 ic mec'
    }
    return errors
  }