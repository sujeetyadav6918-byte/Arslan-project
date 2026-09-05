import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const navLinkClass = ({ isActive }) =>
    `transition font-medium ${
      isActive
        ? "text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}

          <Link
  to="/"
  className="flex items-center gap-2"
  onClick={closeMenu}
>
 <img
  src="/file_0000000040c08211b51a15aa6d3da96c%20(1).png"
  alt="FRAMIX Logo"
  className="w-10 h-10 object-contain rounded-full"
/>

  <span className="text-2xl font-bold text-slate-800">
    FRA<span className="text-blue-600">MIX</span>
  </span>
</Link>


          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-7">

           <NavLink
  to="/"
  end
  className={navLinkClass}
>
  Home
</NavLink>

<NavLink
  to="/about"
  className={navLinkClass}
>
  About
</NavLink>

            <NavLink
              to="/gallery"
              className={navLinkClass}
            >
              📸 Gallery
            </NavLink>

            <NavLink
              to="/videos"
              className={navLinkClass}
            >
              🎥 Videos
            </NavLink>

            {token ? (
              <NavLink
                to="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium"
              >
                👑 Admin
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium"
              >
                🔐 Login
              </NavLink>
            )}

          </div>


          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-slate-800"
            aria-label="Toggle Menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* MOBILE MENU */}

        {isOpen && (

          <div className="md:hidden pb-5 border-t">

            <div className="flex flex-col gap-4 pt-5">

              <NavLink
  to="/"
  end
  onClick={closeMenu}
  className={navLinkClass}
>
  🏠 Home
</NavLink>

<NavLink
  to="/about"
  onClick={closeMenu}
  className={navLinkClass}
>
  ℹ️ About
</NavLink>

              <NavLink
                to="/gallery"
                onClick={closeMenu}
                className={navLinkClass}
              >
                📸 Gallery
              </NavLink>

              <NavLink
                to="/videos"
                onClick={closeMenu}
                className={navLinkClass}
              >
                🎥 Videos
              </NavLink>

              {token ? (
                <NavLink
                  to="/admin"
                  onClick={closeMenu}
                  className="bg-blue-600 text-white text-center py-3 rounded-lg font-medium"
                >
                  👑 Admin
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="bg-blue-600 text-white text-center py-3 rounded-lg font-medium"
                >
                  🔐 Login
                </NavLink>
              )}

            </div>

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;