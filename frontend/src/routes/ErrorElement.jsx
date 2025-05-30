import { useRouteError, Link } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg shadow-lg border border-error bg-base-100">
        <div className="card-body items-center text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-error">
            ⚠️ Oops! Something went wrong.
          </h1>

          <p className="text-base-content text-sm md:text-base">
            Sorry, we couldn't load this page.
          </p>

          <div className="text-error-content text-sm mt-2 space-y-1">
            {error?.status && (
              <p className="font-semibold text-error">Error {error.status}</p>
            )}
            <p>
              {error?.statusText ||
                error?.message ||
                "An unexpected error occurred."}
            </p>
          </div>

          <Link to="/" className="btn btn-primary mt-4">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorElement;
