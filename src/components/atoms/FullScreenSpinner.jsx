import { CircularProgress } from "@mui/material";

export default function FullScreenSpinner() {
  return (
    <div className="absolute h-screen w-screen">
      <div className="flex items-center justify-center h-full">
        <CircularProgress />
      </div>
    </div>
  );
}
