import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import config from "./config";

const URL = config.URL;

// ===== USE REDUCER ==========
function fetchReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
}

export default function useFetchData(initialAPI, additionalParameters) {
  const [API, setAPI] = useState(initialAPI);
  const [params, setParams] = useState(additionalParameters);
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  useEffect(() => {
    let didCancel = false;

    async function getData() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const options = {
          method: "get",
          url: URL + API,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN"
        };
        const result = await axios(options);
        console.log("UPDATE", result);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          setAPI("");
        }
      } catch (error) {
        console.log(error);
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    }

    if (API !== "") {
      getData();
    }

    return () => {
      didCancel = true;
    };
  }, [API, params, URL]);

  function refetch(newAPI, newPARAMS) {
    console.log("NEW API: ", newAPI);
    console.log("NEW PARAMS: ", newPARAMS);
    setAPI(newAPI);
    setParams(newPARAMS);
  }

  return [state, refetch];
}
