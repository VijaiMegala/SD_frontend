import React from "react";
import nodeStyles from "../../styles/node.module.scss";
import { Handle } from "@xyflow/react";
import { Input } from "antd";

export const ResponseNode = ({ data }) => {
    return (
        <div className={nodeStyles.responseNodeCon}>
            <div className={nodeStyles.responseNodeConHeader}>
                <span>Response Card</span>
                <div className={nodeStyles.responseNodeConHeaderBox}></div>
            </div>
            <div className={nodeStyles.responseNodeConMain}>
                <div className={nodeStyles.responseNodeConMainItem}> 
                    <span>Status</span>
                    <Input placeholder="Enter here" value={data.status} readOnly />
                </div>
                <div className={nodeStyles.responseNodeConMainItem}>
                    <span>Data</span>
                    <Input placeholder="Enter here" value={data.responseData} readOnly />
                </div>
            </div>
            <Handle type="target" position="top" />
        </div>
    );
};
