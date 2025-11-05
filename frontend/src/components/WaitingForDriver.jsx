import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div className='w-full'>
            <div className='flex bg-black flex-row items-center justify-between py-3 px-6'>
                <div>
                    <h1 className='text-white text-2xl font-bold'>Meet at the pickup Point</h1>
                </div>
                <div className='text-white'>
                    <button onClick={()=>{
                        props.setWaitingDriverPanel(false)
                    }} className='bg-white text-black px-2 py-1 rounded-md'>Leave</button>
                </div>

            </div>
            <div className='flex flex-row items-center justify-between px-4 py-4'>
                <div>
                    <img className='object-cover h-24' src="data:image/jpeg;base64,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" alt="car" />
                </div>
                <div className='text-right'>
                    <h1 className='text-xl font-semibold'>Gaurav Waghmare</h1>
                    <h1 className='font-semibold'>MH07 AB 1234</h1>
                    <p className='text-gray-600'>Maruti Suzuki alto</p>
                </div>
            </div>
            
            <div className='flex flex-col justify-between items-center'>
                <div className='w-full px-4 py-2 flex flex-col gap-4'>
                    <hr className='w-full text-gray-400 my-2' />
                    <div className='flex flex-row items-center gap-2'>
                        <h2><i className="ri-map-pin-add-fill ri-xl"></i></h2>
                        <div>
                            <h2 className='text-2xl font-semibold'>562/ 11-A</h2>
                            <h4 className='font-normal text-gray-500'>Kaikondhrali, Bengluru, Karnataka</h4>
                        </div>
                    </div>
                    <hr className='w-full text-gray-400 my-2' />
                    <div className='flex flex-row items-center gap-2'>
                        <h2><i className="ri-square-fill ri-xl"></i></h2>
                        <div>
                            <h2 className='text-2xl font-semibold'>Third Wave Coffee</h2>
                            <h4 className='font-normal text-gray-500'>17th cross roads pwd quarters, 1st Sector, HSR Layout, Bengluru ,Karanataka</h4>
                        </div>
                    </div>
                    <hr className='w-full text-gray-400 my-2' />
                    <div className='flex flex-row items-center gap-4'>
                        <i className="ri-wallet-fill ri-xl"></i>
                        <h2 className='text-2xl font-semibold'>Rs.196.89</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver
