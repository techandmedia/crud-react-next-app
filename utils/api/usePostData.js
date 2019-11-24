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
    case "POST_SUCCESS":
      console.log(action.result);
      return {
        ...state,
        isLoading: false,
        isError: false
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

export default function usePostData() {
  const [API, setAPI] = useState("");
  const [params, setParams] = useState("");
  const [state, dispatch] = useReducer(fetchReducer, {});

  useEffect(() => {
    let didCancel = false;

    async function postData() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios.post(URL + API, params);

        console.log(result);

        if (!didCancel) {
          // console.log(result);
          dispatch({
            type: "POST_SUCCESS",
            code: result.code,
            status: result.status,
            message: result.message
          });
          setAPI("");
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    }

    if (API !== "") {
      postData();
    }

    return () => {
      didCancel = true;
    };
  }, [API]);

  function postData(api, params) {
    console.log(URL + api);
    console.log(params);
    // setAPI(api);
    // setParams(params);
  }

  return [state, postData];
}
