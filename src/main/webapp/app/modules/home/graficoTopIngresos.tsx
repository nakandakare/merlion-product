import './home.scss';
import './graphic.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { getVentaTopIngresos } from '../../entities/sales/sales.reducer';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export interface ISalesProps extends StateProps, DispatchProps { }

export const GraficoTopIngresos = (props: any) => {

    const { ventaTopIngresos } = props;

    // Modifico su longitu para que sea TOP 5. Ya viene ordenado de forma descendente.
    ventaTopIngresos.length = 5;

    useEffect(() => {
        props.getVentaTopIngresos();
    }, [])

    return (
        <div>
            <div className='graphicTitle'>
                <h4>Ranking 5 productos que dieron más ingresos</h4>
            </div>
            <BarChart
                width={800}
                height={300}
                data={ventaTopIngresos}
                margin={{
                    top: 5, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombreProducto" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Ingreso" fill="#2a6a9e" />
            </BarChart>
        </div>
    );
};

const mapStateToProps = ({ sales }: IRootState) => ({
    ventaTopIngresos: sales.ventaTopIngresos
});

const mapDispatchToProps = dispatch => ({
    getVentaTopIngresos: () => dispatch(getVentaTopIngresos())
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GraficoTopIngresos);
