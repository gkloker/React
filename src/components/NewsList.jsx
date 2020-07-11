import React from "react";
import Report from "./Report";
import PropTypes from 'prop-types';

const NewsList = ({news}) => (
  <div className="row">
    {news.map(report => (
        <Report
          key={report.url}
          report={report}
        />
      ))}
  </div>
)

NewsList.proptType = {
  news: PropTypes.string.isRequired
}

export default NewsList;