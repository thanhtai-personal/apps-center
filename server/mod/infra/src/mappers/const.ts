import {
  MapConfig,
  MapCustom,
  MapFromMapper,
  PropMapConfig,
} from "./interfaces.js";

export const mapConfig: Map<string, MapConfig<any, any>> = new Map();

export const isMapperMap = <
  F extends object,
  T extends object,
  S extends object = F,
>(
  config: PropMapConfig<F, T, S>,
): config is MapFromMapper<F, T, S> => {
  return "mapper" in config && config.targetType !== undefined;
};

export const isCustomMap = <
  F extends object,
  T extends object,
  S extends object = F,
>(
  config: PropMapConfig<F, T, S>,
): config is MapCustom<F, T, S> => {
  return "getSourceValue" in config;
};
