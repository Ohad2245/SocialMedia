import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import '../../index.css';

const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  const { picturePath } = useSelector((state) => state.user);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="blue"
          fontFamily="Brush Script MT"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <span style={{ color: "#2996ff" }}>S</span>
          <span style={{ color: "#40a1ff" }}>t</span>
          <span style={{ color: "#62b1ff" }}>a</span>
          <span style={{ color: "#83c2ff" }}>t</span>
          <span style={{ color: "#9acdff" }}>u</span>
          <span style={{ color: "#c7e3ff" }}>s</span>
        </Typography>

        {/* <img src={logo} alt="Logo"/> */}

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px", color: "#EEBC1D" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: "#EEBC1D" }} />
            )}
          </IconButton>
          <Message
            sx={{
              fontSize: "25px",
              color: "#9acdff",
              "&:hover": { color: "gray" },
            }}
          />
          <NotificationsActiveIcon
            
            sx={{
              fontSize: "25px",
              color: "#9acdff",
              "&:hover": { color: "gray" },
            }}
            variant="contained"
            onClick={handleClick}
          />
          
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Test</Typography>
          </Popover>

         
            <Help
              sx={{
              fontSize: "25px",
              color: "#9acdff",
              "&:hover": { color: "gray" },
            }}
            variant="contained"
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Help</Typography>
          </Popover>
           
          <UserImage image={picturePath} />
          <Button
            onClick={() => dispatch(setLogout())}
            sx={{
              backgroundColor: "gold",
              color: "black",
              fontWeight: "500",
              "&:hover": { backgroundColor: "#EEBC1D" },
            }}
          >
            Logout
          </Button>
        </FlexBetween>
      ) : (
        <div>
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>

          <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween
              style={{ position: "fixed", bottom: "0", gap: "1.75rem" }}
            >
              <Message
                sx={{ fontSize: "25px", "&:hover": { color: "gray" } }}
              />
              <NotificationsActiveIcon
                sx={{ fontSize: "25px", "&:hover": { color: "gray" } }}
              />

              <Help sx={{ fontSize: "25px", "&:hover": { color: "gray" } }} />
            </FlexBetween>
          </FlexBetween>
        </div>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px", "&:hover": { color: "gray" } }} />
            <NotificationsActiveIcon
              sx={{
                fontSize: "25px",
                "&:hover": { color: "gray" },
              }}
            />
            <Help
              sx={{
                fontSize: "25px",
                "&:hover": { color: "gray" },
              }}
            />

            <FormControl variant="standard" value={fullName}>
              <Button
                onClick={() => dispatch(setLogout())}
                sx={{
                  backgroundColor: "gold",
                  color: "black",
                  fontWeight: "500",
                  "&:hover": { backgroundColor: "#EEBC1D" },
                }}
              >
                Logout
              </Button>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
