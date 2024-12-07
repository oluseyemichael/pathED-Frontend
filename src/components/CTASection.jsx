import React from 'react'

const CTASection = () => {
    return (
        <div className="text-center items-center justify-center">
            <div className="bg-white p-8 w-full text-center">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">
                    Guided Learning Paths for Future-Ready Skills
                </h1>
                <p className="text-gray-600 mb-6">
                    Lorem ipsum dolor sit amet consectetur. Nullam consectetur ornare sed ut voluptat mi mauris id commodo. Vel sit libertis trisque nulla elementum enim in nisi praesent. Eget enim eget gravida pellentesque massa quam.
                </p>
            </div>
            <div className='text-center'>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center text-center">
                    <span>Get Started</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
      );
    };

export default CTASection
