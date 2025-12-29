import CommonHeader from '@/components/shared/CommonHeader';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function page() {

  return (
    <div className="">        
    <div className="h-screen  flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Connection Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your account has been successfully connected. You're all set to get started!
          </p>

          {/* Success Details */}
          <div className="bg-green-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                Account verified and ready to use
              </span>
            </div>
          </div>

          {/* Navigate Home Button */}
          <Link href="/"> <button            
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Go to Home
          </button></Link>          
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Need help? <a href="#" className="text-green-600 hover:text-green-700 font-medium">Contact Support</a>
        </p>
      </div>
    </div>
    </div>
  );
}