import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { FaCopy, FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa"; // Font Awesome icons
import "./App.css";
import { uploadFile } from "./service/api";

function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const fileInputRef = useRef();

  // Handle file upload logic
  useEffect(() => {
    const getImages = async () => {
      if (files.length > 0) {
        const fileResults = [];

        for (let file of files) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await uploadFile(data);
          fileResults.push(response.path);
        }

        setResults(fileResults);
      }
    };

    getImages();
  }, [files]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const shareViaWhatsApp = (fileLink) => {
    const encodedLink = encodeURIComponent(fileLink);
    window.open(`https://wa.me/?text=${encodedLink}`, "_blank");
  };

  const shareViaGmail = (fileLink) => {
    const subject = encodeURIComponent("Shared File Link");
    const body = encodeURIComponent(`Here is the link to the file: ${fileLink}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  const shareViaSMS = (fileLink) => {
    const message = encodeURIComponent(`Here is the link to the file: ${fileLink}`);
    window.open(`sms:?body=${message}`, "_blank");
  };

  const copyToClipboard = (fileLink) => {
    navigator.clipboard.writeText(fileLink);
    alert("Link copied to clipboard!");
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>AK Share</h1>
        <p>Upload and share your files with ease.</p>

        {/* Upload button directly below the text */}
        <div className="upload-btn-container">
          <button onClick={onUploadClick}>Upload Files</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </div>
      </div>

      {/* Upload result section */}
      {results.length > 0 && (
        <div className="upload-result">
          <div className="file-details-container">
            {results.map((result, index) => (
              <div key={index} className="file-details">
                <div className="file-name">{files[index].name}</div>
                <a href={result} target="_blank" rel="noopener noreferrer" className="file-link">
                  {result}
                </a>
                <QRCodeCanvas value={result} size={128} className="qr-code" />

                <div className="share-buttons">
                  <button onClick={() => shareViaWhatsApp(result)} className="whatsapp">
                    <FaWhatsapp /> Share via WhatsApp
                  </button>
                  <button onClick={() => shareViaGmail(result)} className="gmail">
                    <FaEnvelope /> Share via Gmail
                  </button>
                  <button onClick={() => shareViaSMS(result)} className="sms">
                    <FaPhoneAlt /> Share via SMS
                  </button>
                  <button onClick={() => copyToClipboard(result)} className="copy">
                    <FaCopy /> Copy Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2025 AK Share. All rights reserved.</p>
        <p>Developed by <strong>Alok Kushwaha</strong></p>
      </footer>
    </div>
  );
}

export default App;
