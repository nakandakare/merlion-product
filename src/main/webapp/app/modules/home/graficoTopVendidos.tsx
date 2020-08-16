import './home.scss';
import './graphic.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { getVentaTopVendidos } from '../../entities/sales/sales.reducer';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export interface ISalesProps extends StateProps, DispatchProps { }

export const GraficoTopVendidos = (props: any) => {

    const { ventaTopVendidos } = props;

    // Modifico su longitu para que sea TOP 5. Ya viene ordenado de forma descendente.
    ventaTopVendidos.length = 5;

    useEffect(() => {
        props.getVentaTopVendidos();
    }, [])

    return (
        <div>
            <div className='graphicTitle'>
                <h4>Ranking 5 productos más vendidos</h4>
            </div>
            <BarChart
                width={800}
                height={300}
                data={ventaTopVendidos}
                margin={{
                    top: 5, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreProducto" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidadVenta" fill="#2a6a9e" />
            </BarChart>
        </div>
    );
};

const mapStateToProps = ({ sales }: IRootState) => ({
    ventaTopVendidos: sales.ventaTopVendidos
});

const mapDispatchToProps = dispatch => ({
    getVentaTopVendidos: () => dispatch(getVentaTopVendidos())
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GraficoTopVendidos);
