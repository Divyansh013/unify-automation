'use client'
import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
const handleStyle = { left: 10 };
function textNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
   let img;
   if(data.img === "gmail"){
      img = "gmail"
   }
   else if(data.img === "slack"){
        img = "slack"
     }
     else if(data.img === "schedule"){
        img = "scheduler"
     }
     else{
        img = "stopper"
     }
  return (
    <div className="flex items-center justify-center border border-solid py-[8px] px-[6px] bg-[#fff] rounded-[0.25rem] border-[#E0E3EB] rootnode hover:bg-[#6670850d]">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className='react-flow__handle'
      />
      <div className='flex h-[42px] w-[226px] '>
         <div className='flex items-center ml-2'>
            <img src={`./${img}.png`} className='h-[20px] w-[20px] '/>
            </div>
         <div className='flex flex-col ml-[10px]'>
             <p className='text-sm font-semibold text-[#344054] font-inter'>{data.heading}</p>
             <p className='text-sm font-medium text-[#667085] font-inter'>{data.value}</p>
         </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
         className='react-flow__handle'
      />
    </div>
  );
}
export default textNode;

