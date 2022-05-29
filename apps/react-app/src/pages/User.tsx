import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthengine } from "@authengine/react";

export default function User() {
  const { user, logout } = useAuthengine();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <nav className="px-5 py-2 container mx-auto flex items-center border rounded shadow">
        <h1 className="text-lg font-semibold flex-grow">authengine demo</h1>
        <Button colorScheme="red" onClick={handleLogout}>
          Log out
        </Button>
      </nav>
      <div className="mt-10 px-4 container mx-auto max-w-screen-md">
        <h1 className="text-2xl lg:text-5xl font-semibold mb-5">
          Howdy there, {user?.name}
        </h1>
        <p className="text-lg lg:text-2xl">
          You're now logged in to Authengine's Express-React demo app. Ready to
          give Authengine a try? Visit{" "}
          <a className="underline text-blue-800" href="https://authengine.co">
            authengine.co
          </a>{" "}
          to get started with a free developer account.
        </p>
      </div>
    </div>
  );
}
