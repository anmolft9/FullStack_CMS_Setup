import { fetchPM } from "../../helpers/axiosHelper";
import { setPaymentMethod } from "./pmSlice";

export const getPmsAction = () => async (dispatch) => {
  const { status, pm } = await fetchPM();

  status = "success" && dispatch(setPaymentMethod(pm));
};
