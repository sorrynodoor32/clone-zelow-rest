import banner from '~/assets/banner.png'

const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit relative"> 
        <img src={banner} alt="banner" className='w-full h-[752px] object-cover'/>
        <div className='absolute inset-0 flex flex-col gap-6 items-center justify-center'>
          <h1 className='text-5xl text-white'>Find your Dream Home</h1>
          <span className='text-white text-lg flex flex-col items-center'>
           <span>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
           </span>
           <span>
            Proin sodales ultrices nulla blandit volutpat.
          </span>
          </span>
         
        </div>
      </div>
      <div className='w-main m-auto'>
        content
      </div>
    </div>
  )
}

export default Home
