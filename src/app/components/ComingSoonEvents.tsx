import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 sm:p-8 md:p-10 text-center shadow-soft">
      <div className="mb-4 sm:mb-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-terracotta rounded-full flex items-center justify-center mx-auto shadow-medium">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 font-inter">
        Coming Soon
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto font-bold font-poppins">
        Follow us on our social media and stay updated for our next Tree Tour.
      </p>
    </div>
  );
};

export default ComingSoon;