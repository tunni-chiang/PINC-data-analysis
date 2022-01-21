import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import "./adminpanel.css";

function AdminPanel({ ref_token }: any) {
  const [files, setFiles] = useState<any>([]);

  let { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop: (acceptedFiles: any) => {
      let newFiles = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
  });

  const files_uploaded = files.map((file: any) => {
    return <p key={file.name}>{file.name}</p>;
  });

  return (
    <div className="adminpanel_container">
      <div className="admin_info">
        <div className="token_container">
          <p>Referral Token</p>
          <div className="token_info">
            <p className="token_text"> Token: </p>
            <p className="token_text">{ref_token}</p>
            <i
              className="fas fa-copy token_copy"
              onClick={() => navigator.clipboard.writeText(ref_token)}
            ></i>
          </div>
        </div>
        <div className="token_description">
          <p className="token_desc">
            Tokens are used to give other users access to this website. When registering users will
            be asked to provide a refferal token.
          </p>
        </div>
        <div className="stats_add">
          <p>Add new dataset</p>
          <p className="token_desc">
            Select or drag and drop a dataset(csv file) to replace or add on the existing data
          </p>
          <div className="select_file" {...getRootProps()}>
            <input {...getInputProps()} />
            <p className="token_desc">Drop Here</p>
            <p>{files_uploaded}</p>
          </div>
          <div className="stats_butons">
            <button
              className={`normal_button ${files.length === 0 ? "disabled_btn" : ""}`}
              onClick={() => setFiles([])}
            >
              Clear
            </button>
            <button className={`normal_button ${files.length === 0 ? "disabled_btn" : ""}`}>
              Provision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
