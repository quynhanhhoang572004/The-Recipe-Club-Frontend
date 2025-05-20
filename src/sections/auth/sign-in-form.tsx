import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  initialSignInForm,
  SignInFormProps,
  signInSchema,
} from "@/types/auth/signin";
import toast from "react-hot-toast";
import { getMe, loginApi } from "@/api/auth.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { setToken } from "@/utils/token";
import { signIn } from "@/stores/user-slice";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [focusInput, setFocusInput] = useState<keyof SignInFormProps | null>(
    "account",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: initialSignInForm,
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setFocusInput(null);
    }
  };

  const onSubmit: SubmitHandler<SignInFormProps> = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const promise = loginApi({
          account: data.account,
          password: data.password,
        });
        const token = await toast.promise(promise, {
          loading: "Signing in...",
          success: "Signed in successfully",
          error: "Invalid account or password",
        });
        const user = await getMe();
        dispatch(signIn(user.data));
        setToken("access_token", token);
         setTimeout(() => navigate("/"), 0);
        
      } catch (error) {
        toast.error("Login failed");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    
    [dispatch, navigate],
  );

  useLayoutEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            marginBottom: "1.875rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "0.9375rem",
                lineHeight: "1.5rem",
                color: "#000000",
              }}
            >
              Welcome Back to Recipe Club
            </Typography>
            <Typography
              sx={{
                fontSize: "0.875rem",
                display: "flex",
                gap: "0.3125rem",
              }}
            >
              No Account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#FF885B",
                  textDecoration: "underline",
                  textDecorationThickness: "0.0625rem",
                  fontWeight: 600,
                  textUnderlineOffset: "0.125rem",
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
          <Typography fontSize="1.875rem" fontWeight={600}>
            Sign in
          </Typography>
          <Typography
            sx={{
              color: "#737373",
            }}
          >
            Please enter your credentials to sign in
          </Typography>
        </Stack>
        <Stack gap="1rem">
          <TextField
            {...register("account")}
            error={!!errors.account}
            helperText={errors.account?.message}
            disabled={loading}
            variant="outlined"
            placeholder="Enter your email or username"
            label="Email / Username"
            fullWidth
            type="text"
            focused={focusInput === "account"}
            onFocus={() => setFocusInput("account")}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#FF885B",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FF885B",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User
                      size="1.25rem"
                      strokeWidth={1.5}
                      color={
                        errors.account
                          ? "#DC2626"
                          : loading
                            ? "#A3A3A3"
                            : focusInput === "account"
                              ? "#FF885B"
                              : "#A3A3A3"
                      }
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Tooltip
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -1],
                    },
                  },
                ],
              },
            }}
            title={
              <Typography variant="body2">
                Password must contains at least 1 letter, 1 number, and allows
                special characters
              </Typography>
            }
          >
            <TextField
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
              variant="outlined"
              placeholder="Enter your password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              focused={focusInput === "password"}
              onFocus={() => setFocusInput("password")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF885B",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF885B",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        size="1.25rem"
                        strokeWidth={1.5}
                        color={
                          errors.password
                            ? "#DC2626"
                            : loading
                              ? "#A3A3A3"
                              : focusInput === "password"
                                ? "#FF885B"
                                : "#A3A3A3"
                        }
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          "&:hover": {
                            color: "#FF885B",
                          },
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye size="1.25rem" strokeWidth={1.5} />
                        ) : (
                          <EyeOff size="1.25rem" strokeWidth={1.5} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Tooltip>
          <Typography
            sx={{
              color: "#FF885B",
              fontSize: "0.875rem",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "0.3125rem",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#FF885B", marginBottom: "-0.625rem" }}
            loading={loading}
          
          >
            <Box display="flex" alignItems="center" gap="0.3125rem">
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Sign in
              </Typography>
            </Box>
          </Button>
          <Typography
            sx={{
              color: "#ABABAB",
              alignItems: "center",
              fontSize: "0.875rem",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
              margin: "0.25rem 0",
            }}
          >
            OR
          </Typography>
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#FF885B", marginTop: "-0.625rem" }}
            loading={loading}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <img
                src="/icons/google-logo.svg"
                width={24}
                height={24}
                alt="google-logo"
              />
              <Typography sx={{ fontWeight: 600 }}>
                Sign in with Google
              </Typography>
            </Box>
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default SignInForm;
