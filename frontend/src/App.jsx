import { useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeGenerator from "qrcode";
import { ToastContainer, toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/shorten`, {
        originalUrl: url,
        customAlias: customAlias || undefined,
      });

      setShortUrl(res.data.shortUrl);
      setCopied(false);

      const qr = await QRCodeGenerator.toDataURL(res.data.shortUrl);
      setQrImage(qr);

      toast.success(res.data.message || "URL shortened successfully 🚀");
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 400) {
        toast.error(message || "Invalid URL");
      } else if (status === 409) {
        toast.warning(message || "Alias already exists");
      } else {
        toast.error(message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="fixed w-[500px] h-[500px] bg-purple-600/30 blur-[120px] rounded-full top-[-150px] left-[-150px]" />
      <div className="fixed w-[500px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full bottom-[-150px] right-[-150px]" />

      <div className="relative flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl sticky top-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
          <h1 className="text-center text-4xl sm:text-5xl font-extrabold">
            🔗 URL <span className="text-indigo-400">Shortener</span>
          </h1>

          <p className="text-center text-slate-400 mt-2">
            Create short & custom links instantly
          </p>

          <input
            className="w-full mt-6 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 outline-none focus:border-indigo-500"
            placeholder="Enter long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            className="w-full mt-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 outline-none focus:border-indigo-500"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />

          <button
            onClick={handleShorten}
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Shortening..." : "Generate Link"}
          </button>

          {shortUrl && (
            <div className="mt-8 space-y-4">
              {/* LINK BOX */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700">
                <p className="text-xs text-slate-400 mb-2">Your short link</p>

                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-indigo-400 break-all"
                >
                  {shortUrl}
                </a>

                <button
                  onClick={handleCopy}
                  className={`mt-3 w-full py-2 rounded-lg font-semibold transition shadow-md ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-indigo-500 hover:bg-indigo-400 text-white"
                  }`}
                >
                  {copied ? "Copied ✅" : "Copy Link"}
                </button>
              </div>

              <div className="flex flex-col items-center bg-white rounded-xl p-5">
                <QRCodeCanvas value={shortUrl} size={160} />

                <p className="text-black mt-2 font-semibold">Scan QR 📱</p>

                {qrImage && (
                  <button
                    onClick={handleDownloadQR}
                    className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Download QR
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-slate-400 text-sm mt-10">
          Designed And Developed By{" "}
          <span className="text-white font-semibold">Durgesh</span> 💖
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
