declare module "react-calendar-heatmap" {
  import * as React from "react";

  export interface CalendarHeatmapValue {
    date: string | Date;
    count: number;
  }

  export interface CalendarHeatmapProps {
    startDate: Date | string;
    endDate: Date | string;
    values: CalendarHeatmapValue[];
    classForValue?: (value: CalendarHeatmapValue | null) => string;
    tooltipDataAttrs?: (value: CalendarHeatmapValue | null) => object;
    showWeekdayLabels?: boolean;
    gutterSize?: number;
    horizontal?: boolean;
  }

  export default class CalendarHeatmap extends React.Component<CalendarHeatmapProps> {}
}
