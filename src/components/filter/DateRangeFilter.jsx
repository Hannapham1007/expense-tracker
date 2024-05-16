import React, { useContext, useState } from "react";

function DateRangeFilter({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleResetFilter,
}) {
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="">
      <div className="row justify-content-between ">
        <div className="col-md-5 col-12 mb-2 ">
          <div className="form-bg px-4 py-2">
            <label className="form-label fw-bold" style={{ color: "grey" }}>
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
        </div>
        <div className="col-md-5 col-12 mb-2">
          <div className="form-bg px-4 py-2">
            <label className="form-label fw-bold" style={{ color: "grey" }}>
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
     
      <div className="d-flex col-md-2 col-12 align-items-center justify-content-center">
        <button className="btn btn-bg" onClick={handleResetFilter}>
          Reset Filter
        </button>
      </div>
      </div>
    </div>
  );
}

export default DateRangeFilter;
