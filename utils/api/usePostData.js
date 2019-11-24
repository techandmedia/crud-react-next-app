import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import config from "./config";

const URL = config.URL;

// ===== USE REDUCER ==========
function fetchReducer(state, action) {
  // console.log(state, action);
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        code: "",
        status: "",
        message: ""
      };
    case "POST_SUCCESS":
      const { result } = action;
      return {
        ...state,
        code: result.data.code,
        status: result.data.status,
        message: result.data.message,
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
  const [params, setParams] = useState({});
  const [state, dispatch] = useReducer(fetchReducer, {
    code: "",
    status: "",
    message: ""
  });

  useEffect(() => {
    let didCancel = false;

    async function postData() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const options = {
          method: "post",
          url: URL + API,
          data: params,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN"
        };
        const result = await axios(options);
        console.log(result);

        if (!didCancel) {
          dispatch({
            type: "POST_SUCCESS",
            result
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
    // console.log(URL + api);
    // console.log(params);
    setAPI(api);
    setParams(params);
  }

  return [state, postData];
}
