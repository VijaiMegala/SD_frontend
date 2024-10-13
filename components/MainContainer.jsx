import React, { useRef, useCallback, useState } from "react";
import mainConStyles from "../styles/main.module.scss";
import { Flow } from "./Flow";
import { FaPlay } from "react-icons/fa";

export const MainContainer = () => {
  const flowRef = useRef(null);

  const handleAddNewNode = () => {
    if (flowRef.current) {
      flowRef.current.addNewNodes();
    }
  };

  const handleTestRun = () => {
    if (flowRef.current) {
      flowRef.current.handleTestRun();
    }
  };

  return (
    <div className={mainConStyles.reactFlowCon}>
      <div className={mainConStyles.reactFlowConTitle}>
        <span>Rule Creation</span>
        <div className={mainConStyles.reactFlowConBtnGrp}>
          <div
            className={mainConStyles.addNewNodeButton}
            onClick={handleAddNewNode}
          >
            Add New Node
          </div>
          <div className={mainConStyles.testRunBtn} onClick={handleTestRun}>
            <span>Test Run</span>
            <FaPlay />
          </div>
        </div>
      </div>
      <div className={mainConStyles.reactFlowConMain}>
        <Flow ref={flowRef} />
      </div>
    </div>
  );
};
