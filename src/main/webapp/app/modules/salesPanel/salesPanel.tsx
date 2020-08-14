import './salesPanel.scss';;
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SalesTableContent from './salesTableContent';

import React from 'react';

const useStyles = makeStyles({
    table: {
        maxWidth: 1250,
    },
});

export const SalesPanel = (props: any) => {
    const classes = useStyles();

    const [navValue, setNavValue] = React.useState(0);

    return (
        <div>
            <BottomNavigation
                showLabels
                value={navValue}
                onChange={(event, newValue) => {
                    setNavValue(newValue);
                }}
                className='bottomNavigation'
            >
                <BottomNavigationAction label="Encargado" icon={<EmojiPeopleIcon />} />
                <BottomNavigationAction label="Enviado" icon={<LocalShippingOutlinedIcon />}/>
                <BottomNavigationAction label="Entregado" icon={<DoneOutlinedIcon />}/>
            </BottomNavigation>
            <TableContainer className='productTable'>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nro</TableCell>
                            <TableCell align="right">Proveedor</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            // Muestra los sales dependiendo del sales state
                            navValue === 0 ?
                            <SalesTableContent saleState={'IN_CHARGE'} />
                            : navValue === 1 ?
                            <SalesTableContent saleState={'SHIPPED'} />
                            : navValue === 2 ?
                            <SalesTableContent saleState={'DELIVERED'} />
                            : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};


export default SalesPanel;