type ErrorProps = {
  message?: string;
};

export default function Error({
  message = "Something went wrong!",
}: ErrorProps) {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="text-red-600 font-semibold">{message}</div>
    </div>
  );
}
