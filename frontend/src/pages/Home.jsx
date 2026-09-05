import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../service/api";

function Home() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Media
  const getMedia = async () => {
    try {
      setLoading(true);

      const response = await API.get("/media");

      const data = response.data.media || response.data || [];

      setMediaList(data);
    } catch (error) {
      console.error("Failed to fetch media:", error);
      setMediaList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  // Statistics
  const totalPhotos = mediaList.filter(
    (item) => item.mediaType === "image"
  ).length;

  const totalVideos = mediaList.filter(
    (item) => item.mediaType === "video"
  ).length;

  const totalMedia = mediaList.length;

  // Latest 6 Media
  const latestMedia = [...mediaList]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 6);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white overflow-x-hidden">
      {/* ================= HERO SECTION (3D-feel) ================= */}
      <section className="relative">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-blue-300"
              variants={scaleIn}
            >
              <span>📸 🎥</span>
              <span className="font-semibold tracking-wide">FRAMIX PLATFORM</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
              Share Your
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {" "}Photos & Videos{" "}
              </span>
              With The World
            </h1>

            <p className="text-slate-300 text-lg mt-6 leading-relaxed">
             For commissions & collaborations,
PLEASE CONTACT BELOW WHATSAPPS:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                to="/gallery"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 transition overflow-hidden"
              >
                <span className="relative z-10">📸 Explore Gallery</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/videos"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/5 transition"
              >
                <span>🎥 Watch Videos</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= REAL STATISTICS (Glass + 3D cards) ================= */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {/* PHOTOS */}
            <StatCard
              icon="📸"
              label="Total Photos"
              value={loading ? "..." : totalPhotos}
              gradient="from-blue-600 to-cyan-600"
              variants={scaleIn}
            />

            {/* VIDEOS */}
            <StatCard
              icon="🎥"
              label="Total Videos"
              value={loading ? "..." : totalVideos}
              gradient="from-indigo-600 to-purple-600"
              variants={scaleIn}
            />

            {/* TOTAL MEDIA */}
            <StatCard
              icon="📁"
              label="Total Media"
              value={loading ? "..." : totalMedia}
              gradient="from-cyan-600 to-emerald-600"
              variants={scaleIn}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= LATEST UPLOADS (3D hover cards) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Latest Uploads 🆕
            </h2>
            <p className="text-slate-400 mt-2">
              Recently uploaded photos and videos
            </p>
          </motion.div>

          <Link
            to="/gallery"
            className="text-blue-400 font-semibold hover:text-blue-300 transition"
          >
            View Gallery →
          </Link>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : latestMedia.length === 0 ? (
          <motion.div
            className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl">📂</div>
            <h3 className="text-2xl font-bold text-white mt-4">No Media Yet</h3>
            <p className="text-slate-400 mt-2">
              Admin uploaded photos and videos will appear here.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {latestMedia.map((item) => (
              <MediaCard key={item._id} item={item} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ================= CTA (Futuristic panel) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          className="relative bg-gradient-to-br from-slate-900 via-[#0f1525] to-[#0b0f19] border border-white/10 rounded-3xl text-white text-center px-6 py-16 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-5xl mb-5">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Explore Our Media Collection
            </h2>
            <p className="text-slate-400 mt-4">
              Discover amazing photos and videos uploaded by our ARSLAN.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                to="/gallery"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 transition overflow-hidden"
              >
                <span className="relative z-10">📸 Photos</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/videos"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/5 transition"
              >
                <span>🎥 Videos</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ================= HELPER COMPONENTS =================

function StatCard({ icon, label, value, gradient, variants }) {
  return (
    <motion.div
      variants={variants}
      className="relative group"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-md"
           style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      />
      <div className={`relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-lg`}>
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} text-2xl shadow-inner`}>
          {icon}
        </div>
        <h2 className="text-4xl font-extrabold mt-4">{value}</h2>
        <p className="text-slate-300 mt-2">{label}</p>
      </div>
    </motion.div>
  );
}

function MediaCard({ item }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
      }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur"
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Media */}
      {item.mediaType === "image" ? (
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="relative">
          <video
            src={item.url}
            className="w-full h-64 object-cover bg-black transition-transform duration-500 group-hover:scale-105"
            preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="text-5xl drop-shadow-lg">▶️</div>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <span className="text-xl">
            {item.mediaType === "image" ? "📸" : "🎥"}
          </span>
        </div>
        {item.description && (
          <p className="text-slate-400 text-sm mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent" />
      </div>
    </motion.div>
  );
}

export default Home;