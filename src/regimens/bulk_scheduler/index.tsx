import * as React from "react";
import { BulkEditorProps } from "./interfaces";
import { AddButton } from "./add_button";
import { SequenceList } from "./sequence_list";
import { WeekGrid } from "./week_grid";
import { commitBulkEditor, setTimeOffset } from "./actions";
import { Widget, WidgetHeader, WidgetBody, Row, Col } from "../../ui/index";
import { BlurableInput } from "../../ui/blurable_input";
import { duration } from "moment";
import { t } from "i18next";

export function BulkSchedulerWidget(props: BulkEditorProps) {
  let { dispatch, sequences, selectedSequence, dailyOffsetMs } = props;
  let active = !!(sequences && sequences.length);
  return <Widget className="bulk-scheduler-widget">
    <WidgetHeader title="Scheduler"
      helpText={`Use this tool to schedule sequences to run on one or many
                days of your regimen.`}>
      <AddButton active={active}
        click={() => { dispatch(commitBulkEditor()); }} />
    </WidgetHeader>
    <WidgetBody>
      <Row>
        <Col xs={6}>
          <SequenceList sequences={sequences}
            current={selectedSequence}
            dispatch={dispatch} />
        </Col>
        <Col xs={6}>
          <div>
            <label>{t("Time")}</label>
            <BlurableInput type="time"
              value={msToTime(dailyOffsetMs)}
              onCommit={({ currentTarget }) => {
                dispatch(setTimeOffset(timeToMs(currentTarget.value)));
              }} />
          </div>
        </Col>
      </Row>
      <WeekGrid weeks={props.weeks}
        dispatch={dispatch} />
    </WidgetBody>
  </Widget>;
}

function msToTime(ms: number) {
  if (_.isNumber(ms)) {
    let d = duration(ms);
    let h = _.padLeft(d.hours().toString(), 2, "0");
    let m = _.padLeft(d.minutes().toString(), 2, "0");
    return `${h}:${m}`;
  } else {
    return "00:01";
  }
}

function timeToMs(input: string) {
  let [hours, minutes] = input
    .split(":")
    .map((n: string) => parseInt(n, 10));
  return ((hours * 60) + (minutes)) * 60 * 1000;
}
