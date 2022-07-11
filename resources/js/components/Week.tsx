import { useAppDispatch, useAppSelector } from '../hooks';

import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Week() {
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
                            {(fixtures.week > 0) ?
                                <th>Week {fixtures.week} Results</th>
                                :
                                <th>Weekly Results</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {(fixtures.week > 0) ?
                            fixtures.matches.filter((e: any) => e.week == fixtures.week).map((match: any) => (
                                <tr key={match.id}>
                                    <td>{fixtures.teams.find((e: any) => e.id === match.home_id).name} <strong className='text-warning'>{ match.home_score } - { match.away_score }</strong> {fixtures.teams.find((e: any) => e.id === match.away_id).name}</td>
                                </tr>))
                            :
                            <tr>
                                <td>Results will be shown here</td>
                            </tr>

                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default Week