import { Outlet } from "react-router-dom";
import TopAnnouncementBar from "../components/organisms/TopAnnouncementBar";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import { useAuth } from "../context/AuthContext";

export default function PublicLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <TopAnnouncementBar />
      <Header isAuthenticated={!!user} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
