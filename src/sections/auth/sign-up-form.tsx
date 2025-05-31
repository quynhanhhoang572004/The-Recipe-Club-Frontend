import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  initialSignUpValues,
  SignUpProps,
} from "@/types/auth/signup";
import toast from "react-hot-toast";
import { signUpApi } from "@/api/auth.service";
import { setToken } from "@/utils/token";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { signIn } from "@/stores/user-slice";

const SignUpForm = () => {
  const [focusInput, setFocusInput] = useState<string | null>("firstName");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialSignUpValues,
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setFocusInput(null);
    }
  };

  const onSubmit: SubmitHandler<SignUpProps> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = data;
      setLoading(true);
      const { access_token, user } = await signUpApi(rest);
      dispatch(signIn(user));
      setToken("access_token", access_token);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
                fontSize: "0.9375rem",
                lineHeight: "1.5rem",
                color: "#000000",
              }}
            >
              Welcome to Recipe Club
            </Typography>
            <Typography
              sx={{
                fontSize: "0.875rem",
                display: "flex",
                gap: 0.5,
              }}
            >
              Have an Account ?{" "}
              <Link
                to="/signin"
                style={{
                  color: "#FF885B",
                  textDecoration: "underline",
                  textDecorationThickness: "0.0625rem",
                  fontWeight: 600,
                  textUnderlineOffset: "0.125rem",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
          <Typography fontSize={30} fontWeight={600}>
            Sign Up
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Box display="flex" gap={2} sx={{ mb: 2 }}>
            <Box flex={1}>
              <TextField
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                disabled={loading}
                variant="outlined"
                placeholder="Enter your first name"
                label="First Name"
                fullWidth
                type="text"
                focused={focusInput === "firstName"}
                onFocus={() => setFocusInput("firstName")}
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
                            errors.firstName
                              ? "#DC2626"
                              : loading
                                ? "#A3A3A3"
                                : focusInput === "firstName"
                                  ? "#FF885B"
                                  : "#A3A3A3"
                          }
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            <Box flex={1}>
              <TextField
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                disabled={loading}
                variant="outlined"
                placeholder="Enter your last name"
                label="Last Name"
                fullWidth
                type="text"
                focused={focusInput === "lastName"}
                onFocus={() => setFocusInput("lastName")}
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
                            errors.lastName
                              ? "#DC2626"
                              : loading
                                ? "#A3A3A3"
                                : focusInput === "lastName"
                                  ? "#FF885B"
                                  : "#A3A3A3"
                          }
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>
          <Box display="flex" gap={2} sx={{ mb: 2 }}>
            <Box flex={1}>
              <TextField
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading}
                variant="outlined"
                placeholder="Enter your email"
                label="Email"
                fullWidth
                type="email"
                focused={focusInput === "email"}
                onFocus={() => setFocusInput("email")}
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
                            errors.email
                              ? "#DC2626"
                              : loading
                                ? "#A3A3A3"
                                : focusInput === "email"
                                  ? "#FF885B"
                                  : "#A3A3A3"
                          }
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            <Box flex={1}>
              <TextField
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled={loading}
                variant="outlined"
                placeholder="Enter your username"
                label="username"
                fullWidth
                type="username"
                focused={focusInput === "username"}
                onFocus={() => setFocusInput("username")}
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
                            errors.email
                              ? "#DC2626"
                              : loading
                                ? "#A3A3A3"
                                : focusInput === "email"
                                  ? "#FF885B"
                                  : "#A3A3A3"
                          }
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>
          <Box display="flex" gap={2} sx={{ mb: 3 }}>
            <Box flex={1}>
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
                    Password must contains at least 1 letter, 1 number, and
                    allows special characters
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
            </Box>
            <Box flex={1}>
              <Tooltip
                arrow
                open={
                  !!errors.confirmPassword || focusInput === "confirmPassword"
                }
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
                    {errors.confirmPassword?.message || "Passwords must match"}
                  </Typography>
                }
              >
                <TextField
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={loading}
                  variant="outlined"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  focused={focusInput === "confirmPassword"}
                  onFocus={() => setFocusInput("confirmPassword")}
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
                              errors.confirmPassword
                                ? "#DC2626"
                                : loading
                                  ? "#A3A3A3"
                                  : focusInput === "confirmPassword"
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
            </Box>
          </Box>
          <Stack gap={1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#FF885B",
                "&:hover": {
                  backgroundColor: "#ff7a47",
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography sx={{ fontWeight: 600, color: "#fffff6" }}>
                  Sign up
                </Typography>
              </Box>
            </Button>
            <Typography
              sx={{
                color: "#ABABAB",
                textAlign: "center",
                fontSize: "0.875rem",
                margin: "0.25rem 0",
              }}
            >
              OR
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#FF885B",
                "&:hover": {
                  backgroundColor: "#ff7a47",
                },
              }}
              onClick={() => console.log("Google signup")}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <img
                  src="/icons/google-logo.svg"
                  width={24}
                  height={24}
                  alt="google-logo"
                />
                <Typography sx={{ fontWeight: 600, color: "#fffff6" }}>
                  Sign up with Google
                </Typography>
              </Box>
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default SignUpForm;
