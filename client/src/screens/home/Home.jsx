import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Navbar from "components/navbar/Navbar";
import { useSelector } from "react-redux";
import UserWidget from "components/widgets/UserWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import PostsWidget from "components/widgets/PostsWidget";
import AdvertWidget from "components/AdvertWidget";
import FriendListWidget from "components/widgets/FriendListWidget";
import UserImage from "components/UserImage";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id}/>

        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
          <FriendListWidget userId={_id}/>
            <Box m="2rem 0" />
            <Box m='2rem 0'/>
            <AdvertWidget/>

          </Box>
        )}

      </Box>
    </Box>
  );
};

export default Home;
