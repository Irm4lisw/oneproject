import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import store from "./store/store";
import { Provider } from "react-redux";
import Profile from "./pages/Profile";
import Favorite from "./pages/Favorite";
import Rating from "./pages/Rating";
import MovieList from "./pages/category/MovieList";
import TvList from "./pages/category/TvList";
import Search from "./pages/Search";
import { useState } from "react";
import ThemeContext from "./components/context/ThemeContext";
import Logout from "./pages/Logout";
import Footer from "./components/Footer";

function App() {
  const theme = useState("dark");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContext.Provider value={theme}>
          <Navbar>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/movie_list" element={<MovieList />} />
              <Route path="/tv_list" element={<TvList />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/logout" element={<Logout />}/>
            </Routes>
            <Footer/>
          </Navbar>
        </ThemeContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

{/* <div className="">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div> */}