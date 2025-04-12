import "./App.css";
import { UrlShortenerForm } from "./components/UrlShortenerForm";

function App() {
  return (
    <div className="w-full justify-center items-center">
      <div className="flex w-full min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <main className="container max-w-2xl z-10 mt-12">
          <div className="rounded-2xl bg-[#1362dd] p-10 shadow-2xl shadow-blue-500/20 border border-blue-400/20">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                URL Shortener
              </h1>
              <p className="text-xl text-blue-100">
                Shorten your long URLs into clean and short links
              </p>
            </div>
            <UrlShortenerForm />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
