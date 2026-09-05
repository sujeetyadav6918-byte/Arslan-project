import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-auto">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND SECTION */}

          <div>

            <h2 className="text-3xl font-bold">
              FRA<span className="text-blue-500">MIX</span>
            </h2>

            <p className="text-slate-400 mt-4 leading-relaxed">
             📞 Phone: 8928517101
            </p>
            <p className="text-slate-400 mt-4 leading-relaxed">
             📧 Email: arslansayyed91@gmail.com
            </p>

          </div>


          {/* QUICK LINKS */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <Link
                to="/"
                className="hover:text-blue-400 transition"
              >
                🏠 Home
              </Link>

              <Link
                to="/about"
                className="hover:text-blue-400 transition"
              >
                ℹ️ About Us
              </Link>

              <Link
                to="/gallery"
                className="hover:text-blue-400 transition"
              >
                📸 Gallery
              </Link>

              <Link
                to="/videos"
                className="hover:text-blue-400 transition"
              >
                🎥 Videos
              </Link>

            </div>

          </div>


          {/* ADMIN */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Admin
            </h3>

            <p className="text-slate-400 mb-4">
              Manage all photos and videos from the admin dashboard.
            </p>

            <Link
              to="/admin"
              className="inline-block bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium transition"
            >
              👑 Admin Dashboard
            </Link>

          </div>


          {/* SOCIAL MEDIA */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Follow Us
            </h3>

            <p className="text-slate-400 mb-5">
              Connect with us on social media.
            </p>


            {/* SOCIAL ICONS */}

            <div className="flex flex-wrap gap-3">

              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-xl transition"
                title="Facebook"
              >
                📘
              </a>


              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/framix.arslan?utm_source=qr&igsi=dXRoeGR4NnFnaGM2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-pink-600 rounded-full flex items-center justify-center text-xl transition"
                title="Instagram"
              >
                📸
              </a>


              {/* YOUTUBE */}

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-red-600 rounded-full flex items-center justify-center text-xl transition"
                title="YouTube"
              >
                ▶️
              </a>


              {/* TWITTER / X */}

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-black rounded-full flex items-center justify-center text-xl transition"
                title="X"
              >
                𝕏
              </a>


              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-blue-700 rounded-full flex items-center justify-center text-xl transition"
                title="LinkedIn"
              >
                💼
              </a>


              {/* WHATSAPP */}

              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-green-600 rounded-full flex items-center justify-center text-xl transition"
                title="WhatsApp"
              >
                💬
              </a>


              {/* TELEGRAM */}

              <a
                href="https://telegram.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-slate-800 hover:bg-sky-500 rounded-full flex items-center justify-center text-xl transition"
                title="Telegram"
              >
                ✈️
              </a>

            </div>

          </div>

        </div>


        {/* DIVIDER */}

        <div className="border-t border-slate-700 mt-10 pt-6">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">

            <p>
              © {currentYear} MediaHub. All rights reserved.
            </p>

            <p>
              Built with ❤️ using MERN Stack
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;