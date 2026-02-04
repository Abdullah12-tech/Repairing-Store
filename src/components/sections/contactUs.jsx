const contactImg =
  "https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=600&q=80"; // replace with your image path

const ContactUs = () => {
  return (
    <section className="bg-secondary py-16 px-6">
      <div className="max-w-6xl m-auto flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden">
            <img
              src={contactImg}
              alt="Customer support"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <h3 className="text-red-600 text-xl font-semibold mb-2">
            Need help?
          </h3>

          <p className="text-gray-700 mb-6">
            Contact one of our specialists
          </p>

          <button className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 font-semibold rounded shadow">
            GET IN TOUCH
          </button>

          <div className="mt-6">
            <p className="text-lg font-bold">16 stores</p>
            <p className="text-gray-600">Pass by</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
