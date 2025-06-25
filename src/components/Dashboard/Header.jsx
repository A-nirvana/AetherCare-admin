import { Oleo_Script } from 'next/font/google';

const oleo = Oleo_Script({
  subsets: ['latin'],
  weight: ['400'], // Only 400 is available
});

const Header = () => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div className="flex space-x-5">
        <img
          src="https://res.cloudinary.com/dmhbmurzw/image/upload/v1750704375/contact-person-red-icon-free-png_fdnlmt.png"
          alt="Image"
          className="w-15 h-15"
        />
        <div>
          <h1 className={`${oleo.className} text-3xl text-gray-800`}>
            Good Day, AetherCare
          </h1>
          <p className="text-sm text-gray-500 mt-1">Medical ID: 2025179001</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Something"
        className="px-4 py-2 border rounded-lg text-sm shadow-md outline-none"
      />
    </div>
  );
};

export default Header;
