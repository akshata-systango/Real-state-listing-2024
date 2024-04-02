import * as React from "react";
import Alert, {
  AlertColor,
  AlertPropsColorOverrides,
} from "@mui/material/Alert";

interface ICommonAlertProps {
  severityType: any;
  content: string | any;
}

const CommonAlert = (props: ICommonAlertProps) => {
  const { severityType, content } = props;
  return <Alert severity={severityType}>{content}</Alert>;
};

export default CommonAlert;
