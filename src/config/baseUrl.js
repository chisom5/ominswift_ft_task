const getBaseUrl = () => {
  const url = window.location.href;
  const base = url.split("#")[0];
  const baseWithoutHttp = base.split("/")[2];
  switch (baseWithoutHttp) {
    case "192.168.0.4":
      return "https://testapiomniswift.herokuapp.com/api";
    default:
      return "https://testapiomniswift.herokuapp.com/api";
  }
};

const baseUrl = getBaseUrl();
export default baseUrl;
