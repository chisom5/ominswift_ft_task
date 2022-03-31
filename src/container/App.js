import "./App.css";
import { useRef, useState, useEffect, useReducer } from "react";
import { Table, Button } from "antd";
import { Formik } from "formik";
import FormComponent from "../components/form";
import ViewResultComponent from "../components/result";
import {
  makePostRequest,
  makePostFormDataRequest,
  makeGetRequest,
} from "../service/api";

const initialState = {
  levelsList: [],
  ageList: [],
  genderList: [],
  stateList: [],
  isFetching: false,
  isFiltering: false,
  isDownloading: false,
  openViewForResult: false,
  tableData: [],
  viewResult: null,
  activeResultId: null,
};
// The reducer function
function reducer(state, action) {
  switch (action.type) {
    case "levelList":
      return {
        ...state,
        levelsList: action.payload,
      };
    case "ageList":
      return {
        ...state,
        ageList: action.payload,
      };
    case "genderList":
      return {
        ...state,
        genderList: action.payload,
      };
    case "stateList":
      return {
        ...state,
        stateList: action.payload,
      };

    case "viewResult": {
      return {
        ...state,
        viewResult: action.payload,
        isDownloading: false,
      };
    }
    case "openViewForResult": {
      return {
        ...state,
        openViewForResult: !state.openViewForResult,
      };
    }
    case "success": {
      return {
        ...state,
        tableData: action.payload,
        isFetching: false,
        isFiltering: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    }
    case "loading": {
      return {
        ...state,
        isFetching: true,
      };
    }

    case "isFiltering": {
      return {
        ...state,
        isFiltering: true,
      };
    }
    case "isDownloading": {
      return {
        ...state,
        isDownloading: true,
        activeResultId: action.payload,
      };
    }

    default:
      return state;
  }
}

function App() {
  const [filterInput, setFilterInput] = useState({
    age: "",
    state: "",
    level: "",
    gender: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    levelsList,
    ageList,
    genderList,
    stateList,
    isFetching,
    isFiltering,
    isDownloading,
    tableData,
    openViewForResult,
    viewResult,
    activeResultId,
  } = state;

  const formFilterInputRef = useRef(null); //ref
  const columns = [
    {
      title: "S/N",
      dataIndex: "id",
    },
    {
      title: "Surname",
      dataIndex: "surname",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Level",
      dataIndex: "level",
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id, obj) => {
        return (
          <Button
            className="btn-color btn-table"
            loading={id === activeResultId && isDownloading}
            onClick={() => handleViewResult(id)}
          >
            Download Result
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchStudentRecord = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await makeGetRequest(`/viewAllData`);

        if (res.status !== 200) {
          dispatch({ type: "error", error: res.data.message });
        } else {
          dispatch({ type: "success", payload: res.data.data.students });
        }
      } catch (error) {
        if (error.response) {
          dispatch({ type: "error", error: error.data.message });
        } else if (error.request) {
          dispatch({
            type: "error",
            error: error.request.data.message || "Network error",
          });
        } else {
          // Something happened in setting up the request and triggered an error
          console.log("axios", error.message);
        }
      }
    };
    const fetchAllLevels = async () => {
      try {
        const res = await makeGetRequest(`/viewAllLevels`);

        if (res.status !== 200) {
          dispatch({ type: "error", error: res.data.message });
        } else {
          console.log(res);
          dispatch({ type: "levelList", payload: res.data.data });
        }
      } catch (error) {
        if (error.response) {
          dispatch({ type: "error", error: error.data.message });
        } else if (error.request) {
          dispatch({
            type: "error",
            error: error.request.data.message || "Network error",
          });
        } else {
          // Something happened in setting up the request and triggered an error
          console.log("axios", error.message);
        }
      }
    };
    const fetchAllStates = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await makeGetRequest(`/viewAllStates`);

        if (res.status !== 200) {
          dispatch({ type: "error", error: res.data.message });
        } else {
          dispatch({ type: "stateList", payload: res.data.data });
        }
      } catch (error) {
        if (error.response) {
          dispatch({ type: "error", error: error.data.message });
        } else if (error.request) {
          dispatch({
            type: "error",
            error: error.request.data.message || "Network error",
          });
        } else {
          // Something happened in setting up the request and triggered an error
          console.log("axios", error.message);
        }
      }
    };
    const fetchAllAge = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await makeGetRequest(`/viewAllAges`);

        if (res.status !== 200) {
          dispatch({ type: "error", error: res.data.message });
        } else {
          dispatch({ type: "ageList", payload: res.data.data });
        }
      } catch (error) {
        if (error.response) {
          dispatch({ type: "error", error: error.data.message });
        } else if (error.request) {
          dispatch({
            type: "error",
            error: error.request.data.message || "Network error",
          });
        } else {
          // Something happened in setting up the request and triggered an error
          console.log("axios", error.message);
        }
      }
    };

    const fetchAllGender = async () => {
      try {
        dispatch({ type: "loading" });
        const res = await makeGetRequest(`/viewAllGender`);

        if (res.status !== 200) {
          dispatch({ type: "error", error: res.data.message });
        } else {
          dispatch({ type: "genderList", payload: res.data.data });
        }
      } catch (error) {
        if (error.response) {
          dispatch({ type: "error", error: error.data.message });
        } else if (error.request) {
          dispatch({
            type: "error",
            error: error.request.data.message || "Network error",
          });
        } else {
          // Something happened in setting up the request and triggered an error
          console.log("axios", error.message);
        }
      }
    };
    fetchStudentRecord();
    fetchAllLevels();
    fetchAllStates();
    fetchAllAge();
    fetchAllGender();
  }, []);

  const handleFilterStudent = async (params) => {
    try {
      dispatch({ type: "isFiltering" });
      const res = await makePostFormDataRequest(`/filterData`, params);

      if (res.status !== 200) {
        dispatch({ type: "error", error: res.data.message });
      } else {
        console.log(res);
        dispatch({ type: "success", payload: res.data.data.students });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: "error", error: error.data.message });
      } else if (error.request) {
        dispatch({
          type: "error",
          error: error.request.data.message || "Network error",
        });
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };

  const handleViewResult = async (params) => {
    try {
      dispatch({ type: "isDownloading", payload: params });

      const res = await makePostRequest(`/viewResult/${params}`);

      if (res.status !== 200) {
        dispatch({ type: "error", error: res.data.message });
      } else {
        dispatch({ type: "viewResult", payload: res.data });
        dispatch({ type: "openViewForResult" });
      }
    } catch (error) {
      if (error.response) {
        dispatch({ type: "error", error: error.data.message });
      } else if (error.request) {
        dispatch({
          type: "error",
          error: error.request.data.message || "Network error",
        });
      } else {
        // Something happened in setting up the request and triggered an error
        console.log("axios", error.message);
      }
    }
  };
  const handleSubmit = () => {
    if (
      filterInput.age !== "" ||
      filterInput.state !== "" ||
      filterInput.level !== "" ||
      filterInput.gender !== ""
    ) {
      let formData = new FormData();
      // make an api call here that will pass the values.
      formData.append("level", formFilterInputRef.current.values.level);
      formData.append("age", formFilterInputRef.current.values.age);
      formData.append("state", formFilterInputRef.current.values.state);
      formData.append("gender", formFilterInputRef.current.values.gender);
      handleFilterStudent(formData);

      formFilterInputRef.current.resetForm({
        values: {
          level: "",
          age: "",
          state: "",
          gender: "",
        },
      });
      setFilterInput({
        level: "",
        age: "",
        state: "",
        gender: "",
      });
    } else {
      formFilterInputRef.current.handleSubmit();
    }
  };

  const handleChange = (e, setFieldValue) => {
    e.preventDefault();
    const { value, name } = e.target;

    setFilterInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    setFieldValue([name], value);
  };
  const dismissModal = () => {
    dispatch({ type: "openViewForResult" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Student Data Table</p>
      </header>

      <section className="App-section-bg App-section-filter">
        <h3>Filter Student Table By:</h3>
        <Formik
          initialValues={filterInput}
          onSubmit={handleSubmit}
          innerRef={formFilterInputRef}
        >
          {(props) => (
            <FormComponent
              {...props}
              handleChange={handleChange}
              values={filterInput}
              levelsList={levelsList}
              ageList={ageList}
              genderList={genderList}
              stateList={stateList}
              isFiltering={isFiltering}
            />
          )}
        </Formik>
      </section>

      <section className="App-section-bg App-section-table">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableData}
          loading={isFetching}
          pagination={false}
        />
      </section>

      <ViewResultComponent
        visible={openViewForResult}
        dismissModal={dismissModal}
        viewResult={viewResult}
      />
    </div>
  );
}

export default App;
