import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../utils/http";
import ErrorModal from "../shared/components/ErrorModal";
import Button from "../shared/formElements/Button";

const SummaryComponent = ({ blogId }) => {
  const [errorState, setErrorState] = useState(null);

  const {
    data: summaryData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["blogSummary", blogId],
    queryFn: () =>
      httpRequest({
        url: `/blog/${blogId}/summarize`,
        method: "POST",
      }),
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Failed to fetch summary");
    },
  });

  if (isPending) {
    return (
      <Button className="btn btn-secondary gap-2" disabled>
        <span className="loading loading-spinner loading-sm"></span>
        Generating AI Summary...
      </Button>
    );
  }

  if (isError || errorState) {
    return (
      <ErrorModal
        message={errorState || "Something went wrong fetching summary."}
      />
    );
  }

  return (
    <div className="card bg-base-200 p-5 mt-4">
      <h3 className="text-xl font-bold text-primary mb-2">
        AI Generated Summary
      </h3>
      <p className="text-base text-gray-700">
        {summaryData?.summary || "No summary available."}
      </p>
    </div>
  );
};

export default SummaryComponent;
