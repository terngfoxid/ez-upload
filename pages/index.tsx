import Head from 'next/head'
import { Inter } from '@next/font/google'
import { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  type dataType = null | Blob
  type dataIMGType = any | { fileName: string }

  const [image, setImage] = useState<dataType>(null);
  const [createObjectURL, setCreateObjectURL] = useState("");
  const [imageOutURL, setImageOutURL] = useState<dataIMGType>(null);
  const [errorM, setErrorM] = useState("");
  const [errorM2, setErrorM2] = useState("");
  const [buttonTip, setButtonTip] = useState(false);

  const uploadToClient = (event: { target: { files: FileList | null } }) => {
    if (event.target.files && event.target.files[0]) {
      const acceptedImageTypes = ['image/png', 'image/webp', 'image/jpg', 'image/jpeg', 'image/gif']
      if (!acceptedImageTypes.includes(event.target.files[0].type)) {
        setErrorM("ประเภทไฟล์ไม่ถูกต้อง")
        setImage(null)
        setCreateObjectURL("")
        return
      }
      const i = event.target.files[0];
      if (i.size > 15728640) {
        setErrorM("ไฟล์มีขนาดใหญ่กว่า 15Mb")
        setImage(null)
        setCreateObjectURL("")
        return
      }
      setErrorM("")
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    if (image != null) {
      body.append("file", image);
    }
    axios.post('/api/upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((resp) => {
      console.log(resp)
      if (resp.status === 201) {
        setErrorM2("อัพโหลดรูปภาพสำเร็จ")
        console.log(resp)
        console.log('File uploaded');
        setImageOutURL(resp.data)
      }
      else {
        setErrorM2("!!อัพโหลดรูปภาพไม่สำเร็จ")
        console.log('Error in Process');
        console.log("<--Try-Again-Later-->")
      }
    });
    /*
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
    const loaddata = await response.json()
    setImageOutURL(loaddata)
    */
  };

  return (
    <>
      <Head>
        <title>EZ Uploader</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='h-screen'>
        <div className='w-full h-full bg-[url(/yuki.png)] bg-cover'>
          <br></br>
          <div className='flex justify-center'>
            <div className='rounded-xl w-11/12 sm:w-5/6 md:w-1/2 lg:w-1/3 2xl:w-1/4 border-2 border-stone-800 bg-zinc-800/80'>
              <div className='rounded-t-lg relative'>

                <div className='rounded-t-lg w-full z-1'>
                  <div className='flex justify-center'>
                    <h1 className="text-2xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">ยินดีต้อนรับเข้าสู่ EZ Uploader</h1>
                  </div>
                  <br></br>
                  <div className='flex justify-center items-center'>
                    <svg fill="white" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 2.75h-28c-0.69 0-1.25 0.56-1.25 1.25v0 24c0 0.037 0.018 0.068 0.021 0.104 0.020 0.173 0.067 0.33 0.137 0.474l-0.004-0.009c0.040 0.074 0.083 0.137 0.132 0.196l-0.002-0.002c0.053 0.069 0.111 0.129 0.174 0.183l0.002 0.001c0.028 0.023 0.043 0.055 0.073 0.076 0.042 0.025 0.091 0.050 0.142 0.071l0.008 0.003c0.035 0.021 0.078 0.042 0.122 0.061l0.008 0.003c0.129 0.053 0.278 0.085 0.435 0.088l0.002-0 0 0h28c0.69-0.001 1.249-0.56 1.25-1.25v-24c-0-0.69-0.56-1.25-1.25-1.25h-0zM28.75 5.25v12.62l-5.709-8.563c-0.24-0.318-0.617-0.521-1.041-0.521s-0.801 0.203-1.039 0.518l-0.002 0.003-7.243 10.865-3.935-3.148c-0.212-0.17-0.484-0.273-0.781-0.273-0.422 0-0.796 0.209-1.022 0.529l-0.003 0.004-4.726 6.751v-18.784zM4.401 26.75l4.859-6.941 3.959 3.168c0.209 0.171 0.478 0.274 0.772 0.274 0.071 0 0.14-0.006 0.208-0.018l-0.007 0.001c0.356-0.056 0.656-0.256 0.846-0.537l0.003-0.004 6.96-10.439 6.75 10.126v4.37zM8 13.25c1.795 0 3.25-1.455 3.25-3.25s-1.455-3.25-3.25-3.25c-1.795 0-3.25 1.455-3.25 3.25v0c0.002 1.794 1.456 3.248 3.25 3.25h0zM8 9.25c0.414 0 0.75 0.336 0.75 0.75s-0.336 0.75-0.75 0.75c-0.414 0-0.75-0.336-0.75-0.75v0c0.001-0.414 0.336-0.749 0.75-0.75h0z"></path>
                    </svg>
                    <p className='text-xl font-bold text-neutral-200'>&nbsp;&nbsp;โยนไฟล์ jpg/png/gif/webp ใส่ตรงนี้</p>
                  </div>
                  <p className='text-center pt-2 text-xl font-bold text-neutral-200'>[ขนาดไฟล์ไม่เกิน 15Mb]</p>
                  <br></br>
                  {errorM != "" ?
                    <>
                      <div className='flex justify-center items-center'>
                        <p className='text-xl font-bold text-neutral-200'>{errorM}</p>
                      </div>
                      <br></br>
                    </>
                    : <></>

                  }
                </div>
                <input id="drop_area" type="file" className='cursor-help rounded-t-lg opacity-0 z-10 w-full h-full top-0 absolute' multiple={false} name="myImage" onChange={uploadToClient} />
              </div>
              {createObjectURL != "" ?
                <>
                  <div className='w-full border border-stone-800'></div>
                  <div className='flex justify-center mt-2'>
                    <p className='text-xl font-bold text-neutral-200'>ตัวอย่างภาพ</p>
                  </div>
                  <div className='flex justify-center mt-2'>
                    <div className='w-11/12 flex justify-center'>
                      <img className="rounded-md" src={createObjectURL} />
                    </div>
                  </div>
                  <div className='flex justify-center mt-2 mb-1'>
                    <button
                      className="rounded-lg border border-stone-800 bg-neutral-500/80 hover:scale-110 hover:bg-neutral-400/80 duration-300"
                      type="submit"
                      onClick={uploadToServer}
                    >
                      <p className='mx-2 my-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-rose-400'>Send to server</p>
                    </button>
                  </div>
                </>
                : <></>}

              {imageOutURL != null ? <>
                <div className='w-full border border-stone-800'></div>
                {errorM2 != "" &&
                  <div className='flex justify-center mt-2 mb-1'>
                    <p className='mb-2 text-xl font-bold text-neutral-200'>{errorM2}</p>
                  </div>
                }
                <div className='flex justify-center mt-2 mb-1'>
                  <img className="rounded-md" src={"/api/download/" + imageOutURL.fileName} />
                </div>
                <div className='flex justify-center mt-2'>
                  <h1 className="text-2xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-green-300">ทดสอบลิงค์ที่ใช้ดึงภาพ</h1>
                </div>
                <div className='flex justify-center mt-2 mb-2'>
                  <div className='w-11/12 flex justify-center'>
                    <input readOnly type="text" id="img_link" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={location.origin + "/api/download/" + imageOutURL.fileName}></input>
                    <button className='relative border-stone-800 bg-neutral-500/80 font-bold text-gray-200 text-sm rounded-lg w-20 ml-2 text-center flex justify-center items-center hover:scale-110 hover:bg-neutral-400/80 duration-300'
                      onClick={() => {
                        navigator.clipboard.writeText(location.origin + "/api/download/" + imageOutURL.fileName);
                        setButtonTip(true);
                        setTimeout(()=>{
                          setButtonTip(false);
                        }, 1000)
                      }}>
                      Copy
                      {buttonTip && <>
                        <div className="animate-[wiggle_1s_ease-in-out_infinite] absolute top-0 translate-y-[-110%] z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
                        Copied!!
                      </div>
                      </>}
                    </button>
                  </div>
                </div>
              </>
                : <></>}
            </div>
          </div>
          <br></br>
        </div>
      </main>
    </>
  )
}
