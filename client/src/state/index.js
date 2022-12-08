import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  friends: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      window.localStorage.removeItem("isLoggedIn")
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.error("user friends non-existent :( ");
      }
    }, 
    setPosts: (state, action) => { 
      state.posts = action.payload;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },

    setDelete:(state,action) =>{
      const deletedPost = state.posts.filter((p)=> p._id !== action.payload._id); 
      state.posts = deletedPost;
    },

    
    setComments: (state, action) => { 
      state.comments = action.payload;
    },
    setComment: (state, action) => {
      const updatedComments = state.posts.map((comment) => {
        if (comment._id === action.payload.comment._id) return action.payload.comment;
        return comment;
      });
      state.posts = updatedComments;
    },


  }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost,setDelete ,setComments,setComment} =
  authSlice.actions;
export default authSlice.reducer;