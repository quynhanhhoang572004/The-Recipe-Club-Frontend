import { getMe } from "@/api/auth.service";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { signIn } from "@/stores/user-slice";
import { setToken } from "@/utils/token";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GooglePage = () => {
  const [params] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const status = useMemo(
    () => Boolean(params.get("success") || false),
    [params],
  );
  const accessToken = useMemo(() => params.get("access_token"), [params]);
  const refreshToken = useMemo(() => params.get("refresh_token"), [params]);

  useEffect(() => {
    const getUserByToken = async () => {
      if (status) {
        setToken("access_token", accessToken || "");
        const { data } = await getMe();
        dispatch(signIn(data));
        setIsLoading(false);
        navigate("/");
      }
    };
    getUserByToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, refreshToken]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      {isLoading && (
        <>
          <CircularProgress />
          <Typography variant="h6" fontWeight={600}>
            Waiting for redirecting to home page...
          </Typography>
        </>
      )}
    </Box>
  );
};

export default GooglePage;
