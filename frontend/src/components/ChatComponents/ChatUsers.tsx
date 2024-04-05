import React from 'react'
import Friend from './Friend'

function ChatUsers({conversations,user,setCurrentChat}) {
  return (
    <div className="relative flex flex-col hidden h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out" style={{ width: '24rem' }}>
    <div className="flex justify-between px-3 pt-1 text-white">
      <div className="flex items-center w-full py-2">
        <button aria-haspopup="true" className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200">
          <svg className="w-6 h-6 text-gray-600 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fillRule="nonzero" d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"/>
          </svg>
        </button>
        <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fillRule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"/>
              </svg>
            </button>
          </span>
          <input type="search" name="q"
                 className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: '25px' }}
                 placeholder="Search..." autoComplete="off"/>
        </div>
      </div>
    </div>
    <div className="border-b shadow-bot">
      <ul className="flex flex-row items-center inline-block px-2 list-none select-none">
        <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
          <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-blue-500">
            All
          </a>
        </li>
      
          <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
            <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
              Private
              <span className="flex items-center justify-center w-5 h-5 ml-1 text-xs text-white bg-blue-500 rounded-full">2</span>
            </a>
          </li>
          <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
            <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
              Groups
            </a>
          </li>
         
        
      </ul>
    </div>
    <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
    <ul className="flex flex-col inline-block w-full h-screen px-2 select-none">
   
   {conversations && conversations.map((conversation)=>(
    <div onClick={()=>setCurrentChat(conversation)}>

      <Friend CurrentUser={user} conversation={conversation}/>
    </div>
   ))}
   
   



    {/* <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
      <div className="flex justify-between w-full focus:outline-none">
        <div className="flex justify-between w-full">
          <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
            <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1589349133269-183a6c90fbfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100" alt="" />
            <div className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full" style={{ width: '0.80rem', height: '0.80rem' }}>
              <div className="bg-green-500 rounded-full" style={{ width: '0.6rem', height: '0.6rem' }}></div>
            </div>
          </div>
          <div className="items-center flex-1 min-w-0">
            <div className="flex justify-between mb-1">
              <h2 className="text-sm font-semibold text-black">Julian Gruber</h2>
              <div className="flex">
                <svg className="w-4 h-4 text-green-500 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14">
                  <path fillRule="nonzero" d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z" />
                </svg>
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" width="19" height="14" viewBox="0 0 19 14" style={{ color: 'transparent' }}>
                  <path fillRule="nonzero" d="M7.96833846,10.0490996 L14.5108251,2.571972 C14.7472185,2.30180819 15.1578642,2.27443181 15.428028,2.51082515 C15.6711754,2.72357915 15.717665,3.07747757 15.5522007,3.34307913 L15.4891749,3.428028 L8.48917485,11.428028 C8.2663359,11.6827011 7.89144111,11.7199091 7.62486888,11.5309823 L7.54038059,11.4596194 L4.54038059,8.45961941 C4.2865398,8.20577862 4.2865398,7.79422138 4.54038059,7.54038059 C4.7688373,7.31192388 5.12504434,7.28907821 5.37905111,7.47184358 L5.45961941,7.54038059 L7.96833846,10.0490996 L14.5108251,2.571972 L7.96833846,10.0490996 Z" />
                </svg>
                <span className="ml-1 text-xs font-medium text-gray-600">20.25</span>
              </div>
            </div>
            <div className="flex justify-between text-sm leading-none truncate">
              <span>Send audio...</span>
              <span v-else className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full">2</span>
            </div>
          </div>
        </div>
      </div>
    </li> */}
    {/* <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
      <div className="flex justify-between w-full focus:outline-none">
        <div className="flex justify-between w-full">
          <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
            <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1589222331438-0511a448dbc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100" alt="" />
          </div>
          <div className="items-center flex-1 min-w-0">
            <div className="flex justify-between mb-1">
              <h2 className="text-sm font-semibold text-black">Karlien Nihen</h2>
              <div className="flex">
                <span className="ml-1 text-xs font-medium text-gray-600">2.28</span>
              </div>
            </div>
            <div className="flex justify-between text-sm leading-none truncate">
              <span>Writing...</span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
      <div className="flex justify-between w-full focus:outline-none">
        <div className="flex justify-between w-full">
          <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
            <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100" alt="" />
          </div>
          <div className="items-center flex-1 min-w-0">
            <div className="flex justify-between mb-1">
              <h2 className="text-sm font-semibold text-black">Meg Rigden</h2>
              <div className="flex">
                <span className="ml-1 text-xs font-medium text-gray-600">12.52</span>
              </div>
            </div>
            <div className="flex justify-between text-sm leading-none truncate">
              <span>Washington D.C.</span>
              <span v-else className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full">2</span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" style={{ paddingTop: '0.65rem', paddingBottom: '0.65rem' }}>
      <div className="flex justify-between w-full focus:outline-none">
        <div className="flex justify-between w-full">
          <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
            <img className="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1589127097756-b2750896a728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100" alt="" />
            <div className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full" style={{ width: '0.80rem', height: '0.80rem' }}>
              <div className="bg-green-500 rounded-full" style={{ width: '0.6rem', height: '0.6rem' }}></div>
            </div>
          </div>
          <div className="items-center flex-1 min-w-0">
            <div className="flex justify-between mb-1">
              <h2 className="text-sm font-semibold text-black">Mark Green</h2>
              <div className="flex">
                <span className="ml-1 text-xs font-medium text-gray-600">05:41</span>
              </div>
            </div>
            <div className="flex justify-between text-sm leading-none truncate">
              <span>I do not remember anything</span>
            </div>
          </div>
        </div>
      </div>
    </li> */}
  </ul>
    </div>
    <div className="fixed absolute bottom-0 right-0 z-40 mb-6 mr-4">
      <button className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink">
        <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="24"
             height="24" viewBox="0 0 24 24">
          <path fillRule="nonzero" d="M12 22C6.4771525 22 2 17.5228475 2 12S6.4771525 2 12 2s10 4.4771525 10 10-4.4771525 10-10 10zm0-1c4.963167 0 9-4.036833 9-9s-4.036833-9-9-9-9 4.036833-9 9 4.036833 9 9 9zM7.0000295 13.0029499H17.0000295V11.0029499H7.0000295z"/>
        </svg>
      </button>
    </div>
  </div>
  )
}

export default ChatUsers