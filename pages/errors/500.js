import React from "react";
import PropTypes from "prop-types";

import { withSSR } from "../_ssr";

const Error500Page = ({ statusCode, error, message, ...props }) => (
  <Card {...props}>
      <h1>
        Error {statusCode}: {error}
      </h1>
      <p>{message}</p>
  </Card>
);

Error500Page.propTypes = {
  statusCode: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default withSSR()(Error500Page);
