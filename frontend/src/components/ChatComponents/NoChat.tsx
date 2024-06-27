import NochatImg from "../../../public/images/NoChat.png";


function NochatScreen() {

  return (
    
    <div className=" w-full h-full ml-60 flex items-center justify-center">
          
     
        <div  className="flex flex-col items-center"  >
            <img className="w-60" src={NochatImg} alt="" />
            <p className="mt-5 font-medium">Shuffle Messages</p>
            <p className="text-xs text-gray-600">Connect with professionals, start a conversation, and make your connections!</p>
            <p></p>

        </div>
        </div>
  )
}

export default NochatScreen