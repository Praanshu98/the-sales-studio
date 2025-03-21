import { useState } from "react";

const Home = () => {
  const [coupon, setCoupon] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCoupon("ASDLKJ");
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
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex flex-col p-6">
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
            onClick={handleClick}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-transform transform hover:scale-105 disabled:bg-gray-400"
            disabled={coupon}
          >
            Claim Coupon
          </button>
          {coupon && (
            <div className="mt-4 flex justify-around items-center">
              <p className="text-xl font-bold text-green-600">
                Your Coupon is:
              </p>
              <div className="mt-2 flex gap-4 items-center inline-block px-2 py-2 border-4 border-green-500 rounded-lg">
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
                </button>{" "}
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
