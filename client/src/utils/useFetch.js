import React, { useState, useEffect } from "react";
const API_KEY = import.meta.env.API_KEY;


const useFetch = ({ keyword }) => {
  const [gif, setgif] = useState("");

  const fetchGif = async () => {
    try {
      const response = await fetch();
      const { data } = await response.json(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
      setgif(data[0]?.images?.downsized_medium.url)
    } catch (err) {
   setgif("https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif");
    }
  };
  useEffect(()=>{
   await fetchGif();
   return gif;
  },[keyword])
};

export default useFetch;
