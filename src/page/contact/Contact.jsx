import { FaAddressBook, FaPhone } from 'react-icons/fa6';
import fish from '../../assets/img/fish.jpg'
import GoogleMapReact from 'google-map-react';
import { MdEmail } from 'react-icons/md';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import usePublicAxios from '../../hooks/usePublicAxios';
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {

    const {user} = useContext(AuthContext)
const axiosPublic = usePublicAxios()
const sendHandle = async(e)=>{

    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;
    const sendMessage = {
        email,
        name,
        phone,
        message,
        date: new Date().toLocaleDateString()
    }
 
    try {
        const resp = await axiosPublic.post('/contact', sendMessage)


if(resp?.data?.insertedId
){
    toast.success("Your Message is sent successfully")
    e.target.reset()
}

    } catch (error) {
        toast.error(error.message)
    }
}

    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const defaultProps = {
        center: {
          lat: 23.79464538684816, 
          lng: 90.41355399815481
        },
        zoom: 11
      };
    return (
        <div>
            <ToastContainer></ToastContainer>
            <div
                className="hero min-h-60 bg-fixed"
                style={{
                    backgroundImage: `url(${fish})`,
                }}>
                <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-bold">Contact</h1>
                    </div>
                </div>
            </div>
            <div style={{ height: '100vh',  }} className='mx-auto mt-24 md:w-[80%]'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>


<div className='md:flex justify-between gap-8 w-[80%] mx-auto mt-28 '>

    <div className='text-center border border-black p-10'>

<FaPhone className='text-[70px] mx-auto mb-4 rounded bg-[#aa1936] p-6 text-white'/>
<h1 className='font-bold'>Phone</h1>

<p><span className='font-bold'>Toll-Free:</span> 0000 - 123 - 456789
</p>
<p><span className='font-bold'>Fax:</span> 0000 - 123 - 456789</p>
    </div>
    
    <div className='text-center border border-black p-10'>

<MdEmail className='text-[70px] mx-auto mb-4 rounded bg-[#aa1936] p-6 text-white'/>
<h1 className='font-bold'>Email</h1>

<p> sd.rakib36@gmail.com
</p>
<p> bannah76769@gmail.com</p>
    </div>
    <div className='text-center border border-black p-10'>

<FaAddressBook className='text-[70px] mx-auto mb-4 rounded bg-[#aa1936] p-6 text-white'/>
<h1 className='font-bold'>Adress</h1>

<p> No: 58 A, East Madison Stree
</p>
<p> Baltimore, MD, USA 4508</p>
    </div>
    
</div>




{/* contact form */}
<div className='md:w-[50%] mt-24 text-center mx-auto px-4 md:px-0'>
<h1 className='text-center font-bold py-6 text-2xl'>Contact Form</h1>
    <form onSubmit={sendHandle}  className='space-y-6'>
    <input required type="text" name='name' placeholder="Name" className="input input-bordered w-full border-black rounded-full" />
    <input required type="email" value={user?.email} name='email' placeholder="Email" className="input input-bordered w-full border-black rounded-full" />
    <input required type="phone" name='phone' placeholder="Phone" className="input input-bordered w-full border-black rounded-full" />

    <textarea required name="message" id="message" placeholder='Message' className="input input-bordered h-32 w-full  border-black rounded-xl"></textarea>
<div className='flex'>
<button className='rounded-full text-white btn hover:bg-black px-12 bg-[#aa1936]'>Send</button>
</div>

    </form>
</div>
        </div>
    );
};

export default Contact;