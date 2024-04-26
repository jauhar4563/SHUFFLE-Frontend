import React, { createContext, useState, useContext } from 'react';

// Define the type for the PostSearch data
export interface PostSearchData {
  search:string|null
 
}

// Define the type for the context value
interface PostSearchContextValue {
  postSearchData: PostSearchData;
  setPostSearchData: React.Dispatch<React.SetStateAction<PostSearchData>>;
}

// Create the context with an initial empty object as the default value
const PostSearchContext:any = createContext<PostSearchContextValue | undefined>(undefined);

// Create a custom hook to consume the context
const usePostSearchContext = () => {
  const context = useContext(PostSearchContext);
  if (!context) {
    throw new Error('usePostSearchContext must be used within a PostSearchProvider');
  }
  return context;
};

// PostSearchProvider component using useState for PostSearchData
const PostSearchProvider = ({ children }:any) => {
  const [postSearchData, setPostSearchData] = useState<PostSearchData>({
    search:null,
   
  });

  return (
    <PostSearchContext.Provider value={{ postSearchData, setPostSearchData }}>
      {children}
    </PostSearchContext.Provider>
  );
};

export { PostSearchContext, usePostSearchContext, PostSearchProvider };