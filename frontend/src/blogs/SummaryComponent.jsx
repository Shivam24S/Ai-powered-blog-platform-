import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../utils/http";
import LoadingSpinner from "../shared/components/LoadingSpinner";
import ErrorModal from "../shared/components/ErrorModal";
import { useSelector } from "react-redux";

const SummaryComponent = ({ blogId }) => {
  const [errorState, setErrorState] = useState(null);

  const token = useSelector((state) => state.auth?.login?.token);

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    enabled: !!token,
    onError: (err) => {
      setErrorState(err?.response?.data?.message || "Failed to fetch summary");
    },
  });

  if (isPending) {
    return <LoadingSpinner loadingText="Generating Summary..." />;
  }

  if (isError || errorState) {
    return <ErrorModal message={errorState || "Something went wrong"} />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-secondary">
        AI Generated Summary
      </h3>
      <p className="text-base leading-relaxed text-gray-700">
        {summaryData?.summary || "No summary available."}
      </p>
    </div>
  );
};

export default SummaryComponent;
