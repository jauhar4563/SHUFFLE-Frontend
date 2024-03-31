export interface PostProps {
    post: {
      _id: string;
      userId: {
        _id: string;
        userName: string;
        profileImg: string;
      };
      title: string;
      imageUrl: string;
      description: string;
      likes: any[];
      isHidden: boolean;
      isBlocked: boolean;
      hideComment: boolean;
      hideLikes: boolean;
      date: string;
    };
  }