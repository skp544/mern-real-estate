import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeInOut" } },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay: 0.5, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, delay: 0.5, ease: "easeInOut" },
    },
  };

  const memberVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        staggerChildren: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const testimonialVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        staggerChildren: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto paddings py-12"
    >
      <h1 className="text-4xl font-bold text-orange-primary mb-6">
        About Dream Dwellings
      </h1>
      <motion.div
        variants={motion.div}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <motion.div variants={contentVariants} className="md:order-2">
          <p className="text-lg text-gray-600 mb-6">
            Dream Dwellings is a leading real estate marketplace committed to
            providing exceptional services to homebuyers and sellers worldwide.
            Since our inception in 2024, we&apos;ve helped thousands of clients
            achieve their real estate goals, whether it&apos;s finding the
            perfect home or selling their property at the best value.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our core values revolve around integrity, transparency, and customer
            satisfaction. We believe in building long-lasting relationships with
            our clients and providing them with personalized solutions tailored
            to their unique needs.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            At Dream Dwellings, we take pride in our dedicated team of real
            estate professionals who are passionate about helping individuals
            and families navigate the complexities of the real estate market.
            Our experienced agents are equipped with the latest market insights
            and technology to ensure a seamless experience for our clients.
          </p>
        </motion.div>
        <motion.div
          variants={imageVariants}
          className="flex justify-center md:order-1"
        >
          <img
            src="/house.jpg"
            alt="About Dream Dwellings"
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Team</h2>
        <motion.div
          variants={memberVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Team members */}
          <motion.div className="flex flex-col items-center">
            <img
              src="/john.jpg"
              alt="Team Member 1"
              className="w-full rounded-lg shadow-lg mb-2 hover:scale-105 duration-200 transition-all"
            />
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-gray-600">Real Estate Agent</p>
          </motion.div>
          <motion.div className="flex flex-col items-center">
            <img
              src="/jane.jpg"
              alt="Team Member 2"
              className="w-full rounded-lg shadow-lg mb-2 hover:scale-105 duration-200 transition-all"
            />
            <h3 className="text-lg font-semibold">Jane Smith</h3>
            <p className="text-gray-600">Real Estate Consultant</p>
          </motion.div>
          <motion.div className="flex flex-col items-center">
            <img
              src="/alex.jpg"
              alt="Team Member 3"
              className="w-full rounded-lg shadow-lg mb-2 hover:scale-105 duration-200 transition-all"
            />
            <h3 className="text-lg font-semibold">Alex Johnson</h3>
            <p className="text-gray-600">Property Manager</p>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Testimonials</h2>
        <motion.div
          variants={testimonialVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Testimonials */}
          <motion.div className="p-6 bg-blue-tertiary rounded-lg">
            <p className="text-lg text-gray-800 mb-4">
              &quot;Dream Dwellings helped me find the perfect home for my
              family. Their agents were professional, knowledgeable, and
              attentive to my needs. I highly recommend their services.&quot;
            </p>
            <p className="text-gray-600">- Sarah Johnson</p>
          </motion.div>
          <motion.div className="p-6 bg-blue-tertiary rounded-lg">
            <p className="text-lg text-gray-800 mb-4">
              &quot;I listed my property with Dream Dwellings and was impressed
              by their marketing strategies and expertise. They managed to sell
              my house quickly and at a great price. Thank you!&quot;
            </p>
            <p className="text-gray-600">- Michael Brown</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
