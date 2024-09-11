import img from '../../assets/img/blackCover.png'
import fishImg from '../../assets/img/bannerFish.png'
import bannerImg from '../../assets/img/1st web banner.jpg'
// #2b97a4
const Banner = () => {
    return (
        <div>
    <div className="hero bg-fixed " >
  
  <div className="flex items-center mx-auto  text-neutral-content">
    {/* <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-[#2b97a4]">Daily Fish</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
    <div>
      <img src={fishImg} alt="" />
    </div> */}


    <img src={bannerImg} alt=""  className='w-full'/>
  </div>
</div>
        </div>
    );
};

export default Banner;