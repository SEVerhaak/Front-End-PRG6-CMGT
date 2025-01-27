import {Link, Outlet} from "react-router";

function Layout() {
    return (
      <div className="mx-auto max-w-screen-xl">
          <header>
              <nav className="bg-green-500 text-white shadow-md p-4 flex justify-center gap-6">
                  <Link
                      to="/"
                      className="p-2 text-white font-bold hover:bg-green-600 rounded transition"
                  >
                      Home
                  </Link>
                  <Link
                      to="/about"
                      className="p-2 text-white font-bold hover:bg-green-600 rounded transition"
                  >
                      About
                  </Link>
                  <Link
                      to="/speakers"
                      className="p-2 text-white font-bold hover:bg-green-600 rounded transition"
                  >
                      Speakers
                  </Link>
                  <Link
                      to="/speakers/create"
                      className="p-2 text-white font-bold hover:bg-green-600 rounded transition"
                  >
                      Create Speaker
                  </Link>
              </nav>

          </header>

          <main>
              <Outlet/>
          </main>

          <footer>
          </footer>
      </div>
    );
}

export default Layout;