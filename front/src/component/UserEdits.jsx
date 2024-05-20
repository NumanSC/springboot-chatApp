import axios from "axios";
import React, { useContext, useState } from "react";
import { TokenContext } from "../context/AppProvider";

function UserEdits() {
  const [file, setFile] = useState(null);
  const { token } = useContext(TokenContext);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put("api/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Yükle</button>
      </form>
    </div>
  );
}

export default UserEdits;
