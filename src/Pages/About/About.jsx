const About = () => {
  return (
    <div className="container mx-auto py-16 px-4 min-h-[60vh]">
      <h1 className="text-5xl font-extrabold text-center text-primary mb-8">
        About StyleDecor
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        StyleDecor is dedicated to transforming spaces into experiences. We
        connect you with top-rated decorators specialized in weddings, home
        makeovers, and corporate events. Our mission is to make professional
        decoration services accessible, efficient, and affordable for everyone.
      </p>

      <div className="stats shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Years in Service</div>
          <div className="stat-value text-primary">5+</div>
          <div className="stat-desc">Since 2020</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Projects Completed</div>
          <div className="stat-value text-secondary">2.5K+</div>
          <div className="stat-desc text-secondary">And counting</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Top Decorators</div>
          <div className="stat-value">50+</div>
          <div className="stat-desc">Highly rated professionals</div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-base-200 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
          <p className="text-gray-700">
            To be the leading platform for connecting clients with world-class
            interior and event designers globally, setting a new standard for
            quality and accessibility in the decoration industry.
          </p>
        </div>
        <div className="p-6 bg-base-200 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
          <p className="text-gray-700">
            To provide seamless technology solutions that empower decorators to
            grow their business and allow users to find the perfect style for
            any budget and occasion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
