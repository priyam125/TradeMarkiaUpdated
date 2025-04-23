import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

type TrademarkData = {
  _id: string;
  _index: string;
  _score: number;
  sort: [string, number, number];
  _source: {
    registration_number: string;
    registration_date: number;
    filing_date: number;
    status_date: number;
    renewal_date: number;
    date_type: string;
    status_code: number;
    status_type: string;
    search_bar: {
      attorneys: string;
      law_firm: string;
      mark_identification: string;
      owner: string;
    };
    starting_letter: {
      attorney: string;
      law_firm: string;
      mark_name: string;
      owner: string;
    };
    mark_identification: string;
    law_firm: string;
    law_firm_cleaned: string;
    attorney_name: string;
    attorney_name_cleaned: string;
    current_owner: string;
    current_owner_cleaned: string;
    mark_description_code: string[];
    mark_description_description: string[];
    first_use_anywhere_date: number;
    class_codes: string[];
    country: string;
    owner_location: {
      lat: number;
      lon: number;
    };
    mark_status_key: number;
  };
};

const Trademarks: React.FC = () => {
    const { searchTerm: urlSearchTerm } = useParams<{ searchTerm: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get search term from either URL parameter or query parameter
    const queryParams = new URLSearchParams(location.search);
    const querySearchTerm = queryParams.get('query');
    const searchTerm = querySearchTerm || urlSearchTerm;
  
    const [trademarkResults, setTrademarkResults] = useState<TrademarkData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const hasRunRef = useRef(false);
  
    useEffect(() => {
      // Reset the reference when search term changes
      hasRunRef.current = false;
    }, [searchTerm]);
  
    useEffect(() => {
      if (hasRunRef.current) return;
      hasRunRef.current = true;
  
      // If there's no search term, redirect to the home page
      if (!searchTerm) {
        navigate("/");
        return;
      }
  
      const fetchTrademarks = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            "https://vit-tm-task.api.trademarkia.app/api/v3/us",
            {
              input_query: searchTerm,
              input_query_type: "",
              sort_by: "default",
              status: [],
              exact_match: false,
              date_query: false,
              owners: [],
              attorneys: [],
              law_firms: [],
              mark_description_description: [],
              classes: [],
              page: 1,
              rows: 10,
              sort_order: "desc",
              states: [],
              counties: [],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
  
          setTrademarkResults(response.data.body.hits.hits || []);
          setError(null);
        } catch (err) {
          console.error("Error fetching trademark data:", err);
          setError("Failed to fetch trademark data. Please try again.");
          setTrademarkResults([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTrademarks();
    }, [searchTerm, navigate]);

  // Helper function to format dates from timestamps
  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getFullYear()}`;
  };

  // Helper function to check if trademark is live
  const isLive = (statusType: string | undefined) => {
    return statusType?.toLowerCase() === "live";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{searchTerm}"
      </h1>

      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && trademarkResults.length === 0 && (
        <div className="text-center my-12">
          <p className="text-xl text-gray-600">
            No trademarks found for "{searchTerm}"
          </p>
        </div>
      )}

      <div className="my-4 p-2 bg-gray-100 rounded text-sm">
        Status: {loading ? "Loading..." : "Done"} | Results:{" "}
        {trademarkResults?.length} | Error: {error || "None"}
      </div>

      {!loading && !error && trademarkResults.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow">
          {/* Table structure with fixed widths */}
          <div className="w-full">
            {/* Table Header */}
            <div className="flex bg-gray-50 border-b border-gray-200 py-3 px-4 font-medium text-gray-600">
              <div className="w-1/6">Mark</div>
              <div className="w-1/4">Details</div>
              <div className="w-1/4">Status</div>
              <div className="w-1/3">Class/Description</div>
            </div>

            {/* Table Rows */}
            {trademarkResults?.map((trademark) => (
              <div
                key={trademark._id}
                className="flex border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Mark Column - Fixed width */}
                <div className="w-1/6 p-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Details Column - Fixed width */}
                <div className="w-1/4 p-4">
                  <div className="font-medium truncate">
                    {trademark._source.mark_identification}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {trademark._source.current_owner}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {trademark._source.registration_number}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(trademark._source.filing_date)}
                  </div>
                </div>

                {/* Status Column - Fixed width */}
                <div className="w-1/4 p-4">
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        isLive(trademark._source.status_type)
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="text-sm">
                      {isLive(trademark._source.status_type) ? "Live" : "Dead"}/{" "}
                      {isLive(trademark._source.status_type)
                        ? "Registered"
                        : "Expired"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {formatDate(trademark._source.registration_date)}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formatDate(trademark._source.renewal_date)}
                  </div>
                </div>

                {/* Class/Description Column - Fixed width */}
                <div className="w-1/3 p-4">
                  <div
                    className="text-sm overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {trademark._source.mark_description_description &&
                    trademark._source.mark_description_description.length > 0
                      ? trademark._source.mark_description_description[0]
                      : "Computer services, Social Media, Networking, Virtual Communities, Community"}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {trademark._source.class_codes &&
                      trademark._source.class_codes.map((classCode, index) => (
                        <div
                          key={index}
                          className="flex items-center mr-2 mb-1"
                        >
                          <svg
                            className="w-4 h-4 text-gray-500 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          </svg>
                          <span className="text-xs">Class {classCode}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Trademarks;
