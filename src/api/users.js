// Change user password
import {createSHA256Hash} from '../helpers/createSha256'
export const changePassword = async (newPassword, token, uuid) => {
    try {
      const password = createSHA256Hash(newPassword);
      const body = JSON.stringify({
        id: uuid,
        password: password,
      });
      console.log(body);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/change_password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to change password: ${response.status}`);
      }
  
      return true; // Successfully changed
    } catch (error) {
      console.error('Change Password Error:', error);
      throw error;
    }
  };
  
  // Delete user account
  export const deleteUser = async (token, uuid) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/delete_user`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: uuid}),
      });
      console.log(await response.json())
      if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.status}`);
      }
  
      return true; // Successfully deleted
    } catch (error) {
      console.error('Delete User Error:', error);
      throw error;
    }
  };