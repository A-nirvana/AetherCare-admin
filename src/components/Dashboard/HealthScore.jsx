import { Archivo } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // use weights you need
});
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // You can choose weights as needed
});
const HealthScore = () => {
    return (
      <div className="bg-[#f4f3ff] rounded-xl px-6 py-5 flex justify-between items-center shadow-md mb-6 min-w-200">
        <div>
          <h2 className={`${archivo.className} text-[1.3rem] font-semibold text-gray-800`}>Lives Saved</h2>
          <p className={`${inter.className} text-sm text-gray-600 mt-1 font-light`}>
            Based on week's data, lives saved are <strong className="font-bold">118</strong>.
          </p>
          <a href="/statistics" className="text-blue-500 text-sm mt-2 inline-block pt-6">
            Tell me more &gt;
          </a>
        </div>
        <div className="bg-pink-500 text-white font-bold text-xl rounded-lg px-6 py-3 shadow-lg">
          118
        </div>
      </div>
    );
  };

  export default HealthScore;
