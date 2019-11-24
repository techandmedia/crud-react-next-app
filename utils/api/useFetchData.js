import { useState, useEffect, useReducer, useContext } from "react";
import { RouteContext } from "utils/context/Global-Context";
import { DEFAULT_URL as BASE_URL } from "../context/general-setup";
import axios from "axios";
import config from "./config";

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
  let [URL] = useContext(RouteContext);

  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  let credentials = {
    inputUsername: config.USERNAME,
    inputUserkey: config.PASSWORD
  };

  useEffect(() => {
    setAPI(initialAPI);
    setParams(Object.assign(credentials, additionalParameters));
  }, []);

  useEffect(() => {
    let didCancel = false;
    let newParams = Object.assign(credentials, params);
    URL = API.includes("/") ? BASE_URL : URL;

    let axiosPostBody = { request: newParams };
    console.log(URL);
    console.log(API);
    console.log(axiosPostBody);

    async function getData() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios.post(URL + API, axiosPostBody);
        console.log(result.data.response);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data.response });
          setAPI("");
        }
      } catch (error) {
        console.log(error);
        console.log(URL);
        console.log(API);
        console.log(axiosPostBody);
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
