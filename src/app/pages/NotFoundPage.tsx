import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-6xl text-primary mb-4">404</h1>
        <h2 className="text-2xl mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate("/home")}
          className="bg-primary hover:bg-primary/90"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
