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
import { initialSignInForm, SignInFormProps, signInSchema } from "@/types/auth";
import toast from "react-hot-toast";

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
          <Typography fontSize={24} fontWeight={800}>
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
        <Stack gap={3}>
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
                              ? "#2970FF"
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
                                ? "#2970FF"
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
                            color: "#0A0A0A",
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
          <Button type="submit" variant="contained" loading={loading}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Continue to sign in
              </Typography>
              <ChevronRight size={20} strokeWidth={1.5} />
            </Box>
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default SignInForm;
