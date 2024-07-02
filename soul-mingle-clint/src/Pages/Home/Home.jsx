import Banner from "../../Component/Banner/Banner";
import HowItWorks from "../../Component/HowItWorks/HowItWorks";
import PremiumMembers from "../../Component/PremiumMembers/PremiumMembers";
import SuccessCounter from "../../Component/SuccessCounter/SuccessCounter";
import SuccessStory from "../../Component/SuccessStory/SuccessStory";


const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <PremiumMembers></PremiumMembers>
          <HowItWorks></HowItWorks>
          <SuccessCounter></SuccessCounter>
          <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;