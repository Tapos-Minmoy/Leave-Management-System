import React from 'react';

function PreviousLeave () {
    const openFormPage = () => {
      // Logic to open the form page
      console.log("Opening form page...");
    };
  return (
    <div className="flex justify-center items-center bg-white max-md:px-5">
      <div className="flex flex-col mt-10 w-full max-w-[1123px] max-md:mt-10 max-md:max-w-full">
        <div className="self-center text-4xl font-bold leading-9 text-center text-black max-md:max-w-full">
          Previous Application Details
        </div>
      
        <div className="flex mt-10 gap-0 px-3 py-2.5  text-sm max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 text-gray-700 whitespace-nowrap">
            <div className="justify-center items-start py-1.5 pr-16 pl-2.5 text-xl font-bold leading-8 text-black bg-gray-200 max-md:pr-5">
              Categories
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="grow my-auto">Study Leave Application</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-zinc-200">
              <div className="flex-auto my-auto">Others</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="grow my-auto">Sick Leave Application</div>
            </div>
          </div>
          <div className="flex flex-col flex-1 text-gray-700 whitespace-nowrap">
            <div className="justify-center items-start py-1.5 pr-16 pl-2.5 text-xl font-bold leading-8 text-black bg-gray-200 max-md:pr-5">
              Leave Type Details
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="grow my-auto">Study Leave Application</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-zinc-200">
              <div className="flex-auto my-auto">Others</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="grow my-auto">Sick Leave Application</div>
            </div>
          </div>
          <div className="flex flex-col flex-1 text-gray-700 whitespace-nowrap">
            <div className="justify-center items-start py-1.5 pr-16 pl-2.5 text-xl font-bold leading-8 text-black bg-gray-200 max-md:pr-5">
            Progress Summery
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="grow my-auto">Pending</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-zinc-200">
              <div className="flex-auto my-auto">Rejected</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="grow my-auto">Pending</div>
            </div>
          </div>
          <div className="flex flex-col flex-1 text-gray-700 whitespace-nowrap">
            <div className="justify-center items-start py-1.5 pr-12 pl-2 text-xl font-bold leading-8 text-black bg-gray-200 max-md:pr-5">
              See Applications
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <a className="underline grow my-auto cursor-pointer hover:text-blue-500" onClick={openFormPage}>Click here</a>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <a className="underline grow my-auto cursor-pointer hover:text-blue-500" onClick={openFormPage}>Click here</a>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <a className="underline grow my-auto cursor-pointer hover:text-blue-500" onClick={openFormPage}>Click here</a>
            </div>
          </div>
              <div className="flex flex-col flex-1 text-gray-700 whitespace-nowrap">
            <div className="justify-center items-start py-1.5 pr-16 pl-2.5 text-xl font-bold leading-8 text-black bg-gray-200 max-md:pr-5">
              See Progress
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="underline grow my-auto cursor-pointer hover:text-blue-500" onClick={openFormPage}>Detailed progress</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="underline grow my-auto cursor-pointer hover:text-blue-500" onClick={openFormPage}>Detailed progress</div>
            </div>
            <div className="flex gap-2.5 justify-between p-2.5 mt-2 tracking-normal bg-white">
              <div className="underline grow my-auto cursor-pointer hover:text-blue-500" onClick={openFormPage}>Detailed progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }

export default PreviousLeave;
