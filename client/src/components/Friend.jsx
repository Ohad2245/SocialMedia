import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import React, { useState } from "react";
import GroupRemoveOutlinedIcon from "@mui/icons-material/GroupRemoveOutlined";

const Friend = ({ friendId, name, subtitle, userPicturePath, postUserId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [isSave, setIsSave] = useState(false);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const loggedInUserId = useSelector((state) => state.user._id);

  let isFriend;
  if (friends) isFriend = friends.find((friend) => friend._id === friendId);

  
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends(data));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      
      {postUserId !== loggedInUserId && (
        <Button onClick={() => patchFriend()} sx={{ textTransform: "none" }}>
          {isFriend ? (
            <GroupRemoveOutlinedIcon
              sx={{ color: "gray", "&:hover": { color: "red" } }}
            >
              {" "}
              UnFollow
            </GroupRemoveOutlinedIcon>
          ) : (
            <Typography
              sx={{ color: "#1e90ff", "&:hover": { color: "primaryDark" } }}
            >
              {" "}
              + Follow{" "}
            </Typography>
          )}
        </Button>
      )}
    </FlexBetween>
  );
};

export default Friend;
