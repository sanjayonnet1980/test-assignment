interface props{
message?: string;
}

const ErrorText: React.FC<props> =({message})=>message?<span className="error-text" role="alert">{message}</span> : null

export default ErrorText;
