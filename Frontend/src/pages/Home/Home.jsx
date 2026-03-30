import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar";
import {useNavigate} from "react-router-dom"; 
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-modal";
import {MdAdd} from "react-icons/md";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";

const Home = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStorage] = useState([]);
  const [openAddEditModel, setOpenAddEditModel] = useState({isShown :false,
    type: "add",
    data:null,
  })

  const [openViewModal, setOpenViewModal] = useState({
    isShown:false,
    data:null,
  });

  //Get user Info 
  const getUserInfo = async () =>{
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        //set user info if data exists
        setUserInfo(response.data.user);

      }
    }catch(error){
      if(error.response.status == 401){
        //clear storage if unauthorized
        localStorage.clear();
        navigate("/login") //Redirect to login page:

      }
    }
  }
  //Get all travel story
  const getAllTravelStories = async()=>{
    try{
      const response = await axiosInstance.get("/get-all-stories");
      if(response.data && response.data.stories){
        setAllStorage(response.data.stories);
      }

    }catch(error){
      console.log("An unexpected error occurred. Please try again", error)
    }
  }
  
  //Handle Edit story click
  const handleEdit = (data)=>{
    setOpenAddEditModel({isShown:true, type:"edit", data:data});
  }
  //Handle Travel story
  const handleViewStory = (data)=>{
    setOpenViewModal({isShown:true, data});
  };
  //Handle update Favourite
  const updateIsFavourite = async(storyData)=>{
    const storyId = storyData._id;
    try{
      const response = await axiosInstance.put("/update-is-favourite/"+storyId,{
        isFavourite: !storyData.isFavourite,
      })
      if(response.data && response.data.story){
        toast.success("Story update succefully");
        getAllTravelStories();
      }
    }catch(error){
      console.log("An unexpected error occurred. Please try again", error);
    }

  }
  //Handle Delete Story
  const deleteTravelStory = async(data)=>{
    const storyId = data._id;

    try{
      const response = await axiosInstance.delete("/delete-story/" + storyId);
      if(response.data && !response.data.error){
        toast.error("Story Delete Successfully");
        setOpenViewModal((prevState)=>({...prevState, isShown:false}));
        getAllTravelStories();
      }
    }catch(error){
      console.log("An unexpected error occurred. Please try again", error);
    }
  }

  useEffect(()=>{
    getUserInfo();
    getAllTravelStories();
    return () => {

    }
  },[])

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length>0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item)=>{
                  return (
                    <TravelStoryCard 
                      key={item._id}
                      imgUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavourite}
                      // onEdit={()=>handleEdit(item)}
                      onClick={()=>handleViewStory(item)}
                      onFavouriteClick={()=>updateIsFavourite(item)}

                    />
                  )
                })}
              </div>
            ):(
              <EmptyCard />
            )}
          </div>
          <div className="w-[320px]"></div>
          
        </div>
      </div>
      {/* Add & Edit Travel Stroy Model */}
      <Modal isOpen={openAddEditModel.isShown} onRequestClose={()=>{}} style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)",
          zIndex:999
        },
      }}
      appElement={document.getElementById("root")}
      className="model-box"> <AddEditTravelStory type={openAddEditModel.type} storyInfo={ openAddEditModel.data} onClose={()=>{
        setOpenAddEditModel({isShown:false, type:"add" , data:null})
      }}
      getAllTravelStories={getAllTravelStories}/></Modal>
      {/* View travel story Model */}
      <Modal 
        isOpen={openViewModal.isShown} 
        onRequestClose={()=>{}} style={{
          overlay:{
            backgroundColor:"rgba(0,0,0,0.2)",
            zIndex:999
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box">
          <ViewTravelStory 
            storyInfo={openViewModal.data || null} 
            onClose={()=>{
              setOpenViewModal((prevState)=> ({...prevState, isShown:false}))
            }}
            onEditClick={()=>{
              setOpenViewModal((prevState)=> ({...prevState, isShown:false}));
              handleEdit(openViewModal.data || null)
            }}
            onDeleteClick={()=>{
              deleteTravelStory(openViewModal.data || null)
            }} 
          />
      </Modal>
      <button className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10" onClick={()=>{
        setOpenAddEditModel({isShown:true, type:"add", data:null});
      }}>
        <MdAdd className="text-[32px] text-white"/>

      </button>

      <ToastContainer/>
    
    </>
  )
}

export default Home
