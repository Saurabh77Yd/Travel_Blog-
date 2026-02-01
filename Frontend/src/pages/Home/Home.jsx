import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar";
import {useNavigate} from "react-router-dom"; 
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
const Home = () => {

  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStorage] = useState([])

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

  }
  //Handle Travel story
  const handleViewStory = (data)=>{

  }
  //Handle update Favourite
  const updateIsFavourite = (storyData)=>{

  }


  useEffect(()=>{
    getUserInfo();
    getAllTravelStories();
    return () => {

    }
  },[])

  return (
    <div>
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
                      onEdit={()=>handleEdit(item)}
                      onClick={()=>handleViewStory(item)}
                      onFavouriteClick={()=>updateIsFavourite(item)}

                    />
                  )
                })}
              </div>
            ):(
              <>Empty Card here</>
            )}
          </div>
          <div className="w-[320px]"></div>
          
        </div>
      </div>
    
      </>
    </div>
  )
}

export default Home
