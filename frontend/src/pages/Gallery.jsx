import { useEffect, useState } from "react";
import API from "../service/api";

function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [previewMedia, setPreviewMedia] = useState(null);

  // Fetch Media
  const getMedia = async () => {
    try {
      setLoading(true);

      const response = await API.get("/media");

      const data = response.data.media || response.data || [];

      // Only Images
      const images = data.filter(
        (item) => item.mediaType === "image"
      );

      setMediaList(images);

    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  // Search Images
  const filteredImages = mediaList.filter((item) =>
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
            📸
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold">
            Photo Gallery
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Explore our collection of amazing photos
          </p>

        </div>

      </section>


      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* SEARCH */}

        <div className="max-w-xl mx-auto mb-10">

          <div className="relative">

            <span className="absolute left-4 top-3 text-xl">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

          </div>

        </div>


        {/* RESULT COUNT */}

        {!loading && mediaList.length > 0 && (

          <p className="text-gray-500 mb-6">

            Showing{" "}

            <span className="font-bold text-blue-600">
              {filteredImages.length}
            </span>

            {" "}photos

          </p>

        )}


        {/* LOADING */}

        {loading ? (

          <div className="flex justify-center py-20">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

              <p className="text-gray-500 mt-4">
                Loading photos...
              </p>

            </div>

          </div>

        ) : mediaList.length === 0 ? (

          /* NO PHOTOS */

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-6xl">
              📸
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              No Photos Available
            </h2>

            <p className="text-gray-500 mt-2">
              Photos uploaded by the admin will appear here.
            </p>

          </div>

        ) : filteredImages.length === 0 ? (

          /* NO SEARCH RESULT */

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <div className="text-6xl">
              🔍
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              No Matching Photos
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with another title.
            </p>

          </div>

        ) : (

          /* IMAGE GRID */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredImages.map((item) => (

              <div
                key={item._id}
                onClick={() => setPreviewMedia(item)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>


                {/* DETAILS */}

                <div className="p-5">

                  <h2 className="text-xl font-bold text-slate-800">
                    {item.title}
                  </h2>

                  {item.description && (

                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {item.description}
                    </p>

                  )}

                  <div className="mt-4 text-blue-600 font-semibold text-sm">

                    Click to view 🔍

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* IMAGE PREVIEW MODAL */}

      {previewMedia && (

        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewMedia(null)}
        >

          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition"
            >
              ✕
            </button>


            {/* IMAGE */}

            <img
              src={previewMedia.url}
              alt={previewMedia.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />


            {/* DETAILS */}

            <div className="bg-white rounded-b-xl p-5">

              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {previewMedia.title}
              </h2>

              {previewMedia.description && (

                <p className="text-gray-500 mt-2">
                  {previewMedia.description}
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Gallery;