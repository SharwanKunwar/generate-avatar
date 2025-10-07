import React, { useEffect, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import 'animate.css';
import img from './assets/img.png'
import { toast, ToastContainer } from 'react-toastify';

const data = [
  {
    lable: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed="
  },
  {
    lable: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed="
  },
  {
    lable: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed="
  },
  {
    lable: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed="
  },
  {
    lable: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed="
  },
  {
    lable: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men"
  },
  {
    lable: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women"
  },

]

function App() {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("illustration");

  const generate = () => {
    const obj = data.find((item)=> item.value === option);
    const url = obj.url;

    if(option === "male" || option === "female"){
      const rand = Math.floor(Math.random()*99)+1;
      console.log(rand);
      const holeUrl = `${url}/${rand}.jpg`;
      console.log(holeUrl)
      setSrc(holeUrl);
    }else{

      const uniqueValue = Date.now();
      const imgUrl = url+uniqueValue;
      setSrc(imgUrl);
    }

    
    
  }
  
  const onOptionChange=(e)=>{
    const value = e.target.value
    setOption(value);
  }

  const downloadAvatar = (url) => {
    const a = document.createElement("a");
      a.href = url;
      a.download = `${Date.now()}.jpg`
      a.click();
      a.remove();
  }
  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied",{position:"top-center"})

  }

  useEffect(()=>{
    generate();
  },[option])

  return (
    <>
      <div className='overflow-hidden animate__animated animate__fadeIn min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center items-center text-white'>
          <div className='animate__animated animate__zoomInDown animate__fast w-full border max-w-md rounded-2xl shadow-xl backdrop-blur-2xl border-slate-700 p-10 flex flex-col items-center'>
            <img 
            src={src || img}
            className='w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg object-cover object-center'
            />

            <div className='text-center mt-1'>
              <h1 className='text-3xl font-bold tracking-wide'>Avatar Generator</h1>
              <p className='text-slate-300'>Generate unlimited avatars for you website</p>
            </div>

            <div className='bg-slate-900/60 w-full pr-5 mt-7 rounded-xl border border-white/30'>
               <select value={option} onChange={onOptionChange} className=' w-full border-none outline-none p-2 rounded-xl'>
                {
                  data.map((item, index)=>(
                    <option key={index} value={item.value} className='bg-black'>{item.lable}</option>
                  ))
                }
              </select>
            </div>

            {/* links */}
            <div className='bg-slate-900/60 w-full rounded-xl p-2 mt-2 border border-white/30 '>
              <p className='break-words'>{src}</p>
            </div>

           {/* buttons */}
           <div className='flex w-full gap-4 mt-7 justify-center'>
            <button onClick={generate} className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform p-2'>
              <i className="ri-arrow-right-up-line mr-1"></i>
              Change
              </button>

            <button onClick={()=>downloadAvatar(src)} className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform p-2'>
              <i className="ri-download-line mr-1"></i>
              Download
              </button>

              <button onClick={()=>copyLink(src)} className='flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform p-2'>
              <i className="ri-file-copy-line mr-1"></i>
                Copy
              </button>
           </div>


          </div>
          <ToastContainer/>
          <p className='animate__animated animate__flipInX text-[10px] text-neutral-400 mt-10'>Developed by Sharwan jung kunwar</p>
      </div>
    </>
  )
}

export default App
