import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../utils/http";
import ErrorModal from "../shared/components/ErrorModal";
import Button from "../shared/formElements/Button";

const SummaryComponent = ({ blogId }) => {
  const [errorState, setErrorState] = useState(null);
  const queryClient = useQueryClient();

  const cachedSummary = queryClient.getQueryData(["blogSummary", blogId]);

  const {
    mutate,
    data: summaryData,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () =>
      httpRequest({
        url: `/blog/summarize/${blogId}`,
        method: "POST",
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["blogSummary", blogId], data);
    },
    onError: (err) => {
      setErrorState(
        err?.response?.data?.message || "Failed to generate summary"
      );
    },
  });

  useEffect(() => {
    if (!cachedSummary) {
      mutate();
    }
  }, [cachedSummary, mutate]);

  if (isPending && !cachedSummary) {
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
        message={errorState || "Something went wrong generating summary."}
        onClear={() => setErrorState(null)}
      />
    );
  }

  const summary = cachedSummary?.summary || summaryData?.summary;

  return (
    <div className="card bg-base-200 p-5 mt-4">
      <h3 className="text-xl font-bold text-primary mb-2">
        AI Generated Summary
      </h3>
      <p className="text-base text-gray-700">
        {summary || "No summary available."}
      </p>
    </div>
  );
};

export default SummaryComponent;
