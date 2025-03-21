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
import { ChevronRight, Eye, EyeOff, Lock, User } from "lucide-react";
import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  initialSignInForm,
  SignInFormProps,
  signInSchema,
} from "@/types/auth/signin";
import toast from "react-hot-toast";
import FacebookLogo from "@/assets/icons/facebook-logo.svg";
import GoogleLogo from "@/assets/icons/google-logo.svg";

const SignInForm = () => {
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

  const onSubmit: SubmitHandler<SignInFormProps> = useCallback(async (data) => {
    try {
      setLoading(true);
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
          console.log(data);
          return true;
        }),
        {
          loading: "Signing in...",
          success: "Signed in successfully",
          error: "Failed to sign in",
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

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
            marginBottom: 3,
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
                fontSize: "15px",
                lineHeight: "24px",
                color: "#000000",
              }}
            >
              Welcome Back to Recipe Club
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                display: "flex",
                gap: 0.5,
              }}
            >
              No Account?{" "}
              <a
                href="/sign-up"
                style={{
                  color: "#FF885B",
                  textDecoration: "underline",
                  textDecorationThickness: "1px",
                  fontWeight: 600,
                  textUnderlineOffset: "2px",
                }}
              >
                Sign up
              </a>
            </Typography>
          </Box>
          <Typography fontSize={30} fontWeight={600}>
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
        <Stack gap={2}>
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
                      size={20}
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
                      offset: [0, -16],
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
                        size={20}
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
                          <Eye size={20} strokeWidth={1.5} />
                        ) : (
                          <EyeOff size={20} strokeWidth={1.5} />
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
              fontSize: "14px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
          >
            Forgot password?
          </Typography>
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#FF885B", marginBottom: "-10px" }}
            loading={loading}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Sign in
              </Typography>
              {/* <ChevronRight size={20} strokeWidth={1.5} /> */}
            </Box>
          </Button>
          <Typography
            sx={{
              color: "#ABABAB",
              alignItems: "center",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
              margin: "4px 0",
            }}
          >
            OR
          </Typography>
          <Button
            type="submit"
            variant="contained"
            style={{ background: "#FF885B", marginTop: "-10px" }}
            loading={loading}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <img src={GoogleLogo} width={24} height={24} alt="google-logo" />
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
