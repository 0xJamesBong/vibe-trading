interface Condition {
  indicator: string;
  operator: string;
  value: number | string;
}

interface Strategy {
  name: string;
  description: string;
  timeframe: string;
  conditions: {
    entry: Condition[];
    exit: Condition[];
  };
}

export function generatePineScript(strategy: Strategy): string {
  const script = `
//@version=5
strategy("${strategy.name}", overlay=true)

// Input parameters
timeframe = "${strategy.timeframe}"

// Calculate indicators
${generateIndicators(strategy)}

// Entry conditions
longCondition = ${generateConditions(strategy.conditions.entry)}

// Exit conditions
exitCondition = ${generateConditions(strategy.conditions.exit)}

// Strategy execution
if (longCondition)
    strategy.entry("Long", strategy.long)

if (exitCondition)
    strategy.close("Long")

// Plot signals
plotshape(longCondition, "Long Entry", shape.triangleup, location.belowbar, color.green, size=size.small)
plotshape(exitCondition, "Exit", shape.triangledown, location.abovebar, color.red, size=size.small)
`;

  return script.trim();
}

function generateIndicators(strategy: Strategy): string {
  const indicators = new Set<string>();

  // Collect all unique indicators from entry and exit conditions
  [...strategy.conditions.entry, ...strategy.conditions.exit].forEach(
    (condition) => {
      switch (condition.indicator.toLowerCase()) {
        case "rsi":
          indicators.add("rsi = ta.rsi(close, 14)");
          break;
        case "sma":
          indicators.add("sma = ta.sma(close, 20)");
          break;
        case "ema":
          indicators.add("ema = ta.ema(close, 20)");
          break;
        case "macd":
          indicators.add(`[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
macdHistogram = histLine`);
          break;
        case "bollinger":
          indicators.add(`[middle, upper, lower] = ta.bb(close, 20, 2)
bbWidth = (upper - lower) / middle`);
          break;
        // Add more indicators as needed
      }
    }
  );

  return Array.from(indicators).join("\n");
}

function generateConditions(conditions: Condition[]): string {
  if (conditions.length === 0) {
    return "false";
  }

  return conditions
    .map((condition) => {
      const { indicator, operator, value } = condition;
      const indicatorVar = indicator.toLowerCase();

      return `${indicatorVar} ${operator} ${
        typeof value === "string" ? `"${value}"` : value
      }`;
    })
    .join(" and ");
}

export function parsePineScript(script: string): Strategy {
  // TODO: Implement Pine Script parsing
  // This would be used to convert existing Pine Script into our strategy format
  throw new Error("Pine Script parsing not implemented yet");
}
