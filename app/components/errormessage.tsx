interface ErrorMessageProps {
    message: string;
  }

const ErrorMessage = ({ message } : ErrorMessageProps) => (
    <button className="bg-red-200 text-red-500 px-4 py-2 rounded-md">
      {message}
    </button>
  );
  
  export default ErrorMessage;