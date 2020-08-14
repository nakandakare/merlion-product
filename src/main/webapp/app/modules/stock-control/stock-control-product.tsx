import React, {useState, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { updateEntity } from '../../../app/entities/product-bucket/product-bucket.reducer';
import product from 'app/entities/product/product';

const StockControlProduct = (props: any) => {

    const { productBucket, updating } = props;
    const [qty, setQty] = useState(0); // Unidad disponible para mover a otro balde.
    const [isQtyEmpty, setIsQtyEmpty] = useState(true); 

    useEffect(() => { // Verificar si hay unidades disponibles.
        if(qty <= 0) {
            setIsQtyEmpty(true);
        } else {
            setIsQtyEmpty(false);
        }
    })

    // Resta la cantidad del producto elegido y suma la cantidad disponible (qty).
    const removeQty = (type: string, productRemoveBucket: any) => {
        setQty(qty + 1);
        if (type === 'available') {
            productRemoveBucket.availableToSellQuantity -= 1;
        }
        if (type === 'inCharge') {
            productRemoveBucket.inChargeQuantity -= 1;
        }
        if (type === 'broken') {
            productRemoveBucket.brokenQuantity -= 1;
        }

        props.updateEntity(productRemoveBucket);
    }

    // Suma la cantidad del producto elegido y resta la cantidad disponible (qty).
    const addQty = (type:string, productAddBucket: any) => {
        setQty(qty - 1);
        if(type === 'available') {
            productAddBucket.availableToSellQuantity += 1;
        }
        if (type === 'inCharge') {
            productAddBucket.inChargeQuantity += 1;
        }
        if (type === 'broken') {
            productAddBucket.brokenQuantity += 1;
        }

        props.updateEntity(productAddBucket);
    }

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">{productBucket.id}</TableCell>
                <TableCell align="right">{productBucket.product.name}</TableCell>
                <TableCell align="right">
                    <IconButton color="primary" aria-label="upload picture" component="span" disabled={isQtyEmpty || updating } onClick={() => addQty('available',productBucket)}>
                        <AddCircleIcon />
                    </IconButton>
                        {productBucket.availableToSellQuantity}
                    <IconButton color="secondary" aria-label="upload picture" component="span" disabled={updating} onClick={() => removeQty('available', productBucket)}> 
                        <RemoveCircleIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="right">
                    <IconButton color="primary" aria-label="upload picture" component="span" disabled={isQtyEmpty || updating} onClick={() => addQty('inCharge', productBucket)}>
                        <AddCircleIcon />
                    </IconButton>
                        {productBucket.inChargeQuantity}
                    <IconButton color="secondary" aria-label="upload picture" component="span" disabled={updating} onClick={() => removeQty('inCharge', productBucket)}>
                        <RemoveCircleIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="right">
                    <IconButton color="primary" aria-label="upload picture" component="span" disabled={isQtyEmpty || updating} onClick={() => addQty('broken', productBucket)}>
                        <AddCircleIcon />
                    </IconButton>
                        {productBucket.brokenQuantity}
                    <IconButton color="secondary" aria-label="upload picture" component="span" disabled={updating} onClick={() => removeQty('broken', productBucket)}>
                        <RemoveCircleIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="right">{qty}</TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const mapStateToProps = (storeState: IRootState) => ({
    updating: storeState.productBucket.updating
});

const mapDispatchToProps = {
    updateEntity
};

export default connect(mapStateToProps, mapDispatchToProps)(StockControlProduct);