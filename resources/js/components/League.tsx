import { useAppSelector } from '../hooks';

import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function League() {
    const fixtures = useAppSelector((state) => state.fixtures)

    return (
        <Row className="justify-content-center teams">
            <Col>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fixtures.teams.map((team: any) => (
                            <tr key={team.id}>
                                <td>{team.name}</td>
                                <td>{team.points}</td>
                                <td>{team.won}</td>
                                <td>{team.draw}</td>
                                <td>{team.lost}</td>
                                <td>{team.gd}</td>
                            </tr>))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default League