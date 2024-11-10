import ParisCup from "../_components/parisCup/parisCup";
import Collections from "../_components/collections/collections";
import Partners from "../_components/partners/partners";
import Blog from "../_components/blog/blog";
import About from "../_components/about/about";

const aboutText = {
  title: "ABOUT US",
  description: `Since 2014, as Paris's leading corporate caterer, Catering Project has
  delivered over 150,000 orders and is trusted by more than 8,000
  companies nationally. Our exceptional catering services for a range of
  corporate needs have established us as the preferred caterer in Paris\n As
  the leading catering company, we focus on delivering premium and amazing
  food for events such as wedding catering, corporate catering, private
  events and product or brand launch. 
  \nUsing premium ingredients and
  produce, mini food creations are assembled in crafted collection boxes,
  orders can be placed online and delivered the next day to more than 800
  suburbs across Paris..`,
  moreInfo: `From meetings and conferencing to large-scale sit-down seminars,
  boardrooms, brand launch events. \nCatering Project has all corporate
  and private events needs covered. We offer a diverse range of
  palates and dietary requirements. With our fleet of vehicles
  operating from our conveniently located city-based kitchen, our
  service is ideal for all occasions: corporate catering, deliverable
  catering, boardroom catering, conference and training catering,
  private events, picnics, canapé & cocktail events, grazing tables,
  adult and kids birthday parties, boat and private charter, schools,
  and universities. \nFor your convenience, our online shop is curated
  to ensure, no matter the type of catering you need, it can be easily
  found in our user-friendly categories: breakfast, morning tea,
  lunch, afternoon tea, and parties. Whether it's for intimate private
  dining, conferencing, large-scale sit-down events, or cocktail
  parties, Catering Project has your catered events needs covered with
  a range of specially designed sit-down and cocktail packages to
  cater for different levels of taste and service.\n Alternatively,
  custom selected menu items can be used to create a tailored, amazing
  food experience. The Catering Project team specializes in creating
  spectacular private and corporate events with quality wholesome food
  for every occasion across Paris. \nOur specialized team
  of chefs fuses passion with experience and the very best in locally
  sourced produce to present premium food offering from our CBD
  kitchen. Flexible bespoke packages are crafted to suit all
  preferences and dietary requirements, offering limitless options for
  an amazing catering experience.tering Project has all corporate and private events needs covered...`,
};

const Main = () => {
  return (
    <div>
      <ParisCup />
      <Collections />
      <Partners />
      <Blog />
      <About
        title={aboutText.title}
        description={aboutText.description}
        moreInfo={aboutText.moreInfo}
      />
    </div>
  );
};

export default Main;
