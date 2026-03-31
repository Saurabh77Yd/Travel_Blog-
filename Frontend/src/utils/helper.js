import ADD_STORY_IMG from "../assets/images/add-story.svg";
import NO_SEARCH_DATA_IMG from "../assets/images/no-search-data.svg";
import NO_FILTER_DATA_IMG  from "../assets/images/no-filter-data.svg";

export const validateEmail = (email) => {
  const rgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return rgex.test(email);
};

export const getInitials =(name)=> {
  if(!name) return "";
  const words = name.split(" ");
  let initials = "";
  for(let i=0; i<Math.floor(words.length, 2); i++){
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
  switch(filterType){
    case "search" : 
     return 'Oops! No stories found matching your search.';
    case "date":
      return `No stories found in the give date range`;
    default:
      return `Start creating your first Travel Story! click the 'Add' button to join down your thoughts, ideas, and memories. Let's get Started!`;
  }
}

export const getEmptyCardImg = (filterType) => {
  switch (filterType){
    case "search":
      return NO_SEARCH_DATA_IMG;
    case "date":
      return NO_FILTER_DATA_IMG;
    default:
      return ADD_STORY_IMG;
  }
};