import meet from '../../../assets/img/meet.jpg'
import meet2 from '../../../assets/img/meet3.jpg'
import icon1 from '../../../assets/img/meeticon1.png'
import icon2 from '../../../assets/img/meeticon 2.png'
import icon3 from '../../../assets/img/meeticon3.png'


const Meet = () => {
    return (
        <div className=" mt-40">
           <div
  className="hero  bg-fixed"
  style={{
    backgroundImage: `url(${meet})`,
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content md:px-4  lg:px-24 py-44  ">
    <div className="grid md:grid-cols-2 ">
      <div>

        <img src={meet2} alt=""  className=' w-full rounded-t-3xl   md:rounded-tr-none md:rounded-l-3xl h-full'/>
      </div>
      <div className='bg-white pb-12 md:pb-0 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl'>
<div className=' px-6 lg:px-12 pt-16'>
<p className='font-mono'>Daily Fish</p>
<h1 className='text-3xl font-bold'>Best Quality Check</h1>


{/* icon */}

<div className='sm:flex justify-between'>
<div className='mt-12 text-center '>
<img src={icon1} alt="" className='text-center mx-auto'/>
<h1 className='font-semibold text-lg '>Antibacterial <br /> Treatment</h1>
</div>
<div className='mt-12 text-center '>
<img src={icon2} alt="" className='mx-auto' />
<h1 className='font-semibold text-lg '>Antibacterial <br /> Treatment</h1>
</div>
<div className='mt-12 text-center'>
<img src={icon3} alt="" className='mx-auto'/>
<h1 className='font-semibold text-lg '>Laboratory <br /> Testing</h1>
</div>





</div>

<p className='mt-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

</div>


<button className='btn bg-[#aa1936] hover:bg-black transition-transform  duration-1000 text-white rounded-full px-14 mt-12 mb-8 ml-8'>Shop Now</button>
      </div>

    </div>
  </div>
</div> 
        </div>
    );
};

export default Meet;