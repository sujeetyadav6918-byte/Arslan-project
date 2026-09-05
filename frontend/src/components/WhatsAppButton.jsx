function WhatsAppButton() {
  const phoneNumber = "918928517101"; // अपना WhatsApp नंबर डालो

  const message = "Hello! Arsalan can u edit may video and photos.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-110 transition duration-300"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      💬
    </a>
  );
}

export default WhatsAppButton;