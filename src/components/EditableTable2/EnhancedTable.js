import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        width: "100%",
    },
});

let id = 0;
function createData(name, calories) {
    id += 1;
    return { id, name, calories};
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),

];


function addRow (){
    if((document.getElementById("factorTitle").value && document.getElementById("factorWeight").value) !== null ) {
        console.log("hola");
        var rows = this.state.rows;
        rows.push({title: document.getElementById("factorTitle").value, weight: document.getElementById("factorWeight").value});
        console.log(this.state)
        this.setState({rows: rows});

        console.log(this.props.project);
    }
}

function SimpleTable(props) {



    const { classes } = props;

    return (


        <Paper className={classes.root}>
            <input id="factorTitle"></input>
            <input id="factorWeight"></input>

            <button id="addBtn" onClick={this.addRow}>ADD</button>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
