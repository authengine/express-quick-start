import { Helmet } from "react-helmet";
import { Authenticator } from "@authengine/react";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Authengine Express-React Demo</title>
      </Helmet>
      <div className="flex w-screen min-h-screen bg-gray-100">
        <div className="basis-1/2">
          <h1 className="text-3xl font-semibold">Authengine Demo</h1>
          <p>Lorem ipsume.</p>
        </div>
        <div className="basis-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Authenticator callbackUrl="test" />
        </div>
      </div>
    </>
  );
}
