// Helper function to download a file
export const getFile = async (filename, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/files/get_file?path=${encodeURIComponent(filename)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.status}`);
      }
  
      const blob = await response.blob(); // Download as a binary file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Use the original filename
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  };
  
  // Helper function to delete a file
  export const deleteFile = async (filename, token, uuid) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/files/detach_file`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: uuid, name: filename }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete file: ${response.status}`);
      }
      return true; // Successfully deleted
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  };

  // Helper function to update a file
export const updateFile = async (filename, content, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/files/put_file`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: filename,
          content,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update file: ${response.status}`);
      }
  
      return true; // Successfully updated
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  };