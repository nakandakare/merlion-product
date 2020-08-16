import './home.scss';

import React from 'react';

import GraficoVentaDelivered from './GraficoVentaDelivered';
import GraficoVentaPorDia from './graficoVentaPorDia';
import GraficoTopVendidos from './graficoTopVendidos';
import GraficoTopIngresos from './graficoTopIngresos';
import { IRootState } from 'app/shared/reducers';
import getVentaDelivered from '../../entities/sales/sales.reducer';

export const Home = (props: any) => {
  return (
    <div className='homeContainer'> 
      <div className='lineChart'>
        <GraficoVentaDelivered />
        <GraficoVentaPorDia />
      </div>
      <div className='barChart'>
        <GraficoTopVendidos />
        <GraficoTopIngresos />
      </div>
    </div>
  );
};


export default Home;
