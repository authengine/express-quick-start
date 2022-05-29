import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthengineProvider, MagicLinkValidationPage } from "@authengine/react";

import Home from "./pages/Home";
import User from "./pages/User";

function App() {
  return (
    <ChakraProvider>
      <AuthengineProvider
        apiUrl={process.env.REACT_APP_AUTHENGINE_API_URL}
        publicKey={process.env.REACT_APP_AUTHENGINE_PUBLIC_KEY}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/validate" element={<MagicLinkValidationPage />} />
          </Routes>
        </BrowserRouter>
      </AuthengineProvider>
    </ChakraProvider>
  );
}

export default App;
