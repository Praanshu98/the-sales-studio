import { useEffect, useState } from "react";

const Home = () => {
  const [coupon, setCoupon] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Failed to get IP address:", error);
      }
    };

    getIpAddress();
  }, []);

  const handleGetCoupon = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ipAddress: ipAddress,
        }),
        credentials: "same-origin",
      });

      if (!response.ok) {
        setLoading(false);
        const data = await response.json();
        if (data.error === "CLAIM_ALREADY_MADE_FROM_SAME_IP") {
          setError("You have already claimed coupon within the last minute");
          return;
        } else if (
          data.error === "CLAIM_ALREADY_MADE_FROM_SAME_BROWSER_SESSION"
        ) {
          setError("You have already claimed coupon from this browser session");
          return;
        }
        setError("Failed to claim coupon");
        return;
      }

      const data = await response.json();

      setCoupon(data.claim.coupon.code);
      setError(null);
      setLoading(false);
    } catch (e) {
      setError("Failed to claim coupon");
      console.error(e);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy coupon:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome, Visitor!
        </h1>
        <p className="mt-2 text-lg text-gray-200">
          Unlock your exclusive coupon now!
        </p>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <p className="text-xl text-gray-700 mb-6">Claim your coupon now!</p>
          <button
            onClick={handleGetCoupon}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-transform transform hover:scale-105 disabled:bg-gray-400"
            disabled={coupon || loading || error}
          >
            Claim Coupon
          </button>
          {loading && (
            <div className="mt-4 flex justify-center items-center">
              <p>Loading...</p>
            </div>
          )}
          {error && (
            <div className="mt-4 flex justify-center items-center">
              <p>{error}</p>
            </div>
          )}
          {coupon && (
            <div className="mt-4 flex justify-around items-center">
              <p className="text-xl font-bold text-green-600">
                Your Coupon is:
              </p>
              <div className="mt-2 flex gap-4 items-center  px-2 py-2 border-4 border-green-500 rounded-lg">
                <span className="text-lg font-mono">{coupon}</span>
                <button
                  onClick={handleCopy}
                  className="transition-transform transform hover:scale-105"
                >
                  {copied ? (
                    // Check icon when coupon is copied
                    <img
                      src="../../public/check.svg"
                      alt="Check icon"
                      className="h-6 w-6"
                    />
                  ) : (
                    // Copy icon
                    <img
                      src="../../public/copy_button.svg"
                      alt="Copy icon"
                      className="h-6 w-6"
                    />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="mt-8 text-center text-white">
        <p>
          &copy; {new Date().getFullYear()} Coupon App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
