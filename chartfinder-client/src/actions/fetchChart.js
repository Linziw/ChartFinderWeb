import store from "../store";

export function fetchChart(date) {
  return (dispatch) => {
    dispatch({ type: "START_FETCHING_CHART_REQUEST" });
    fetch(`http://localhost:3001/api/charts/${date}`)
      .then((response) => response.json())
      .then((chart) => {
        dispatch({ type: "ADD_CHART", chart });
        localStorage.setItem("state", JSON.stringify(store.getState()));
      })
      .catch((error) => {
        alert(
          "Sorry, we couldn't find that one in the archives, please try another date (earliest chart is 14/11/1952)"
        );
        window.location.reload();
      });
  };
}
