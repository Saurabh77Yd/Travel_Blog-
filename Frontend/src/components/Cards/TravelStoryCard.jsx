import {FaHeart} from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

const TravelStoryCard = ({
    imgUrl,
    title,
    date,
    story,
    visitedLocation,
    isFavourite,
    onEdit,
    onClick,
    onFavouriteClick,
}) => {
  return (
    <div className="">
      <img src={imgUrl} alt={title} className="w-full h-56 object-cover rounded-lg " onClick={onClick}/>
    </div>
  )
}

export default TravelStoryCard
