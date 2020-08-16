import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISales, defaultValue } from 'app/shared/model/sales.model';

export const ACTION_TYPES = {
  FETCH_SALES_LIST: 'sales/FETCH_SALES_LIST',
  FETCH_SALES: 'sales/FETCH_SALES',
  CREATE_SALES: 'sales/CREATE_SALES',
  UPDATE_SALES: 'sales/UPDATE_SALES',
  DELETE_SALES: 'sales/DELETE_SALES',
  RESET: 'sales/RESET',
  FETCH_VENTA_DELIVERED: 'sales/FETCH_VENTA_DELIVERED',
  FETCH_VENTA_POR_DIA: 'sales/FETCH_VENTA_POR_DIA',
  FETCH_TOP_VENTA: 'sales/FETCH_TOP_VENTA',
  FETCH_TOP_INGRESOS: 'sales/FETCH_TOP_INGRESOS',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISales>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  ventaDelivered: [],
  ventaPorDia: [],
  ventaTopVendidos: [],
  ventaTopIngresos: [],
};

export type SalesState = Readonly<typeof initialState>;

// Reducer

export default (state: SalesState = initialState, action): SalesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SALES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SALES):
    case REQUEST(ACTION_TYPES.UPDATE_SALES):
    case REQUEST(ACTION_TYPES.DELETE_SALES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SALES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SALES):
    case FAILURE(ACTION_TYPES.CREATE_SALES):
    case FAILURE(ACTION_TYPES.UPDATE_SALES):
    case FAILURE(ACTION_TYPES.DELETE_SALES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SALES):
    case SUCCESS(ACTION_TYPES.UPDATE_SALES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SALES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENTA_DELIVERED):
      return {
        ...state,
        ventaDelivered: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VENTA_POR_DIA):
      return {
        ...state,
        ventaPorDia: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOP_VENTA):
      return {
        ...state,
        ventaTopVendidos: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TOP_INGRESOS):
      return {
        ...state,
        ventaTopIngresos: action.payload.data,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sales';

// Actions

export const getEntities: ICrudGetAllAction<ISales> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SALES_LIST,
  payload: axios.get<ISales>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISales> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SALES,
    payload: axios.get<ISales>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISales> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SALES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISales> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SALES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISales> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SALES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

export const getVentaDelivered: any = () => ({
  type: ACTION_TYPES.FETCH_VENTA_DELIVERED,
  payload: axios.get<any>('api/ventasDelivered'),
});

export const getVentaPorDia: any = () => ({
  type: ACTION_TYPES.FETCH_VENTA_POR_DIA,
  payload: axios.get<any>('api/ventasPorDia'),
});

export const getVentaTopVendidos: any = () => ({
  type: ACTION_TYPES.FETCH_TOP_VENTA,
  payload: axios.get<any>('api/productosMasVendidos'),
});

export const getVentaTopIngresos: any = () => ({
  type: ACTION_TYPES.FETCH_TOP_INGRESOS,
  payload: axios.get<any>('api/productosMasIngresos'),
});
