import React, {ErrorInfo, ReactNode} from "react";

interface Props{
    children:ReactNode;
}
interface State{
    hasError:boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError:false,
    }
  
    public static getDerivedStateFromError(_:Error):State {
      return { hasError: true };
    }
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
      }
  
    public render() {
      if (this.state.hasError) {
        return <div>
            <h1>Unsere Seite befindet sich in Wartung</h1>
            <span>Versuchen Sie es bitte später erneut. Vielen Dank</span>
        </div>;
      }
  
      return this.props.children; 
    }
  }
  export default ErrorBoundary;