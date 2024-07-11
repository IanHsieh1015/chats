import { v4 as uuidv4 } from 'uuid';

const generateUserId = () => {
  let userId = localStorage.getItem('userId');
  
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('userId', userId); 
  }
  
  return String(userId);
};

export default generateUserId;