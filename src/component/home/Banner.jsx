import img from '../../assets/img/blackCover.png'
import fishImg from '../../assets/img/bannerFish.png'
import bannerImg from '../../assets/img/1st web banner.jpg'
import banner from '../../assets/img/banner.jpg'
import banner2 from '../../assets/img/banner6.jpg'
// #aa1936
const Banner = () => {
    return (
        <div>
    <div className="hero bg-fixed   "
    
    style={{
      backgroundImage: `url(${banner})`,
    }}
    >

  
  <div className="md:flex px-8 items-center mx-auto  text-neutral-content">
    <div className="max-w-md mt-12 md:mt-0">
      <h1 className="mb-5 text-5xl font-bold text-[#aa1936]">Daily Fish</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
 
    </div>
    <div>
      <img src={fishImg} alt="" />
    </div>


    {/* <img src={bannerImg} alt=""  className='w-full'/> */}
  </div>
</div>
        </div>
    );
};

export default Banner;