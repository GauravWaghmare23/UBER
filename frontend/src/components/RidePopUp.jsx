import React from 'react'

const RidePopUp = (props) => {
    return (
        <div className='w-full'>
            <div className='flex flex-row items-center justify-between px-4'>
                <h1 className='text-2xl font-semibold my-4'>New Ride Available!</h1>
            </div>
            <div className="flex items-center justify-between py-4 px-2 bg-amber-400 mx-2 rounded-2xl my-3">
                <div className="flex items-center gap-3">
                    <img
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
                        alt="driver"
                    />
                    <div>
                        <h1 className="text-sm font-semibold">Gaurav Waghmare</h1>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-sm font-semibold">2.2 KM</h2>
                </div>
            </div>
            <div className='flex flex-col justify-between items-center w-full mb-4'>
                <div className='w-full px-4 py-2 flex flex-col gap-4'>
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
                <button onClick={()=>{
                    props.setConfirmRidePopupPanel(true)
                    props.setRidePopupPanel(false)
                }} className='text-xl w-[90%] mt-6 font-medium bg-green-400 text-white px-4 py-2 rounded-xl'>Accept</button>
                <button onClick={()=>{
                    props.setRidePopupPanel(false);
                }} className='text-xl w-[90%] mt-6 font-medium bg-gray-400 text-gray-900 px-4 py-2 rounded-xl'>Ignore</button>

            </div>
        </div>
    )
}

export default RidePopUp
