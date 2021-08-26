import * as utils from '../utils';
import type { SeriesData, Extra, Axis } from './types';
import BaseFrame from './base-frame';
import { isLegalBasicType } from './utils';

export interface SeriesExtra {
  index?: Extra['index'];
}

/** 1D data structure */
export default class Series extends BaseFrame {
  constructor(data: SeriesData, extra?: SeriesExtra) {
    super(data, extra);

    if (utils.isObject(extra) && !extra.index && Object.keys(extra).length > 0) {
      throw new Error(`The extra of Series only owns 'index' property`);
    }

    if (isLegalBasicType(data)) {
      // 1D: basic type
      this.data = [data];
      this.colData = this.data;

      // generate index
      if (extra?.index) {
        this.setAxis(0, extra.index);
        this.data = Array(extra.index.length).fill(data);
        this.colData = this.data;
      } else {
        this.setAxis(0, [0]);
      }
    } else if (isLegalBasicType(data?.[0])) {
      // 1D: object
      if (utils.isObject(data)) {
        this.data = Object.values(data);
        // In Series, this.colData is same as this.data
        // Do we need it?
        this.colData = this.data;

        // generate index
        const dataKeys = Object.keys(data);
        if (extra?.index) {
          if (extra.index?.length === dataKeys.length) {
            this.setAxis(0, extra.index);
          } else {
            throw new Error(`Index length is ${extra.index?.length}, but data size is ${dataKeys.length}`);
          }
        } else {
          this.setAxis(0, dataKeys);
        }
      } else if (utils.isArray(data)) {
        // 1D: array
        this.colData = this.data;
      }
    } else {
      throw new Error('Data type is illegal');
    }
  }

  /**
   * Get data by row location and column location.
   * @param rowLoc
   */
  get(rowLoc: Axis | Axis[] | string): Series | any {
    // input is like 0 || 'a'
    if (utils.isNumber(rowLoc) || (utils.isString(rowLoc) && !rowLoc.includes(':'))) {
      if (this.index.includes(rowLoc)) {
        if (utils.isNumber(rowLoc)) {
          return this.data[rowLoc];
        }
        if (utils.isString(rowLoc)) {
          const rowIdx = this.index.indexOf(rowLoc);
          return this.data[rowIdx];
        }
      }
      throw new Error('The rowLoc is not found in the index.');
    } else if (utils.isArray(rowLoc)) {
      // input is like [0, 1, 2] || ['a', 'b', 'c']
      const newData: any[] = [];
      const newIndex: Axis[] = [];
      for (let i = 0; i < rowLoc.length; i += 1) {
        const idx = rowLoc[i];
        if (!this.index.includes(idx)) {
          throw new Error('The rowLoc is not found in the index.');
        }
        newData.push(this.data[idx]);
        newIndex.push(this.index[idx]);
      }
      return new Series(newData, { index: newIndex });
    } else if (utils.isString(rowLoc) && rowLoc.includes(':')) {
      // input is like '0:2' || 'a:c'
      const rowLocArr = rowLoc.split(':');
      if (rowLocArr.length === 2) {
        const startLoc = rowLocArr[0];
        const endLoc = rowLocArr[1];
        if (utils.isInteger(Number(startLoc)) && utils.isInteger(Number(endLoc))) {
          const startIdx = Number(startLoc);
          const endIdx = Number(endLoc);
          const newData = this.data.slice(startIdx, endIdx);
          const newIndex = this.index.slice(startIdx, endIdx);
          return new Series(newData, { index: newIndex });
        }
        if (utils.isString(startLoc) && utils.isString(endLoc)) {
          const startIdx = this.index.indexOf(startLoc);
          const endIdx = this.index.indexOf(endLoc);
          const newData = this.data.slice(startIdx, endIdx);
          const newIndex = this.index.slice(startIdx, endIdx);
          return new Series(newData, { index: newIndex });
        }
        throw new Error('The rowLoc is not found in the index.');
      }
    }
    throw new Error('The rowLoc is illegal');
  }

  /**
   * Get data by row location and column location using integer-index.
   * @param rowLoc
   */
  getByIntIndex(rowLoc: number | number[] | string): Series | any {
    // input is like 1
    if (utils.isInteger(rowLoc)) {
      if (utils.genNumArr(this.index.length).includes(rowLoc)) {
        return this.data[rowLoc];
      }
      throw new Error('The rowLoc is not found in the index.');
    } else if (utils.isArray(rowLoc)) {
      // input is like [0, 1, 2]
      const newData: any[] = [];
      const newIndex: Axis[] = [];
      for (let i = 0; i < rowLoc.length; i += 1) {
        const idx = rowLoc[i];
        if (!utils.genNumArr(this.index.length).includes(idx)) {
          throw new Error('The rowLoc is not found in the index.');
        }
        newData.push(this.data[idx]);
        newIndex.push(this.index[idx]);
      }
      return new Series(newData, { index: newIndex });
    } else if (utils.isString(rowLoc) && rowLoc.includes(':')) {
      // input is like '0:2'
      const rowLocArr = rowLoc.split(':');
      if (rowLocArr.length === 2) {
        const startIdx = Number(rowLocArr[0]);
        const endIdx = Number(rowLocArr[1]);
        if (utils.isInteger(startIdx) && utils.isInteger(endIdx)) {
          const newData = this.data.slice(startIdx, endIdx);
          const newIndex = this.index.slice(startIdx, endIdx);
          return new Series(newData, { index: newIndex });
        }
        throw new Error('The rowLoc is not found in the index.');
      }
    }
    throw new Error('The rowLoc is illegal');
  }
}