import fish from '../../assets/img/fish.jpg'
import aboutImg from '../../assets/img/about.jpg'
import fish2 from '../../assets/img/fish2.jpg'
import seaf1 from '../../assets/img/sheaf1.jpg'
import seaf2 from '../../assets/img/seaf2.jpg'
import seaf3 from '../../assets/img/seaf3.jpg'
import seaf4 from '../../assets/img/seaf4.jpg'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'

const About = () => {
    return (
        <div>

          <div
                className="hero min-h-60 bg-fixed"
                style={{
                    backgroundImage: `url(${fish})`,
                }}>
                <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-bold">About Us</h1>
                    </div>
                </div>
            </div>

<div className='mt-24'>

    <h1 className='text-2xl font-bold text-center'>World's Best Meat Shop</h1>

<div className='   px-4 md:px-0 md:w-[80%] mx-auto md:flex items-center gap-12'>

<div className='  md:w-1/2 mt-12'>

    <img src={aboutImg} alt="" />
</div>


{/* about text */}
<div className='md:w-1/2 mt-8 md:mt-0'>
<p className='text-gray-600'>Eros ludus laboramus ne eam. Mea inani utamur rationibus eu, his ei assum volutpat. Integre dolorem mel an, mei nihil omittam et. Postea regione mentitum ei quo, debitis phaedrum conceptam vis at. Fugit choro scriptorem nam an, vel ex possit audire. Qui elitr graeci referrentur ad, eu ludus laudem tincidunt vel, ad vim wisi graeci efficiendi.
</p>


<h1 className='font-bold mt-8 text-[#aa1936]'>- Al imran    <span className='ml-8  font-normal font-mono text-black'>Caretaker</span> </h1>
</div>

</div>

</div>









{/* offer banner */}

<div
  className="hero bg-fixed  mt-16"
  style={{
    backgroundImage: `url(${fish2})`,
  }}>
  <div className="hero-overlay bg-opacity-70"></div>
  <div className="hero-content py-16 text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-3xl font-bold">Feel The Fish Flavors  <br /> 30% Off </h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn  bg-[#aa1936] border-none hover:text-black px-8 text-white rounded-full">Read more </button>
    </div>
  </div>
</div>


{/* sheaf details */}



<div className='md:flex gap-6 pt-16 md:w-[80%] mx-auto'>

<div className='relative group'>
<img src={seaf1} alt="" className='group-hover:opacity-50 transition-all duration-1000'/>


<div className='flex gap-4 absolute  bottom-0 left-0 right-0 opacity-0 transition-all duration-1000 ease-in-out group-hover:bottom-16 group-hover:opacity-100 mb-8 justify-center'>

    <FaFacebook className='text-white bg-black p-2 text-3xl'/>
    <FaInstagram className='text-white bg-black p-2 text-3xl'/>
    <FaLinkedin className='text-white bg-black p-2 text-3xl'/>
    <FaYoutube className='text-white bg-black p-2 text-3xl'/>
</div>

<div className='bg-black text-white text-center p-4'>
    <h1 className='font-bold '>Alicia Woods</h1>
    <p>Market Manager</p>
</div>
</div>
<div className='relative group'>
<img src={seaf2} alt="" className='group-hover:opacity-50 transition-all duration-1000'/>


<div className='flex gap-4 absolute  bottom-0 left-0 right-0 opacity-0 transition-all duration-1000 ease-in-out group-hover:bottom-16 group-hover:opacity-100 mb-8 justify-center'>

    <FaFacebook className='text-white bg-black p-2 text-3xl'/>
    <FaInstagram className='text-white bg-black p-2 text-3xl'/>
    <FaLinkedin className='text-white bg-black p-2 text-3xl'/>
    <FaYoutube className='text-white bg-black p-2 text-3xl'/>
</div>

<div className='bg-black text-white text-center p-4'>
    <h1 className='font-bold '>Andry Harris</h1>
    <p>Butcher</p>
</div>
</div>
<div className='relative group'>
<img src={seaf3} alt="" className='group-hover:opacity-50 transition-all duration-1000'/>


<div className='flex gap-4 absolute  bottom-0 left-0 right-0 opacity-0 transition-all duration-1000 ease-in-out group-hover:bottom-16 group-hover:opacity-100 mb-8 justify-center'>

    <FaFacebook className='text-white bg-black p-2 text-3xl'/>
    <FaInstagram className='text-white bg-black p-2 text-3xl'/>
    <FaLinkedin className='text-white bg-black p-2 text-3xl'/>
    <FaYoutube className='text-white bg-black p-2 text-3xl'/>
</div>

<div className='bg-black text-white text-center p-4'>
    <h1 className='font-bold '>Mindy reyers</h1>
    <p>Meat carvar</p>
</div>
</div>
<div className='relative group'>
<img src={seaf4} alt="" className='group-hover:opacity-50 transition-all duration-1000'/>


<div className='flex gap-4 absolute  bottom-0 left-0 right-0 opacity-0 transition-all duration-1000 ease-in-out group-hover:bottom-16 group-hover:opacity-100 mb-8 justify-center'>

    <FaFacebook className='text-white bg-black p-2 text-3xl'/>
    <FaInstagram className='text-white bg-black p-2 text-3xl'/>
    <FaLinkedin className='text-white bg-black p-2 text-3xl'/>
    <FaYoutube className='text-white bg-black p-2 text-3xl'/>
</div>

<div className='bg-black text-white text-center p-4'>
    <h1 className='font-bold '>Dwight Clark</h1>
    <p>Meat Cutter</p>
</div>
</div>





</div>

        </div>
    );
};

export default About;