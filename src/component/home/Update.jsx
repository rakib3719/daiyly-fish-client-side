import fish1 from '../../assets/img/fish.jpg'
import fish2 from '../../assets/img/fish2.jpg'
import fish3 from '../../assets/img/fish3.jpg'

const Update = () => {
    return (
        <div className='px-12 mx-auto  pt-12 pb-24 mt-24 border-b'>
            <div >

 <h1 className="text-center text-3xl font-semibold">           Our Latest Updates</h1>
            </div>

<section  className='mt-16 grid md:grid-cols-3 justify-center gap-14'>


<div className=""> {/* Set the width to match the image */}
  <div className='relative group overflow-hidden'>
    <img src={fish1} alt="" className='w-96 rounded-t' />

    <p className='bg-[#aa1936cb] px-4 py-2 text-white absolute bottom-0 left-0 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
      September 8, 2020
    </p>
  </div>

  <h1 className='font-bold text-2xl mt-6'>Vitamins and minerals for brain function</h1>
  <p className='mt-4'>Mauris sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida...</p>
</div>
<div className=""> {/* Set the width to match the image */}
  <div className='relative group overflow-hidden'>
    <img src={fish2} alt="" className='w-96 rounded-t' />

    <p className='bg-[#aa1936cb] px-4 py-2 text-white absolute bottom-0 left-0 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
      September 8, 2020
    </p>
  </div>

  <h1 className='font-bold text-2xl mt-6'>What happens when you eat seafood</h1>
  <p className='mt-4'>Pris sed aliquam nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Ae...</p>
</div>
<div className=""> {/* Set the width to match the image */}
  <div className='relative group overflow-hidden'>
    <img src={fish3} alt="" className='w-96 rounded-t' />

    <p className='bg-[#aa1936cb] px-4 py-2 text-white absolute bottom-0 left-0 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
      September 8, 2020
    </p>
  </div>

  <h1 className='font-bold text-2xl mt-6'>Beef - a Large Source of L-Carnitined</h1>
  <p className='mt-4'>Ruis curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus t...</p>
</div>

 



  





</section>

        </div>
    );
};

export default Update;