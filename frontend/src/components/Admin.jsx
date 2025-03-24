import { useEffect, useState } from "react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("coupons");
  const [coupons, setCoupons] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data whenever the active tab changes
  useEffect(() => {
    if (activeTab === "coupons") {
      fetchCoupons();
    } else {
      fetchClaims();
    }
  }, [activeTab]);

  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/coupon/all");
      const data = await response.json();
      if (response.ok) {
        setCoupons(data.coupons);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to fetch coupons");
    }
    setLoading(false);
  };

  const fetchClaims = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/claim/all");
      const data = await response.json();
      if (response.ok) {
        setClaims(data.claims);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Failed to fetch claims");
    }
    setLoading(false);
  };

  const toggleCouponStatus = async (couponId, currentStatus) => {
    try {
      let url = `/api/v1/coupon/${currentStatus == true ? "deactivate" : "activate"}/${couponId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (response.ok) {
        fetchCoupons();
      }
    } catch (err) {
      console.error("Error toggling coupon status", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center text-white">
          Admin Panel
        </h1>
      </header>
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex space-x-4 mb-4 border-b">
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "coupons"
                ? "border-b-2 border-indigo-500 text-indigo-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("coupons")}
          >
            Coupons
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              activeTab === "claims"
                ? "border-b-2 border-indigo-500 text-indigo-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("claims")}
          >
            Claim History
          </button>
        </div>
        {loading && (
          <p className="text-center text-gray-600">Loading data...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
        {activeTab === "coupons" && !loading && !error && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Coupons List</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Code</th>
                  <th className="border p-2">Active</th>
                  <th className="border p-2">Claimed</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td className="border p-2 text-center">{coupon.code}</td>
                    <td className="border p-2 text-center">
                      {coupon.isActive ? "Yes" : "No"}
                    </td>
                    <td className="border p-2 text-center">
                      {coupon.isClaimed ? "Yes" : "No"}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() =>
                          toggleCouponStatus(coupon.id, coupon.isActive)
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "claims" && !loading && !error && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Claim History</h2>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Coupon Code</th>
                  <th className="border p-2">IP Address</th>
                  <th className="border p-2">Session ID</th>
                  <th className="border p-2">Claimed At</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="border p-2 text-center">
                      {claim.coupon?.code || "-"}
                    </td>
                    <td className="border p-2 text-center">
                      {claim.ipAddress}
                    </td>
                    <td className="border p-2 text-center">
                      {claim.sessionId}
                    </td>
                    <td className="border p-2 text-center">
                      {new Date(claim.claimedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
