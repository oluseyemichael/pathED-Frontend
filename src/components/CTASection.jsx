import React from 'react'
import { useNavigate } from 'react-router-dom';

const REGISTER_ROUTE = '/signup';

const SignupSection = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate(REGISTER_ROUTE);
    };

    return (
        <div className='text-center mb-14'>
            <div className=' flex flex-row space-x-2 cursor-pointer text-center mx-auto' onClick={handleSignup}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 pl-4 pr-6 rounded-br-full rounded-tr-full rounded-tl-none rounded-bl-full flex items-center">
                    <span className="mr-2">Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform -rotate-45" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const CTASection = () => {
    return (
        <div className="text-center items-center justify-center">
            <div className="mt-20 flex justify-center">
  <img src="assets/ctaImg.png" alt="" className="sm:block md:hidden lg:hidden" />
  <img src="assets/ctaImgLg.png" alt="" className="hidden md:block" />
</div>
            <div className="bg-white p-8 w-full text-center ">
                <h1 className="text-2xl font-aeonik font-medium text-blue-500 mb-4">
                    Guided Learning Paths for Future-Ready Skills
                </h1>
                <p className="text-gray-600 mb-6 text-sm">
                    Master essential skills with step-by-step guidance. Our curated paths combine top resources and practical exercises to help you achieve your goals with ease.
                </p>
            </div>
            <div className="flex justify-center">
                <SignupSection />
            </div>
        </div>
    );
};

export default CTASection
