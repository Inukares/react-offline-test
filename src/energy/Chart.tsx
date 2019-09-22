
import { format } from "date-fns";
import { Box, Heading } from "grommet";
import * as React from "react";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { IData, IGas } from "../models/Energy/Response";

const plotData = (data: IGas[]) => data.map((generation: IGas) => ({ x: generation.fuel, y: generation.perc }));

export const Chart: React.FC<IData> = ({ generationmix, from, to }): React.ReactElement => {
  const plottedData = plotData(generationmix);
  const timeFormat = "dd/MM/yyyy";
  const fromFormatted = format(new Date(from), timeFormat);
  const toFormatted = format(new Date(to), timeFormat);
  return (
    <>
      <Box flex={true} pad="medium" overflow="auto">
        <Box align={"center"} flex>
          <Heading level={3} margin="x">
            <strong>UK Energy data: {fromFormatted} - {toFormatted} </strong>
          </Heading>
          <Box pad={{ top: "small" }} gap="small">
            <VictoryChart
              domainPadding={12}
            >
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => (`${x}%`)}
              />
              <VictoryAxis
                tickFormat={(x) => (`${x}`)}
              />

              <VictoryBar
                data={plottedData}
                style={{ data: { fill: "#c43a31" } }}
                labels={({ datum }) => `y: ${datum.y}`}
              >
              </VictoryBar>
            </VictoryChart>
          </Box>
        </Box>
      </Box>

    </>
  );
};
