import { useAppDispatch, useAppSelector } from '../hooks';

import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Teams() {
    const dispatch = useAppDispatch()
    const fixtures = useAppSelector((state) => state.fixtures)

    if (fixtures.isTeamsLoading) {
        return (
            <div className="teams">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <Row className="justify-content-center teams">
            <Col>
                <h2 className="text-center">Tournament Teams</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fixtures.teams.map((team: any) => (
                            <tr key={team.id}>
                                <td>{team.name}</td>
                            </tr>))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default Teams