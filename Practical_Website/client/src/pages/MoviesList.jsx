import React, { Component } from 'react'
// import {ReactTable} from 'react-table'
import { useTable } from "react-table";
import api from '../api'
import  { Link } from 'react-router-dom'
import styled from 'styled-components'

// import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
    `
class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        
        const { movies, isLoading } = this.state
        // console.log('TCL: MoviesList -> render -> movies', movies)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                // Cell: props => <span>{props.value.join(' / ')}</span>,
                Cell: props => {
                    console.log(props.value)
                    return (
                        <span>{props.value.join(' / ')}</span>
                    )
                },
            },
            {
                Header: '',
                accessor: '_id',
                id: 'delete',
                Cell: props => {
                    console.log(props.value)
                    return (
                        <span><DeleteMovie id={props.value} /></span>
                    )
                },
            },
            {
                Header: '',
                accessor: '_id',
                id: 'update',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.value} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }
        const Table = ({ columns, data }) => {
            const {
                getTableProps,
                getTableBodyProps,
                headerGroups,
                rows,
                prepareRow
            } = useTable({
                columns,
                data
            });

        return (
            <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
        );
    };

    return (
            <Wrapper className="Demo">
                <Table columns={columns} data={movies} />
            </Wrapper>
        )

    }
}

export default MoviesList;