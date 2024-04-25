import React, { useState } from 'react';
import { PostSearchContext, PostSearchData } from './PostSearchContext';

const PostSearchProvider: React.FC = ({ children }:any) => {
  const [postSearchData, setPostSearchData] = useState<PostSearchData>({
    search:null
  });

  return (
    <PostSearchContext.Provider value={{ postSearchData, setPostSearchData }}>
      {children}
    </PostSearchContext.Provider>
  );
};

export default PostSearchProvider;