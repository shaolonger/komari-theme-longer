import { useEffect } from "react";

const ManagePage = () => {
  useEffect(() => {
    // Redirect to backend admin panel
    window.location.href = "/admin";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Redirecting to admin panel...</p>
    </div>
  );
};

export default ManagePage;
