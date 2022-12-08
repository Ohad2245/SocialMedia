import { Box, Typography, useTheme, IconButton, InputBase} from "@mui/material";
import {Search} from "@mui/icons-material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import {useState} from 'react';
import FlexBetween from "components/FlexBetween";

const FriendListWidget = ({ userId }) => {

  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;

  const [search, setSearch] = useState("");

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` },
     }
    );
    const data = await response.json();
    dispatch(setFriends(data));
  };
  useEffect(()=>{
    getFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  return(
    <WidgetWrapper>
      <Typography
       color={palette.neutral.dark}
       variant='h5'
       fontWidth='500'
       sx={{mb:'1.5rem'}}
      
      >
        My Friends 
      </Typography>
      <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." onChange={event=> setSearch(event.target.value)}/>
            <IconButton>
              <Search/>
            </IconButton>
          </FlexBetween>
          <br></br>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {
          friends.filter((val)=>{
            if(search === ""){
              return val
            }else if(val.firstName.toLowerCase().includes(search.toLowerCase())){
                return val
            }
          }).map((friend)=>(
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
      </Box>
    </WidgetWrapper>
  )
};

export default FriendListWidget;
