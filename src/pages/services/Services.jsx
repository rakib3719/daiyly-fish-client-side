import { FaBoxArchive, FaLeaf } from 'react-icons/fa6';
import fish from '../../assets/img/fish.jpg'
import servicesImg from '../../assets/img/servicesImg.jpg'

const Services = () => {
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
                        <h1 className="mb-5 text-5xl font-bold">Services</h1>
                    </div>
                </div>
            </div>



            <div className='mt-24'>

  

<div className='   px-4 md:px-0 md:w-[80%] mx-auto md:flex items-center gap-12'>

<div className='  md:w-1/2 mt-12'>

    <img src={servicesImg} alt="" />
</div>


{/* about text */}
<div className='md:w-1/2 mt-8 md:mt-0'>

<h1 className='font-bold  text-xl pb-6'>Making Meat Taste Better</h1>

<p>Pellentesque euismod vestibulum sollicitudin. Nunc semnulla, consequat eget nisinon, efficitur posuere. Duis pretium pretium neque, amet ullamcorper dignissim rhoncus. Suspendisse efficitur venenatis aliquam. Aenean maximus venenatis, suscipit nequvitae, vestibulum neque. Etiam tempor facilisis turpis condimentum. Sed pharetra eratsed metus ornare, dapibus enmattis. Duis necodio euenim luctus volutpat sitamet purus. </p>
<button className="btn mt-8  bg-[#aa1936] border-none hover:text-black px-8 text-white rounded-full">Read more </button>

</div>

</div>

</div>


<div className='md:w-[80%] mt-16 mx-auto flex justify-center flex-col'>
<div className='text-center'>
<h1 className='mx-auto  font-mono'>Cravings For Meat</h1>
<h1 className='font-bold text-2xl'>Make Your Meal Interesting With Meat</h1>
</div>


<div className='  px-4 md:px-0 mt-14'>


<div className='md:flex gap-8'>
<div className=' group mb-14 md:mb-0'>


<div>
<div className='flex gap-4 items-center'>
<FaLeaf  className='group-hover:text-[#aa1936] transition-all duration-1000 text-4xl'/> 
<h1 className='text-xl font-bold'>Probably the best meat in the market</h1>
</div>

<p className='ml-14'>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut orci ipsum, rhoncus viverra sapien quis, accumsan interdum sapien. Etiam sit amet posuere est. Aenean congue nisi non odio mollis, vitae vulputate arcu consequat. Aliquam interdum mi quis risus dignissim ornare.</p>
</div>
</div>
<div className=' group '>


<div>
<div className='flex gap-4 items-center'>
<FaBoxArchive className='group-hover:text-[#aa1936] transition-all duration-1000 text-3xl'/> 
<h1 className='text-xl font-bold'>We handle meat with precious and care</h1>
</div>

<p className='ml-12'>Cras iaculis elit a quam lobortis, vitae malesuada nunc lobortis. Aliquam tempus fermentum ante, non hendrerit nisl pretium nec. Vestibulum sollicitudin libero eget neque cursus, vitae accumsan lacus varius. Suspendisse ut massa mi. Proin quis tortor eu leo viverra varius. Proin sollicitudin risus ligula.</p>
</div>
</div>

</div>




</div>

</div> 

<div className='md:w-[80%] px-4 md:px-0 mx-auto mt-28'>

    <h1 className='font-bold text-2xl'>Everyday Fish Package</h1>

    <p className='mt-8'>Maecenas aipsum volutpat, pharetra massa, facilisis dolor. Fusce sodales nibh maximus lacinia iaculis. Donec quis malesuada lectus. Donecet tincidunt elitvel euismod urna. Maecenas eget ligula avelit bibendum faucibus sitamet aclorem. Phasellus velturpis placerat, ornare mised, facilisis lorem. Morbi in quam in sapien sollicitudin efficitur vitae quis sapien. Nam commodo a urna consectetur efficitur. Donec malesuada neque sit amet dolor varius, a viverra urna facilisis.</p>


    <p className='mt-8'>
    Etiam viverra maximus turpis idvarius. Fusce hendrerit felis aneque varius. Etiam id tincidunt velit. Suspendisse arcu nulla, porta nec lacinia ac, blandit quis nunc. Sed porta lobortis nibh nec fermentum. Mauris cursus a tellus non vulputate. Sed vel lectus hendrerit enim vestibulum interdum ut sit amet nisl. Ut imperdiet tristique libero ut posuere. Nullam ullamcorper nec turpis ut porttitor.</p>




    <div className='mt-28'>
    <div className=''>

<div className='md:flex gap-8'>
<div>
<h1 className='font-bold text-lg'>Certified Halal Meate</h1>
<p className='mt-6'>Cras sagittis sapien tellus, lacinia susci vitae. Integer lectus lobortis laoreet.</p> 
</div>
<div>
<h1 className='font-bold text-lg'>Vaccum Sealed</h1>
<p className='mt-6'>Donec sed lorem dapibus, posuere, molestie. Vivamus aliquam gravida nibh, aliquam.</p> 
</div>


</div>
<div className='md:flex mt-14 gap-8'>
<div>
<h1 className='font-bold text-lg'>Medically Checked</h1>
<p className='mt-6'>Aliquam quamdiam, ornare luctus quisauctor. Vivamus sagittis estirlaoreet euismod.</p> 
</div>
<div>
<h1 className='font-bold text-lg'>Chemical & Preservative Free</h1>
<p className='mt-6'>Morbi quise vehicula libero. Quisque sagittis dapibus ligula eunieuismod lobortis.</p> 
</div>


</div>


</div>
    </div>
</div>





        </div>
    );
};

export default Services;