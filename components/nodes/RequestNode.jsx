import React from "react";
import nodeStyles from "../../styles/node.module.scss";
import { Handle } from "@xyflow/react";
import { Input } from "antd";

export const RequestNode = ({ data }) => {

    console.log(data.contextName)
    return (
        <div className={nodeStyles.requestNodeCon}>
            <div className={nodeStyles.requestNodeConHeader}>
                <span>Request Card</span>
                <div className={nodeStyles.requestNodeConHeaderBox}></div>
            </div>
            <div className={nodeStyles.requestNodeConMain}>
                <span>Context Name</span>
                <Input 
                    placeholder="Enter here" 
                    value={data.contextName} 
                    onChange={(e) =>{ console.log(data.contextName),data.setContextName(e.target.value)}} 
                />
            </div>
            <Handle type="source" position="bottom" />
        </div>
    );
};
