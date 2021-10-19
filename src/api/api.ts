import axios from "axios";
import { FinalFormValues } from "./../components/form";

const FORM_URL = "https://webhook.site/d62ab05a-df0c-4606-8fb9-d80b9946b8e9";

export const submitForm = async (values: FinalFormValues) => {
  await axios.post(FORM_URL, values);
};
