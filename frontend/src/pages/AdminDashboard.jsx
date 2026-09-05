import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../service/api";

function AdminDashboard() {
  const navigate = useNavigate();

  // Upload States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Media States
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch = (item.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || item.mediaType === filterType;

    return matchesSearch && matchesFilter;
  });

  const totalMedia = mediaList.length;
  const totalImages = mediaList.filter(
    (item) => item.mediaType === "image"
  ).length;
  const totalVideos = mediaList.filter(
    (item) => item.mediaType === "video"
  ).length;

  const imagePercentage =
    totalMedia > 0
      ? Math.round((totalImages / totalMedia) * 100)
      : 0;

  const videoPercentage =
    totalMedia > 0
      ? Math.round((totalVideos / totalMedia) * 100)
      : 0;

  const today = new Date().toDateString();
  const todayUploads = mediaList.filter((item) => {
    if (!item.createdAt) return false;

    return new Date(item.createdAt).toDateString() === today;
  }).length;

  const recentMedia = [...mediaList]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleString();
  };

  // Edit States
  const [editingMedia, setEditingMedia] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Replace States
  const [replacingId, setReplacingId] = useState(null);
  const [replaceFile, setReplaceFile] = useState(null);

  // Get All Media
  const getAllMedia = async () => {
    try {
      setFetchLoading(true);

      const response = await API.get("/media");

      setMediaList(response.data.media || []);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  // Protect Admin Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    if (user.role !== "admin") {
      navigate("/login");
      return;
    }

    getAllMedia();
  }, [navigate]);

  // Upload Media
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a photo or video");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("media", file);

      await API.post("/media/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Media uploaded successfully 🎉");

      setTitle("");
      setDescription("");
      setFile(null);

      document.getElementById("mediaFile").value = "";

      await getAllMedia();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Start Edit
  const startEdit = (item) => {
    setEditingMedia(item);
    setEditTitle(item.title);
    setEditDescription(item.description || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Update Media
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/media/${editingMedia._id}`,
        {
          title: editTitle,
          description: editDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Media updated successfully ✏️");

      setEditingMedia(null);

      await getAllMedia();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  // Delete Media
  const handleDelete = async () => {
    if (!selectedMedia) return;

    try {
      setDeleteLoading(true);

      const token = localStorage.getItem("token");

      await API.delete(`/media/${selectedMedia._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Media deleted successfully 🗑️");

      setMediaList((prevMedia) =>
        prevMedia.filter((item) => item._id !== selectedMedia._id)
      );

      setDeleteModal(false);
      setSelectedMedia(null);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete media"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // Replace Media
  const handleReplace = async (id) => {
    if (!replaceFile) {
      toast.error("Please select a new file");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("media", replaceFile);

      await API.put(
        `/media/${id}/replace`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Media replaced successfully 🔄");

      setReplaceFile(null);
      setReplacingId(null);

      await getAllMedia();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Replace failed"
      );
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              👑 Admin Dashboard
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Manage your photos and videos
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>

        </div>
      </div>


      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        {/* DASHBOARD STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Media</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {totalMedia}
                </h2>
              </div>

              <div className="text-5xl">📁</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Photos</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {totalImages}
                </h2>
              </div>

              <div className="text-5xl">📸</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Videos</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {totalVideos}
                </h2>
              </div>

              <div className="text-5xl">🎥</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Today's Uploads</p>
                <h2 className="text-4xl font-bold text-slate-800 mt-2">
                  {todayUploads}
                </h2>
              </div>

              <div className="text-5xl">📅</div>
            </div>
          </div>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 font-medium">📸 Images</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {imagePercentage}%
                </h2>
              </div>

              <div className="text-5xl">📸</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-5">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${imagePercentage}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {totalImages} Images out of {totalMedia} media
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 font-medium">🎥 Videos</p>
                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {videoPercentage}%
                </h2>
              </div>

              <div className="text-5xl">🎥</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-5">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${videoPercentage}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {totalVideos} Videos out of {totalMedia} media
            </p>
          </div>
        </div>

        {/* RECENTLY UPLOADED MEDIA */}
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                🕒 Recently Uploaded
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Latest media added to your website
              </p>
            </div>

            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              Latest 5
            </span>
          </div>

          {recentMedia.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl">📂</div>

              <p className="text-gray-500 mt-3">
                No media uploaded yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentMedia.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border rounded-xl p-3 hover:bg-slate-50 transition"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                    {item.mediaType === "image" ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        🎥
                      </div>
                    )}
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-slate-800 truncate">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.mediaType === "image" ? "📸 Image" : "🎥 Video"}
                      {" • "}
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`hidden sm:block text-xs font-semibold px-3 py-1 rounded-full ${
                      item.mediaType === "image"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.mediaType.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* EDIT SECTION */}
        {editingMedia && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border">

            <h2 className="text-2xl font-bold mb-5">
              ✏️ Edit Media
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >

              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Media Title"
                required
              />

              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Media Description"
                rows="4"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Update Media
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditingMedia(null)
                  }
                  className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        )}


        {/* UPLOAD SECTION */}
        <div className="bg-white rounded-xl shadow-lg p-5 sm:p-8 mb-8">

          <h2 className="text-2xl font-bold mb-2">
            📤 Upload Media
          </h2>

          <p className="text-gray-500 mb-6">
            Upload photos and videos to your website.
          </p>

          <form
            onSubmit={handleUpload}
            className="space-y-5"
          >

            <div className="grid md:grid-cols-2 gap-5">

              {/* TITLE */}
              <div>
                <label className="font-semibold">
                  Media Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter media title"
                  className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>


              {/* FILE */}
              <div>
                <label className="font-semibold">
                  Select Photo / Video
                </label>

                <input
                  id="mediaFile"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                  className="w-full mt-2 border rounded-lg p-3 cursor-pointer"
                  required
                />

                {file && (
                  <p className="text-green-600 text-sm mt-2">
                    Selected: {file.name}
                  </p>
                )}

              </div>

            </div>


            {/* DESCRIPTION */}
            <div>

              <label className="font-semibold">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Write something about this media..."
                rows="4"
                className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Uploading...
                </>
              ) : (
                "📤 Upload Media"
              )}
            </button>

          </form>

        </div>


        {/* MEDIA MANAGEMENT */}
        <div>

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                📂 Manage Media
              </h2>

              <p className="text-gray-500 mt-1">
                Total Media: {mediaList.length}
              </p>
            </div>

            <button
              onClick={getAllMedia}
              className="bg-white border shadow px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              🔄 Refresh
            </button>

          </div>


          {/* LOADING */}
          {fetchLoading ? (

            <div className="text-center py-10">
              <p className="text-gray-500">
                Loading media...
              </p>
            </div>

          ) : mediaList.length === 0 ? (

            <div className="bg-white rounded-xl p-10 text-center shadow">

              <div className="text-5xl mb-4">
                📂
              </div>

              <h3 className="text-xl font-bold">
                No Media Found
              </h3>

              <p className="text-gray-500 mt-2">
                Upload your first photo or video.
              </p>

            </div>

          ) : (

            <>
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700">
                      🔍 Search Media
                    </label>

                    <input
                      type="text"
                      placeholder="Search by title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">
                      📂 Filter Media
                    </label>

                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">📁 All Media</option>
                      <option value="image">📸 Images</option>
                      <option value="video">🎥 Videos</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-bold text-blue-600">
                    {filteredMedia.length}
                  </span>{" "}
                  of {mediaList.length} media
                </div>
              </div>

              {filteredMedia.length === 0 ? (
                <div className="col-span-full bg-white rounded-xl shadow p-10 text-center">
                  <div className="text-5xl mb-4">🔍</div>

                  <h3 className="text-xl font-bold">
                    No Matching Media Found
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Try changing your search or filter.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {filteredMedia.map((item) => (

                    <div
                      key={item._id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                    >

                  {/* IMAGE OR VIDEO */}

                  {item.mediaType === "image" ? (

                    <img
                      src={item.url}
                      alt={item.title}
                      onClick={() => setPreviewMedia(item)}
                      className="w-full h-56 object-cover cursor-pointer hover:scale-105 transition duration-300"
                    />

                  ) : (

                    <div
                      onClick={() => setPreviewMedia(item)}
                      className="cursor-pointer relative"
                    >
                      <video
                        src={item.url}
                        className="w-full h-56 object-cover bg-black"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="text-5xl">▶️</div>
                      </div>
                    </div>

                  )}


                  {/* CARD CONTENT */}

                  <div className="p-5">

                    <div className="flex justify-between items-start gap-3">

                      <h3 className="font-bold text-lg">
                        {item.title}
                      </h3>

                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {item.mediaType}
                      </span>

                    </div>


                    <p className="text-gray-500 text-sm mt-3 min-h-[40px]">
                      {item.description ||
                        "No description available"}
                    </p>


                    {/* ACTION BUTTONS */}

                    <div className="flex flex-wrap gap-2 mt-5">

                      <button
                        onClick={() => startEdit(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        ✏️ Edit
                      </button>


                      <button
                        onClick={() =>
                          setReplacingId(item._id)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        🔄 Replace
                      </button>


                 <button
  onClick={() => {
    setSelectedMedia(item);
    setDeleteModal(true);
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
>
  🗑️ Delete
</button>

                    </div>


                    {/* REPLACE SECTION */}

                    {replacingId === item._id && (

                      <div className="mt-5 border-t pt-4">

                        <p className="font-semibold mb-3">
                          Select New File
                        </p>

                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={(e) =>
                            setReplaceFile(
                              e.target.files[0]
                            )
                          }
                          className="w-full text-sm"
                        />

                        <div className="flex gap-2 mt-4">

                          <button
                            onClick={() =>
                              handleReplace(item._id)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                          >
                            Confirm Replace
                          </button>


                          <button
                            onClick={() => {
                              setReplacingId(null);
                              setReplaceFile(null);
                            }}
                            className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-lg text-sm"
                          >
                            Cancel
                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                    </div>

                  ))}

                </div>
              )}
            </>

          )}

        </div>

      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal && selectedMedia && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>

              <h2 className="text-2xl font-bold text-slate-800">
                Delete Media?
              </h2>

              <p className="text-gray-500 mt-3">
                Are you sure you want to delete
                <span className="font-bold text-slate-700">
                  {" "}{selectedMedia.title}
                </span>
                ?
              </p>

              <p className="text-red-500 text-sm mt-2">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedMedia(null);
                }}
                disabled={deleteLoading}
                className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  "🗑️ Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEDIA PREVIEW MODAL */}
      {previewMedia && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewMedia(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white w-11 h-11 rounded-full text-xl font-bold transition"
            >
              ✕
            </button>

            {previewMedia.mediaType === "image" ? (
              <img
                src={previewMedia.url}
                alt={previewMedia.title}
                className="w-full max-h-[75vh] object-contain"
              />
            ) : (
              <video
                src={previewMedia.url}
                controls
                autoPlay
                className="w-full max-h-[75vh] object-contain bg-black"
              />
            )}

            <div className="bg-white p-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                {previewMedia.title}
              </h2>

              {previewMedia.description && (
                <p className="text-gray-500 mt-2">
                  {previewMedia.description}
                </p>
              )}

              <div className="mt-3">
                <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                  {previewMedia.mediaType === "image"
                    ? "📸 Image"
                    : "🎥 Video"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;