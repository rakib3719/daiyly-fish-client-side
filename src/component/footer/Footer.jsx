import footer from '../../assets/img/footer.jpg'
const Footer = () => {
  return (
    <div className="mt-56">
     <div
  className="hero  bg-fixed"
  style={{
    backgroundImage: `url(${footer})`,
  }}>
  <div className="hero-overlay bg-opacity-70"></div>
  <div className="hero-content py-10 ">
  <footer className=" text-white ">
        <div className="mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">DailyFish</h2>
            <p className="text-sm mb-4">
              Your one-stop online shop for the freshest and finest fish,
              sourced directly from the waters to your doorstep.
            </p>
            <p className="text-sm">© 2024 Syed Rakib Hasan and DailyFish. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="/" className="text-sm hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="https://facebook.com/groups/2298209890521616/" target="blank" className="text-sm hover:underline">
              Facebook Group
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/dailyfish24" className="text-sm hover:underline" target="blank">
                Facebook Page
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-sm hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Developer Info</h3>
            <p className="text-sm mb-2">Syed Rakib Hasan</p>
            <p className="text-sm mb-4">
              Email: <a href="sd.rakib36@gmail.com" className="underline hover:text-gray-300">sd.rakib36@gmail.com</a>
            </p>
            <p className="text-sm mb-4">Phone: +8801608538567</p>
            <div className="flex space-x-4">
              <a href="https://github.com/rakib3719" aria-label="GitHub" target="blank">
                <svg
                  className="w-6 h-6 fill-current text-white hover:text-gray-300 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.176c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.091-.746.084-.73.084-.73 1.205.084 1.838 1.242 1.838 1.242 1.07 1.832 2.809 1.303 3.495.997.107-.775.42-1.303.764-1.603-2.665-.307-5.466-1.334-5.466-5.932 0-1.312.468-2.385 1.24-3.225-.124-.308-.538-1.542.116-3.214 0 0 1.01-.323 3.3 1.23.96-.267 1.984-.4 3.004-.405 1.02.005 2.045.138 3.005.405 2.288-1.553 3.297-1.23 3.297-1.23.655 1.672.242 2.906.118 3.214.773.84 1.238 1.914 1.238 3.225 0 4.61-2.807 5.62-5.481 5.92.431.372.817 1.104.817 2.222v3.293c0 .32.215.694.825.575C20.565 22.092 24 17.594 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/srakib/" aria-label="LinkedIn" target="blank">
                <svg
                  className="w-6 h-6 fill-current text-white hover:text-gray-300 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.23 0H1.77C.792 0 0 .775 0 1.73v20.54C0 23.225.792 24 1.77 24h20.46c.977 0 1.77-.775 1.77-1.73V1.73C24 .775 23.207 0 22.23 0zM7.118 20.452H3.56V9h3.558v11.452zM5.34 7.79c-1.137 0-2.058-.932-2.058-2.082C3.282 4.616 4.203 3.684 5.34 3.684c1.137 0 2.058.932 2.058 2.082-.001 1.149-.921 2.083-2.058 2.083zM20.452 20.452h-3.558v-5.643c0-1.346-.027-3.077-1.873-3.077-1.874 0-2.161 1.464-2.161 2.975v5.746h-3.558V9h3.418v1.561h.05c.476-.9 1.637-1.847 3.372-1.847 3.605 0 4.268 2.374 4.268 5.462v6.276z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/msrh.koraibrakib/" aria-label="Facebook" target="blank">
                <svg
                  className="w-6 h-6 fill-current text-white hover:text-gray-300 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.891-4.788 4.655-4.788 1.325 0 2.463.099 2.794.142v3.24l-1.918.001c-1.503 0-1.795.715-1.795 1.764v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.4 24 24 23.4 24 22.675v-21.35C24 .6 23.4 0 22.675 0z" />
                </svg>
              </a>
              <a href="https://syed-rakib-portfolio.netlify.app/" aria-label="Portfolio" target="blank">
              <svg
  className="w-6 h-6 fill-current text-white hover:text-gray-300 transition-all"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
>
  <path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM4 4h16v2H4V4zm0 16V6h16v14H4zm7-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V8z" />
</svg>

              </a>
            </div>
          </div>
        </div>
      </footer>
  </div>
</div>
    </div>
  );
};

export default Footer;
