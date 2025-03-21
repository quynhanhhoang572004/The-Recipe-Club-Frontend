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
import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  initialSignUpValues,
  SignUpProps,
} from "@/types/auth/signup";
import toast from "react-hot-toast";
import FacebookLogo from "@/assets/icons/facebook-logo.svg";
import GoogleLogo from "@/assets/icons/google-logo.svg";

const SignUpForm = () => {
  const [focusInput, setFocusInput] = useState<string | null>("firstName");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<SignUpProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialSignUpValues,
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setFocusInput(null);
    }
  };

  const onSubmit: SubmitHandler<SignUpProps> = useCallback(async (data) => {
    try {
      setLoading(true);
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
          console.log(data);
          return true;
        }),
        {
          loading: "Signing up...",
          success: "Signed up successfully",
          error: "Failed to sign up",
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
        <Stack gap={1}>
      <Typography fontSize={30} fontWeight={600}>
            Sign in
          </Typography>
      
        <Box display="flex" gap={2} sx={{ mb: 2 }}>

    
          {/* First Name Field */}
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

          {/* Last Name Field */}
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
          {/* Username Field */}
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
          {/* Password Field */}
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
          </Box>
          {/* Confirm Password Field */}
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

        <Stack gap={2}>
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
              <Typography sx={{ fontWeight: 600 }}>Sign up</Typography>
            </Box>
          </Button>

          <Typography
            sx={{
              color: "#ABABAB",
              textAlign: "center",
              fontSize: "14px",
              margin: "4px 0",
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
              <img src={GoogleLogo} width={24} height={24} alt="google-logo" />
              <Typography sx={{ fontWeight: 600 }}>
                Sign up with Google
              </Typography>
            </Box>
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FF885B",
              "&:hover": {
                backgroundColor: "#ff7a47",
              },
            }}
            onClick={() => console.log("Facebook signup")}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <img
                src={FacebookLogo}
                width={24}
                height={24}
                alt="facebook-logo"
              />
              <Typography sx={{ fontWeight: 600 }}>
                Sign up with Facebook
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
