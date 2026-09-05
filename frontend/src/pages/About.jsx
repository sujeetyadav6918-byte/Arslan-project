import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-blue-300"
              variants={scaleIn}
            >
              <span>ℹ️</span>
              <span className="font-semibold tracking-wide">ABOUT FRAMIX PLATFORM</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
              About Our Media Platform
            </h1>

            <p className="text-slate-300 text-lg mt-6 leading-relaxed">
              
Available for: Freelance Projects • Reels • Shorts • Photo Editing • Social Media Content • Creative Projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT + FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT - TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 font-semibold">WHO WE ARE</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              FRAMIX PASSIONATE VIDEO & PHOTO EDITOR
            </h2>

            <p className="text-slate-300 mt-6 leading-relaxed">
              Hi, I’m Arslan Sayyed, a passionate Video & Photo Editor And Photo & Video Grapher with 3+ years of experience in creating engaging, modern, and professional visual content
            </p>

            <p className="text-slate-300 mt-4 leading-relaxed">
             I specialize in short-form video editing, social media content, photo enhancement, cinematic color grading, and creative AI-powered editing. My goal is simple — to turn raw footage and ordinary photos into content that looks polished, creative, and attention-grabbing.
            </p>

            <Link
              to="/gallery"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-xl font-semibold transition"
            >
              📸 Explore Gallery
            </Link>
          </motion.div>

          {/* RIGHT - FEATURE BOXES */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureCard
              icon="📸"
              title="Photo Gallery"
              desc="Explore beautiful photos in an organized, responsive gallery."
              variants={scaleIn}
            />
            <FeatureCard
              icon="🎥"
              title="Video Gallery"
              desc="Watch videos with a smooth, modern, and fast experience."
              variants={scaleIn}
            />
            <FeatureCard
              icon="👑"
              title="Admin Control"
              desc="Manage all photos and videos from a single, secure dashboard."
              variants={scaleIn}
            />
            <FeatureCard
              icon="⚡"
              title="Fast & Modern"
              desc="Built for speed, performance, and responsive design on all devices."
              variants={scaleIn}
            />
          </motion.div>
        </div>
      </section>

      {/* ================= HOW TO UPLOAD PHOTOS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur"
        >
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-blue-400 font-semibold">FRAMIX by Arslan</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Short-Form Video Editor & Content Creator
            </h2>
            <p className="text-slate-300 mt-4">
              I help brands, creators & businesses go viral with
high-converting Reels, YOUTUBE & INSTAGRAM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <StepCard
              step="1"
              title="What I do"
              desc="🎬 Hook-driven Reels & Shorts Editing
🎨 Cinematic Color Grading + Photo Retouching"
            />
            <StepCard
              step="2"
              title="Turning Ideas Into Visuals"
              desc="🖼️ Thumbnails + Social Media Post Design
🤖 AI-Powered Editing for 3x faster delivery"
            />
            <StepCard
              step="3"
              title="Why brands work with me:"
              desc="Clean cuts • Trending edits • 24hr delivery • Brand-consistent style"
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              Supported formats usually include JPG, PNG for images and MP4, WebM for videos.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= MISSION SECTION ================= */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 via-[#0f1525] to-[#0b0f19] border border-white/10 rounded-3xl px-6 py-12"
          >
            <div className="text-5xl mb-5">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Work With Me?</h2>
            <p className="text-slate-300 text-lg leading-relaxed mt-6">
              I focus on clean editing, creative storytelling, smooth transitions, strong visuals, and attention to detail. Whether you need a Reel, YouTube Short, social media post, photo edit, or cinematic look, I aim to deliver content that represents your style and stands out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= TECHNOLOGY SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-400 font-semibold">TECHNOLOGY</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Built With Modern Technologies
          </h2>
          <p className="text-slate-400 mt-4">
            This project is built using 🛠️ Tools & Skills.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <TechCard icon="🎬" name="CapCut" variants={scaleIn} />
          <TechCard icon="🎨" name="PicsArt" variants={scaleIn} />
          <TechCard icon="🎥" name="VN Video Editor" variants={scaleIn} />
          <TechCard icon="📸" name="Adobe Lightroom" variants={scaleIn} />
           <TechCard icon="🤖" name="AI Editing Tools" variants={scaleIn} />
          <TechCard icon="✨" name="Photo Retouching & Enhancement" variants={scaleIn} />
          <TechCard icon="🎞️" name="Reels & Shorts Editing" variants={scaleIn} />
          <TechCard icon="🖼️" name="Thumbnail & Social Media Design
" variants={scaleIn} />
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
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
            <h2 className="text-3xl sm:text-4xl font-bold">
              Explore Our Media Collection
            </h2>
            <p className="text-slate-400 mt-4 text-lg">
              Discover amazing photos and videos on Farmix.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                to="/gallery"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 transition overflow-hidden"
              >
                <span className="relative z-10">📸 View Gallery</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                to="/videos"
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 hover:bg-white/5 transition"
              >
                <span>🎥 Watch Videos</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ================= HELPER COMPONENTS =================

function FeatureCard({ icon, title, desc, variants }) {
  return (
    <motion.div
      variants={variants}
      className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur hover:bg-white/10 transition"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-white mt-4">{title}</h3>
      <p className="text-slate-400 mt-2">{desc}</p>
    </motion.div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {step}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <p className="text-slate-400 mt-3">{desc}</p>
    </div>
  );
}

function TechCard({ icon, name, variants }) {
  return (
    <motion.div
      variants={variants}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur hover:bg-white/10 transition"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="font-bold text-white mt-3">{name}</h3>
    </motion.div>
  );
}

export default About;