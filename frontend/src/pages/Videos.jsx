import { useEffect, useState } from "react";
import API from "../service/api";

function Videos() {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [previewVideo, setPreviewVideo] = useState(null);

  // Fetch Videos
  const getVideos = async () => {
    try {
      setLoading(true);

      const response = await API.get("/media");

      const data = response.data.media || response.data || [];

      // Only Videos
      const videos = data.filter(
        (item) => item.mediaType === "video"
      );

      setVideoList(videos);

    } catch (error) {
      console.error("Failed to fetch videos:", error);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getVideos();
  }, []);


  // Search Videos
  const filteredVideos = videoList.filter((item) =>
    item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <section className="bg-slate-900 text-white py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          <div className="text-6xl mb-4">
            🎥
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold">
            Video Gallery
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Watch our latest videos
          </p>

        </div>

      </section>


      {/* VIDEO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* SEARCH */}

        <div className="max-w-xl mx-auto mb-10">

          <div className="relative">

            <span className="absolute left-4 top-3 text-xl">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

          </div>

        </div>


        {/* RESULT COUNT */}

        {!loading && videoList.length > 0 && (

          <p className="text-gray-500 mb-6">

            Showing{" "}

            <span className="font-bold text-blue-600">
              {filteredVideos.length}
            </span>

            {" "}videos

          </p>

        )}


        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center py-20">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

              <p className="text-gray-500 mt-4">
                Loading videos...
              </p>

            </div>

          </div>

        ) : videoList.length === 0 ? (

          /* NO VIDEOS */

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-6xl">
              🎥
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              No Videos Available
            </h2>

            <p className="text-gray-500 mt-2">
              Videos uploaded by the admin will appear here.
            </p>

          </div>

        ) : filteredVideos.length === 0 ? (

          /* NO SEARCH RESULTS */

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-6xl">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              No Matching Videos
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with another title.
            </p>

          </div>

        ) : (

          /* VIDEO GRID */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredVideos.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group"
              >

                {/* VIDEO PREVIEW */}

                <div
                  onClick={() => setPreviewVideo(item)}
                  className="relative cursor-pointer overflow-hidden"
                >

                  <video
                    src={item.url}
                    className="w-full h-64 object-cover bg-black"
                    preload="metadata"
                  />

                  {/* PLAY OVERLAY */}

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition">

                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-3xl group-hover:scale-110 transition">

                      ▶️

                    </div>

                  </div>

                </div>


                {/* VIDEO DETAILS */}

                <div className="p-5">

                  <h2 className="text-xl font-bold text-slate-800">
                    {item.title}
                  </h2>

                  {item.description && (

                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {item.description}
                    </p>

                  )}

                  <button
                    onClick={() => setPreviewVideo(item)}
                    className="mt-4 text-blue-600 font-semibold hover:text-blue-800 transition"
                  >
                    ▶ Watch Video
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* VIDEO PREVIEW MODAL */}

      {previewVideo && (

        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewVideo(null)}
        >

          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition"
            >
              ✕
            </button>


            {/* VIDEO PLAYER */}

            <video
              src={previewVideo.url}
              controls
              autoPlay
              className="w-full max-h-[75vh] bg-black rounded-t-xl"
            />


            {/* VIDEO DETAILS */}

            <div className="bg-white rounded-b-xl p-5">

              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {previewVideo.title}
              </h2>

              {previewVideo.description && (

                <p className="text-gray-500 mt-2">
                  {previewVideo.description}
                </p>

              )}

              <div className="mt-4">

                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  🎥 Video
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Videos;