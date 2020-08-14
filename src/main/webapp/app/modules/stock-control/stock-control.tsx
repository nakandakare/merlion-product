import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getEntities } from '../../../app/entities/product-bucket/product-bucket.reducer';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import StockControlProduct from './stock-control-product';
import './stock-control.scss';

const useStyles = makeStyles({
    table: {
        maxWidth: 1250,
    },
});

const StockControl = (props: any) => {
    const classes = useStyles();

    const { productBucketList } = props;

    useEffect(() => {
        props.getEntities();
    }, []);

    return (
        <div>
            <TableContainer className='stockControlTable'>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className='bold'>ID</TableCell>
                            <TableCell align="right" className='bold'>Product Name</TableCell>  
                            <TableCell align="right" className='bold'>Available Qty</TableCell>
                            <TableCell align="right" className='bold'>In Charge Qty</TableCell>
                            <TableCell align="right" className='bold'>Broken Quantity</TableCell>
                            <TableCell align="right" className='bold'>Qty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            productBucketList.map((productBucket, i) => (
                                    <StockControlProduct key={i} productBucket={productBucket} />
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = ({ productBucket }: IRootState) => ({
    productBucketList: productBucket.entities
});

const mapDispatchToProps = {
    getEntities,
};

export default connect(mapStateToProps, mapDispatchToProps)(StockControl);