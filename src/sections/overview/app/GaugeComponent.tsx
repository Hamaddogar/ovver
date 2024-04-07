import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { FC } from 'react';

type GaugeProps = {
  width: number;
  height: number;
  value: number | null;
  valueMax: number | null;
  startAngle: number;
  endAngle: number;
  sx: any; // Replace with the correct type if available
  text: (props: { value: number | null; valueMax: number | null }) => string;
};

const GaugeComponent: FC<GaugeProps> = ({
  width,
  height,
  value,
  valueMax,
  startAngle,
  endAngle,
  sx,
  text,
}) => {
  return (
    <Gauge
      width={width}
      height={height}
      value={value ?? 0}
      valueMax={valueMax ?? 0}
      startAngle={startAngle}
      endAngle={endAngle}
      sx={sx}
      text={({ value, valueMax }) => text({ value, valueMax })}
    />
  );
};

export default GaugeComponent;
