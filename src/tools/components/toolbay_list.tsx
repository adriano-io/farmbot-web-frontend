import * as React from "react";
import { ListAndFormProps } from "../interfaces";
import { Widget, WidgetBody, WidgetHeader } from "../../ui";
import { startEditing } from "../actions";
import * as _ from "lodash";
import { t } from "i18next";

export class ToolBayList extends React.Component<ListAndFormProps, {}> {
    renderTool(tool_id: number | undefined) {
        let { tools } = this.props.all;
        return tools.map((tool, index) => {
            index++;
            if (tool_id === tool.id) {
                return <td key={index}>
                    {tool.name}
                </td>;
            }
        });
    }

    renderSlots(tool_bay_id: number) {
        let { tool_slots, tools } = this.props.all;
        let currentSlots = _.where(tool_slots, { tool_bay_id });
        return currentSlots.map((slot, index) => {
            index++;
            let { x, y, z, tool_id } = slot;
            return <tr key={index}>
                <td>{index}</td>
                <td>{x}</td>
                <td>{y}</td>
                <td>{z}</td>
                {tools.length > 0 && (this.renderTool(tool_id))}
                {tools.length === 0 && (<td>---</td>)}
            </tr>;
        });
    }

    render() {
        let onClick = () => { this.props.dispatch(startEditing()); };
        let { tool_bays } = this.props.all;
        return <div>
            {tool_bays.map((bay, index) => {
                index++;
                let { id, name } = bay;
                return <Widget key={index}>
                    <WidgetHeader
                        helpText="Toolbays are for tools."
                        title={name}>
                        <button
                            className="gray button-like widget-control"
                            onClick={onClick}>
                            {t("EDIT")}
                        </button>
                    </WidgetHeader>
                    <WidgetBody>
                        <table>
                            <thead>
                                <tr>
                                    <th>SLOT</th>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th>TOOL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderSlots(id)}
                            </tbody>
                        </table>
                    </WidgetBody>
                </Widget>;
            })}
        </div>;
    }
};
