import { useAppDispatch, useAppSelector } from '../hooks';

import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Predictions() {
    const fixtures = useAppSelector((state) => state.fixtures)

    /* if (fixtures.isFixturesLoading) {
        return (
            <div className="teams">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    } */

    return (
        <Row className="justify-content-center teams">
            <Col>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th className='text-start'>Championship Predictions</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fixtures.teams.map((team: any) => (
                            <tr key={team.id}>
                                <td className='text-start'>{team.name}</td>
                                <td>{fixtures.isPredicting && (fixtures.week > 0) ?
                                    <Spinner animation="border" variant="info" size='sm' />
                                    :
                                    team.prediction
                                }
                                </td>
                            </tr>))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default Predictions