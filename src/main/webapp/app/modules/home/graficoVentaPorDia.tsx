import './home.scss';
import './graphic.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { getVentaPorDia } from '../../entities/sales/sales.reducer';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export interface ISalesProps extends StateProps, DispatchProps { }

export const GraficoVentaPorDia = (props: any) => {

    const { ventaPorDiaList } = props;

    useEffect(() => {
        props.getVentaPorDia();
    }, [])

    return (
        <div>
            <div className='graphicTitle'>
                <h4>Cantidad de ventas por día</h4>
            </div>
            <LineChart
                width={800}
                height={300}
                data={ventaPorDiaList}
                margin={{
                    top: 10, right: 0, left: 0, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fechaVenta" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cantidadVenta" stroke="#2a6a9e" />
            </LineChart>
        </div>
    );
};

const mapStateToProps = ({ sales }: IRootState) => ({
    ventaPorDiaList: sales.ventaPorDia
});

const mapDispatchToProps = dispatch => ({
    getVentaPorDia: () => dispatch(getVentaPorDia())
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GraficoVentaPorDia);
