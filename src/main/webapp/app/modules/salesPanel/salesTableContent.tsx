import React, {useEffect} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { getEntities, updateEntity } from '../../entities/sales/sales.reducer';

const SalesTableContent = (props: any) => {
    
    const { salesList, saleState, updating } = props;
    // saleState pueden ser 'IN_CHARGE' , 'SHIPPED' o 'DELIVERED'.

    useEffect(() => {
        props.getEntities();
    }, []);

    const saveEntity = (entity) => {
        if (entity.state === 'IN_CHARGE') {
            entity.state = 'SHIPPED';
            props.updateEntity(entity);
        } else {
            entity.state = 'DELIVERED';
            props.updateEntity(entity);
        }
    };

    return (
        <React.Fragment>
            {
                salesList.map((sale, i) => (
                    sale.state === saleState ?
                        <TableRow key={i}>
                            <TableCell component="th" scope="row">{sale.id}</TableCell>
                            <TableCell align="right">
                                {sale.product.name}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="contained" color="primary" onClick={() => saveEntity(sale)} disabled={saleState === 'DELIVERED'  ? true : updating}>
                                    Enviar
                                </Button>
                            </TableCell>
                        </TableRow>
                        :
                        null
                ))
            }
        </React.Fragment>
    )
}

const mapStateToProps = ({ sales }: IRootState) => ({
    salesList: sales.entities,
    updating: sales.updating
});

const mapDispatchToProps = {
    updateEntity,
    getEntities
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesTableContent);