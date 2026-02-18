

 import Image from 'next/image';
import notFoundPage from '../assets/images/notfound.png'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-9 text-center">
      
    <Image
  src={notFoundPage}
  alt="Not Found"
  width={300}
  height={300}
  className='mb-5'
/>

      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-[#77756b] text-white rounded-lg hover:bg-[#524f46]"
      >
        Back to Home
      </Link>
    </div>
  );
}
