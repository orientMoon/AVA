---
title: ChartAdvisor.advise
order: 2
---

`markdown:docs/common/style.md`



```sign
ChartAdvisor.advise(params: AdviseParams): ChartAdvisorList[];
```

## Parameters

* **params** * ChartAdvisor configurations
  * _required_
  * `type`: AdviseParams

```ts
type AdviseParams = ChartAdviseParams | GraphAdviseParams;
```

`ChartAdviseParams` and `GraphAdviseParams` represent the types of parameters required for chart recommendations and graph recommendations, respectively.

### Chart recommendation parameters

* ***ChartAdviseParams*** Parameter configuration.

| Properties | Type | Description | Default |  
| ----| ---- | ---- | -----|
| data | `any[]` | The source data. | None |
| fields | `string[]` | The data field information. | None `Optional` |
| smartColor | `boolean` | Whether to enable smart color matching. | `false` `Optional` | 
| options | `AdvisorOptions` | The recommended configuration items for the statistics chart. | None `Optional` |
| colorOptions | `SmartColorOptions` | The smartColor option. | None `Optional` | 

* ***AdvisorOptions*** Parameter configuration.

| property | type | description | default |  
| ----| ---- | ---- | -----|
| purpose | `Purpose` | The purpose of the analysis. | None `Optional` |
| preferences | `Preferences` | Chart preferences. | None `Optional` |
| refine | `boolean` | Whether to enable rule-based optimization. | None `Optional` | 
| fields | `string[]` | Data field information. | None `Optional` | 
| showLog | `boolean` | Whether to show Log. | None `Optional` |
| theme | `Theme` | Specify color in hexadecimal. | None `Optional` |

* ***Purpose*** Parameter configuration.

```ts
type PURPOSE_OPTIONS = ["Comparison", "Trend", "Distribution", "Rank", "Proportion", 
  "Composition", "Relation", "Hierarchy", "Flow", "Spatial", "Anomaly", "Value"];
```

* ***Preferences*** Parameter configuration.

```ts
interface Preferences {
  canvasLayout: 'landscape' | 'portrait';
}
```

* ***Theme*** Parameter configuration.

```ts
type Theme = {
  primaryColor?: string;
};
```

* ***SmartColorOptions*** Parameter configuration.

```ts
type SmartColorOptions = {
  themeColor?: string;
  colorSchemeType?: ColorSchemeType;
  simulationType?: SimulationType;
}
```

| Properties | Type | Description | Default |  
| ----| ---- | ---- | -----|
| themeColor | `string` | The hexadecimal theme color. | `#006f94` `Optional` |
| colorSchemeType | `ColorSchemeType` | The color swatch generation mode. | `monochromatic` `Optional` |
| simulationType | `SimulationType` | The color simulation mode. | `normal` `Optional` |

### Graph recommendation parameters

* ***GraphAdviseParams*** Parameter configuration.

| Properties | Type | Description | Default |  
| ----| ---- | ---- | -----|
| data | `any[]` | The source data. | None `Optional` |
| fields | `{ nodes, links }` | Data point edge information. | None `Optional` |
| options | `GraphAdvisorOptions` | Graph recommendation configuration items. | None `Optional` |

* ***GraphAdvisorOptions*** Parameter configuration.

```ts
type GraphAdvisorOptions = {
  nodeColors?: string[];
  nodeSizeRange?: number[];
  edgeWidthRange?: number[];
  extra?: {
    nodeKey?: string;
    edgeKey?: string;
    sourceKey?: string;
    targetKey?: string;
    childrenKey?: string;
  };
  ...AdvisorOptions;
};
```

| Properties | Type | Description | Default |  
| ----| ---- | ---- | -----|
| nodeColors | `string[]` | The color of the node. | None `Optional` |
| nodeSizeRange | `number[]` | The node size range. | None `Optional` | 
| edgeWidthRange | `number[]` | The width range of the edge. |None `Optional` |
| extra | `{ *Key, ...}` | Specifies the graph-related attributes. | None `Optional` |
| *Key | `string` | Specifies the location of the point-edge relationship (point, edge, origin, pointing). | None `Optional` |
| AdvisorOptions | `AdvisorOptions` | Same as the recommended configuration items for statistical graphs. | None `Optional` |



## Return value

*`ChartAdvisorList[]`* 

* ***ChartAdvisorList*** Parameter configuration.

| Properties | Type | Description | Examples |  
| ----| ---- | ---- | -----|
| type | `ChartType` | The type of the chart. | `line-chart` |
| spec | `AntVSpec` | The chart attribute information. | See below. |
| lint | `Lint` | The chart optimization suggestions. | See below. |
| score | `number` | The chart score. | `1.0` |

* ***AntVSpec*** Parameter configuration.

`AntVSpec` is the declarative grammar that supports various technology stacks of AntV. 
See [AntVSpec API](https://github.com/antvis/antv-spec/blob/master/API.md) for detail configurations.

| Properties | Description | Examples |  
| ----| ---- | -----|
| basis | The basic information. | `basis: { type: 'chart' }` |
| data | The data information. | `data: { type: 'json-array', values: [...] }` |
| layer | The drawing information. | `{ [ encoding: { x: {...} , y:{...} }, mark: { type: 'line' } ] }` |


* ***Lint*** Parameter configuration.


| Properties | Type | Description | Examples |  
| ----| ---- | ---- | -----|
| type | `string` | Rule type. | `hard / soft / design` |
| id | `string` | Rule id. | `10` |
| score | `number` | The score of the rule. | ` 1` |
| fix | `any` | The solution based on this rule. | |
| docs | `any` | The documentation for the rule. | |




