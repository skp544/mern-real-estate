import {
  Companies,
  Contact,
  GetStarted,
  Hero,
  Residencies,
  Value,
} from "../components";

const Homepage = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Homepage;
